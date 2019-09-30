import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {concatMap, distinctUntilChanged} from "rxjs/operators";
import {AssessmentChangeDto} from "../../../domain/dto/assessment-change.dto";
import {AssessmentDialogService} from "../../../shared/services/assessment-dialog.service";
import {CommentDialogService} from "../../../shared/services/comment-dialog.service";
import {Batch} from "../../../domain/model/batch.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {WeeklyAssociateNotes} from "../../../domain/dto/weekly-associate-notes.dto";
import {Assessment} from "../../../domain/model/assessment.dto";
import {Grade} from "../../../domain/model/grade.dto";
import {AssessBatchColumn} from "../../../domain/dto/assess-batch-column.dto";
import {Category} from "../../../domain/model/category.dto";
import {Note} from "../../../domain/model/assessment-note.dto";
import {WeekName} from "../../../domain/model/week-name.dto";
import {AssessBatchService} from "../../../services/assess-batch.service";
import {AssessmentService} from "../../../services/subvertical/assessment/assessment.service";
import {TraineeFlag} from "../../../domain/model/trainee-flag.dto";

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
  names: WeekName[] = [];
  private selectedWeekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.week);
  assessmentAverages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  overallAverage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Output("onBatchUpdate") onBatchUpdate: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  @Output("onWeekSelect") onWeekSelect: EventEmitter<number> = new EventEmitter<number>(true);
  private gradeRecalculator: EventEmitter<any> = new EventEmitter<any>(true);

  private lastAssessmentAction$: Observable<AssessmentChangeDto>;
  private lastComment$: Observable<Trainee>;
  lastFlag: Trainee;

  notesLoaded: boolean = false;

  constructor(
    private assessBatchService: AssessBatchService,
    private assessmentDialogService: AssessmentDialogService,
    private commentDialogService: CommentDialogService,
    private assessmentService: AssessmentService
  ) {
    this.assessBatchService.getActiveCategories().subscribe(
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

          this.assessmentService.getWeekNamesByBatchId(this.batch.batchId).subscribe((weekNames: WeekName[]) => {
            this.names = weekNames;
          });

          return this.assessBatchService.getTraineesByBatchId(batch.batchId);
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
            if (data) {
              this.trainees = data;
              if (comment) {
                this.lastFlag = comment;
              }
            }
          }
        );
      }
    );

    // React to a change in week or quarter based on dropdown
    combineLatest(this.selectedWeekSubject.asObservable(), this.selectedBatch.asObservable(), this.lastAssessmentAction$).pipe(distinctUntilChanged()).subscribe(
      ([week, batch]) => {
        if (week > 0 && Boolean(batch)) {
          this.selectedWeek = week;
          this.assessments$ = this.assessBatchService.getAssessmentsByBatchIdAndWeek(batch.batchId, week);
          if (Boolean(batch) && Boolean(batch.batchId) && Boolean(week)) {
            this.grades$ = this.assessBatchService.getGradesByBatchIdAndWeek(batch.batchId, week);
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
            this.notes$ = this.assessBatchService.getNoteMapByBatchIdAndWeek(batch.batchId, week);
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
            this.assessBatchService.getAssessmentsByBatchIdAndWeek(batch.batchId, week).subscribe(
              data => {
                this.assessments = data;
                this.totalPoints = 0;
                const averages = [];
                // For every assessment, populate the categoryIdsArray and add an entry to the `columns` array, leaving category blank
                for (let assessment of data) {
                  const found = this.columns.find(column => column.assessment.assessmentId === assessment.assessmentId);
                  if (found === undefined) {
                    // Create an AssessBatchColumn entry, leaving category to populate later
                    this.columns.push({
                      assessment: assessment,
                      category: ""
                    });
                    this.assessBatchService.getCategoryByCategoryId(assessment.assessmentCategory).subscribe(
                      data => {
                        this.addToColumn(data);
                      }
                    );
                  }
                  averages.push(this.getAverageGradeForAssessment(assessment.assessmentId));
                  this.totalPoints += assessment.rawScore;
                }
                this.assessmentAverages$.next(averages);
                this.overallAverage$.next(this.getBatchAverage(data));
              }
            );
          }
        }
      }
    );

    combineLatest(this.gradeRecalculator.asObservable()).subscribe(
      data => {
        const averages = [];
        for (let assessment of this.assessments) {
          const found = this.columns.find(column => column.assessment.assessmentId === assessment.assessmentId);
          if (found === undefined) {
            // Create an AssessBatchColumn entry, leaving category to populate later
            this.columns.push({
              assessment: assessment,
              category: ""
            });
            this.assessBatchService.getCategoryByCategoryId(assessment.assessmentCategory).subscribe(
              data => {
                this.addToColumn(data);
              }
            );
          }
          averages.push(this.getAverageGradeForAssessment(assessment.assessmentId));
          this.totalPoints += assessment.rawScore;
        }
        this.assessmentAverages$.next(averages);
        this.overallAverage$.next(this.getBatchAverage(this.assessments));
      }
    )
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
    } else {
      return {
        noteContent: '',
        noteType: "TRAINEE",
        weekNumber: this.week,
        batchId: this.batch.batchId,
        traineeId: traineeId,
      }
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
      const found = this.assessments.find(assessment => assessment.assessmentId === assessmentId);
      if (found) {
        return (sum / count) / found.rawScore;
      }
    }
    return 0;
  }

  getBatchAverage(assessments: Assessment[]): number {
    if (assessments && assessments.length > 0) {
      const averages = [];
      assessments.forEach(assessment => {
        averages.push(this.getAverageGradeForAssessment(assessment.assessmentId));
      });
      return averages.reduce((prev, curr) => prev + curr, 0) / assessments.length;
    }
    return 0;
  }

  handleGradeUpdate(grade: Grade) {
    if (grade) {
      this.setUpdatedGrade(grade);
      const averages = [];
      for (let assessment of this.assessments) {
        averages.push(this.getAverageGradeForAssessment(assessment.assessmentId));
      }
      this.assessmentAverages$.next(averages);
      this.overallAverage$.next(this.getBatchAverage(this.assessments));
      this.gradeRecalculator.emit(grade.assessmentId);
    }
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
        if (g.assessmentId === grade.assessmentId) {
          const index = this.grades.get(grade.assessmentId).findIndex(gr => gr.assessmentId === grade.assessmentId && gr.traineeId === grade.traineeId);
          if (index >= 0) {
            this.grades.get(grade.assessmentId)[index] = grade;
          }
        }
      }
    } else {
      this.grades.set(grade.assessmentId, [grade]);
    }
  }
}
