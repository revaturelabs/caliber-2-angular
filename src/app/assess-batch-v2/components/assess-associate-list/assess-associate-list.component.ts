import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Batch} from "../../../Batch/type/batch";
import {TraineeService} from 'src/app/Assess-Batch/Services/trainee.service';
import {BehaviorSubject, combineLatest, from, Observable, of} from "rxjs";
import {concatMap, distinctUntilChanged} from "rxjs/operators";
import {Grade, Trainee} from "../../../Batch/type/trainee";
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {AssessBatchColumn, WeeklyAssociateNotes} from "../../../app.dto";
import {Note} from "../../../Batch/type/note";
import {AssessBatchGradeService} from "../../../Assess-Batch/Services/assess-batch-grades.service";
import {Assessment} from "../../../Assess-Batch/Models/Assesment";
import {CategoryService} from "../../../Assess-Batch/Services/category.service";
import {AssessmentChangeDto} from "../../../shared/dto/assessment-change.dto";
import {AssessmentDialogService} from "../../../shared/services/assessment-dialog.service";
import {CommentDialogService} from "../../../shared/services/comment-dialog.service";
import {Category} from "../../../Assess-Batch/Models/Category";

@Component({
  selector: 'app-assess-associate-list',
  templateUrl: './assess-associate-list.component.html',
  styleUrls: ['./assess-associate-list.component.css']
})
export class AssessAssociateListComponent implements OnInit, OnChanges {

  @Input("batch") batch: Batch;
  @Input("week") week: number;
  private selectedBatch: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(this.batch);
  trainees$: Observable<Trainee[]>;
  private notes$: Observable<WeeklyAssociateNotes>;
  assessments$: Observable<Assessment[]>;
  grades$: Observable<Grade[]>;
  columns: AssessBatchColumn[] = [];
  totalPoints: number = 0;
  grades: Map<number, Grade[]>;
  categories: Category[];
  trainees: Trainee[] = [];
  selectedWeek: number;
  notes: Map<number, Note[]>;
  assessments: Assessment[] = [];
  private selectedWeekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.week);

  @Output("onBatchUpdate") onBatchUpdate: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  @Output("onWeekSelect") onWeekSelect: EventEmitter<number> = new EventEmitter<number>(true);

  private lastAssessmentAction$: Observable<AssessmentChangeDto>;
  private lastComment$: Observable<Trainee>;

  notesLoaded: boolean = false;

  constructor(
    private traineeService: TraineeService,
    private noteService: NoteService,
    private assessBatchGradeService: AssessBatchGradeService,
    private categoryService: CategoryService,
    private assessmentDialogService: AssessmentDialogService,
    private commentDialogService: CommentDialogService,
  ) {
    this.categoryService.getActiveCatgories().subscribe(
      data => {
        this.categories = data;
      }
    );
    this.lastAssessmentAction$ = this.assessmentDialogService.lastAlteredAssessment.asObservable();
    this.lastComment$ = this.commentDialogService.lastAlteredComment$.asObservable();
  }

  ngOnInit() {
    this.columns = [];
    this.grades = new Map<number, Grade[]>();
    // Populate observable when batch is selected from dropdown
    this.trainees$ = this.selectedBatch.asObservable().pipe(
      concatMap(batch => {
        // batch === undefined until we select one from the dropdown
        if (batch !== undefined) {
          this.setUpdatedBatch(batch);
          return this.traineeService.getTraineesByBatchId(batch.batchId);
        } else {
          // Return an empty observable if batch === undefined
          return of([]);
        }
      })
    );

    combineLatest(this.lastComment$).subscribe(
      ([comment]) => {
        this.trainees$.subscribe(
          data => {
            this.trainees = data
          }
        );
      }
    );

    // React to a change in week or quarter based on dropdown
    combineLatest(this.selectedWeekSubject.asObservable(), this.selectedBatch.asObservable(), this.lastAssessmentAction$).pipe(distinctUntilChanged()).subscribe(
      ([week, batch]) => {
        if (week > 0 && Boolean(batch)) {
          this.selectedWeek = week;
          // this.thisWeeksGrades$ = [];
          this.assessments$ = this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(batch.batchId, week);
          if (Boolean(batch) && Boolean(batch.batchId) && Boolean(week)) {
            this.grades$ = this.assessBatchGradeService.getGradesByBatchIdAndWeekNum(batch.batchId, week);
            this.grades$.subscribe(
              data => {
                if (data.length > 0) {
                  this.grades = new Map<number, Grade[]>();
                  for (let grade of data) {
                    if (this.grades.has(grade.assessmentId)) {
                      this.grades.get(grade.assessmentId).push(grade);
                    } else {
                      this.grades.set(grade.assessmentId, [grade]);
                    }
                  }
                }
              }
            );
            this.notes$ = this.noteService.getNoteMapByBatchIdAndWeekNumber(batch.batchId, week);
            this.notes$.subscribe(
              data => {
                this.notes = new Map();
                // Iterate over map recieved from backend
                for (let temp of Object.keys(data)) {
                  if (Boolean(temp)) {
                    this.notes.set(Number.parseInt(temp), data[temp])
                  }
                }
                this.notesLoaded = true;
              }
            );

            this.assessments = [];
            this.columns = [];
            this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(batch.batchId, week).subscribe(
              data => {
                this.assessments = data;
                this.totalPoints = 0;
                // For every assessment, populate the categoryIdsArray and add an entry to the `columns` array, leaving category blank
                for (let assessment of data) {
                  const found = this.columns.find(column => column.assessment.assessmentId === assessment.assessmentId);
                  if (found === undefined) {
                    // Create an AssessBatchColumn entry, leaving category to populate later
                    this.columns.push({
                      assessment: assessment,
                      category: ""
                    });
                    this.assessBatchGradeService.getCategoryByCategoryId(assessment.assessmentCategory).subscribe(
                      data => {
                        this.addToColumn(data);
                      }
                    );
                  }
                  this.totalPoints += assessment.rawScore;
                }
              }
            );
          }
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === "week") {
        const change = changes[prop];
        if (!change.isFirstChange() && change.currentValue !== undefined) {
          this.setSelectedWeek(change.currentValue);
        }
      } else if (prop === "batch") {
        const change = changes[prop];
        if (!change.isFirstChange() && change.currentValue !== undefined) {
          this.setSelectedWeek(this.batch.weeks);
          this.selectedBatch.next(change.currentValue);
        }
      }
    }
  }

  setSelectedWeek(week: number) {
    this.notesLoaded = false;
    this.selectedWeek = week;
    this.selectedWeekSubject.next(week);
    this.onWeekSelect.next(week);
  }

  getNotesForTrainee(traineeId: number): Note {
    if (this.notes.has(traineeId)) {
      return this.notes.get(traineeId)[0];
    }
  }

  setUpdatedBatch(batch: Batch) {
    this.onBatchUpdate.emit(batch);
  }

  getGradesForAssessmentAndTrainee(assessmentId: number, traineeId: number): Grade {
    if (this.grades.size > 0) {
      if (this.grades.has(assessmentId) && this.grades.get(assessmentId).length > 0) {
        return this.grades.get(assessmentId).filter(grade => {
          return grade.traineeId === traineeId && grade.assessmentId === assessmentId;
        })[0];
      }
    }
    return undefined;
  }

  getAverageGradeForAssessment(assessmentId: number): number {
    let sum = 0;
    let count = 0;
    if (this.grades.has(assessmentId)) {
      for (let grade of this.grades.get(assessmentId)) {
        sum += grade.score;
        count++;
      }
      return (sum / 100) / count;
    }
    return 0;
  }

  getBatchAverage(): number {
    if (this.grades.size === this.assessments.length) {
      const averages = [];
      for (let assessmentId of Array.from(this.grades.keys())) {
        averages.push(this.getAverageGradeForAssessment(assessmentId));
      }
      return averages.reduce((prev, curr) => prev + curr, 0) / averages.length;
    }
  }

  handleGradeUpdate(grade: Grade) {
    this.assessBatchGradeService.updateGrade(grade).subscribe(
      data => {
        // this.thisWeeksGrades$.push(this.assessBatchGradeService.getAllGradesByAssessmentId(grade.assessmentId));
        this.setUpdatedGrade(data);
      }
    )
  }

  handleGradeCreate(grade: Grade) {
    this.assessBatchGradeService.postGrade(grade).subscribe(
      data => {
        if (this.grades.has(data.assessmentId)) {
          this.grades.get(data.assessmentId).push(data);
        } else {
          this.grades.set(data.assessmentId, [data]);
        }
      }
    )
  }

  private addToColumn(category: Category) {
    if (this.columns.length > 0) {
      for (let column of this.columns) {
        if (column.assessment.assessmentCategory === category.categoryId) {
          column.category = category.skillCategory;
        }
      }
    }
  }

  private setUpdatedGrade(grade: Grade) {
    if (this.grades.has(grade.assessmentId)) {
      for (let g of this.grades.get(grade.assessmentId)) {
        if (g.assessmentId === grade.assessmentId && g.traineeId === grade.traineeId) {
          const index = this.grades.get(grade.assessmentId).findIndex(gr => gr.assessmentId === grade.assessmentId && gr.traineeId === grade.traineeId);
          if (index > 0) {
            this.grades.get(grade.assessmentId)[index] = grade;
          }
        }
      }
    }
  }
}
