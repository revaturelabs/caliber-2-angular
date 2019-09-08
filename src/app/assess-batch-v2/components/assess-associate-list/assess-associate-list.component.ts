import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Batch} from "../../../Batch/type/batch";
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import {BehaviorSubject, combineLatest, from, Observable, of} from "rxjs";
import { concatMap, distinctUntilChanged } from "rxjs/operators";
import {Grade, Trainee} from "../../../Batch/type/trainee";
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {AssessBatchColumn, WeeklyAssociateNotes} from "../../../app.dto";
import {Note} from "../../../Batch/type/note";
import {AssessBatchGradeService} from "../../../Assess-Batch/Services/assess-batch-grades.service";
import {Category, traineeAssessment} from "../../../User/user/types/trainee";

@Component({
  selector: 'app-assess-associate-list',
  templateUrl: './assess-associate-list.component.html',
  styleUrls: ['./assess-associate-list.component.css']
})
export class AssessAssociateListComponent implements OnInit, OnChanges {

  @Input("batch") batch: Batch;
  private selectedBatch: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(this.batch);
  private trainees$: Observable<Trainee[]>;
  private notes$: Observable<WeeklyAssociateNotes>;
  private assessments$: Observable<traineeAssessment[]>;
  private thisWeeksGrades$: Observable<Grade[]>[];
  columns: AssessBatchColumn[];
  grades: Map<number, Grade[]>;
  totalPoints: number;
  categories: Category[] = [];
  trainees: Trainee[] = [];
  selectedWeek: number;
  notes: Map<number, Note[]>;
  assessments: traineeAssessment[] = [];
  private selectedWeekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Output("onBatchUpdate") onBatchUpdate: EventEmitter<Batch> = new EventEmitter<Batch>(true);

  notesLoaded: boolean = false;

  constructor(
    private traineeService: TraineeService,
    private noteService: NoteService,
    private assessBatchGradeService: AssessBatchGradeService
  ) { }

  ngOnInit() {
    this.totalPoints = 0;
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

    this.trainees$.subscribe(
      data => {
        this.trainees = data
      }
    );

    // React to a change in week or quarter based on dropdown
    combineLatest(this.selectedWeekSubject.asObservable(), this.selectedBatch.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([week, batch]) => {
        this.thisWeeksGrades$ = [];
        if (Boolean(batch) && Boolean(batch.batchId) && Boolean(week)) {
          this.notes$ = this.noteService.getNoteMapByBatchIdAndWeekNumber(batch.batchId, week);
          this.assessments$ = this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(batch.batchId, week);
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

          this.assessments$.subscribe(
            data => {
              this.assessments = data;
              // Array to hold which category id's to fetch
              const categoryIdsArray: number[] = [];

              // For every assessment, populate the categoryIdsArray and add an entry to the `columns` array, leaving category blank
              for (let assessment of this.assessments) {
                if (!categoryIdsArray.includes(assessment.assessmentCategory)) {
                  categoryIdsArray.push(assessment.assessmentCategory);
                  const found = this.columns.find(column => column.assessmentId === assessment.assessmentId);
                  if (found === undefined) {
                    // Create an AssessBatchColumn entry, leaving category to populate later
                    this.columns.push({
                      assessmentId: assessment.assessmentId,
                      rawScore: assessment.rawScore,
                      assessmentType: assessment.assessmentType,
                      categoryId: assessment.assessmentCategory,
                      category: ""
                    });

                    // Add a grades observable to the array for each assessment
                    this.thisWeeksGrades$.push(this.assessBatchGradeService.getAllGradesByAssessmentId(assessment.assessmentId));
                  }
                }
              }

              // After the category array has been populated, fetch each category and set category for `columns` array
              from(categoryIdsArray).pipe(
                distinctUntilChanged(),
                concatMap(categoryId => this.assessBatchGradeService.getCategoryByCategoryId(categoryId))
              ).subscribe(
                data => {
                  if (this.categories.length === 0) {
                    this.categories.push(data);
                    this.addCategoryToColumn(data);
                  } else {
                    const found = this.categories.find(category => category.categoryId === data.categoryId);
                    if (found === undefined) {
                      this.categories.push(data);
                      this.addCategoryToColumn(data);
                    }
                  }
                }
              );

              // Once we have all the grades to fetch, get them individually and add to `rows`
              from(this.thisWeeksGrades$).pipe(
                concatMap(data => data)
              ).subscribe(
                data => {
                  if (data.length > 0) {
                    const assessmentId: number = data[0].assessmentId;
                    this.grades.set(assessmentId, data);
                  }
                }
              );
            }
          );
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (change.currentValue !== undefined) {
        this.setSelectedWeek(this.batch.weeks);
        this.selectedBatch.next(change.currentValue);
      }
    }
  }

  setSelectedWeek(week: number) {
    this.notesLoaded = false;
    this.selectedWeek = week;
    this.selectedWeekSubject.next(this.selectedWeek);
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

  handleGradeUpdate(grade: Grade) {
    console.log(grade);
    this.assessBatchGradeService.updateGrade(grade).subscribe(
      data => {
        this.thisWeeksGrades$.push(this.assessBatchGradeService.getAllGradesByAssessmentId(grade.assessmentId));
      }
    )
  }

  private addCategoryToColumn(category: Category) {
    for (let column of this.columns) {
      if (column.categoryId === category.categoryId && column.category === "") {
        column.category = category.skillCategory;
        this.totalPoints += column.rawScore;
      }
    }
  }
}
