import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QaService} from "../../../services/qa.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Category} from "../../../domain/model/category.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {QcNote} from "../../../domain/model/qc-note.dto";

@Component({
  selector: 'app-quality-audit-list',
  templateUrl: './quality-audit-list.component.html',
  styleUrls: ['./quality-audit-list.component.css'],
})
export class QualityAuditListComponent implements OnInit, OnChanges {

  @Input('week') week: number;
  @Input('batchId') batchId: number;

  categories$: Observable<Category[]>;
  trainees$: Observable<Trainee[]>;
  trainees: Trainee[];
  notesLoaded: boolean = false;

  private lastBatchId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private lastWeek$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private noteMap: Map<number, QcNote> = new Map<number, QcNote>();
  private lastBatchAudit$: EventEmitter<QcNote> = new EventEmitter<QcNote>(true);
  qcBatchNote: QcNote;
  showCalculatedFeedback: boolean = false;
  lastQcStatus: string;
  lastBatchNoteChange: QcNote;

  constructor(
    private qaService: QaService
  ) { }

  ngOnInit() {
    this.categories$ = this.qaService.getActiveCategories();
    combineLatest(this.lastBatchId$.asObservable(), this.lastWeek$.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([batchId, week]) => {
        if (batchId > 0 && week > 0) {
          this.noteMap = new Map<number, QcNote>();
          this.notesLoaded = false;
          this.qcBatchNote = undefined;
          this.trainees$ = this.qaService.getTraineesByBatch(batchId);
          this.qaService.getQcTraineeNotesByBatchAndWeek(batchId, week).subscribe(
            data => {
              if (data && data.length > 0) {
                for (let note of data) {
                  this.noteMap.set(note.traineeId, note);
                  this.notesLoaded = true;
                }
              }
            }
          );
          this.qaService.getQcBatchNotesByBatchAndWeek(batchId, week).subscribe(
            data => {
              if (data) {
                this.qcBatchNote = data;
              }
            }
          )
        }
      }
    );

    combineLatest(this.lastBatchAudit$.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([data]) => {
        if (data) {
          this.lastBatchNoteChange = data;
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'week') {
        this.lastWeek$.next(change.currentValue);
      } else if (prop === 'batchId') {
        this.lastBatchId$.next(change.currentValue);
      }
    }
  }

  getQcTraineeNote(traineeId: number): QcNote {
    if (this.noteMap.has(traineeId) && this.noteMap.get(traineeId).technicalStatus !== undefined) {
      return this.noteMap.get(traineeId);
    } else {
      return {
        technicalStatus: "Undefined",
        softSkillStatus: "Undefined",
        traineeId: traineeId,
        batchId: this.batchId,
        week: this.week,
        content: "",
        type: "QC_TRAINEE",
      };
    }
  }

  getQcBatchNote(): QcNote {
    if (this.qcBatchNote) {
      return this.qcBatchNote;
    } else {
      this.qcBatchNote = {
        week: this.week,
        batchId: this.batchId,
        type: "QC_BATCH",
        technicalStatus: "Undefined",
        softSkillStatus: "Undefined",
        content: "",
      };
      return this.qcBatchNote;
    }
  }

  determineOverallBatchScore(): QcNote | undefined {
    if (this.noteMap && this.noteMap.size) {
      // Helper object
      const results = {
        missing: {
          value: 0,
          increment: () => { /* no op */ }
        },
        red: {
          value: 0,
          delta: 1,
          increment: function () {
            this.value += this.delta;
          }
        },
        yellow: {
          value: 0,
          delta: 2,
          increment: function () {
            this.value += this.delta;
          }
        },
        green: {
          value: 0,
          delta: 3,
          increment: function () {
            this.value += this.delta;
          }
        },
        superstar: {
          value: 0,
          delta: 4,
          increment: function () {
            this.value += this.delta;
          }
        }
      };

      // Calculate values
      this.noteMap.forEach((value, key) => {
        if (value.technicalStatus === "Poor") {
          results.red.increment();
        } else if (value.technicalStatus === "Average") {
          results.yellow.increment();
        } else if (value.technicalStatus === "Good") {
          results.green.increment();
        } else if (value.technicalStatus === "Superstar") {
          results.superstar.increment();
        } else {
          results.missing.increment();
        }
      });

      // Get the sum (Obviously)
      const sum = Object.keys(results).map(key => results[key].value).reduce((current, result) => current + result, 0);

      // Divide each value by itself..?
      // x + x + x + ... + x <==> x * n ==> x / x = n, the number of people who received the score
      const denominator = Object.keys(results).map(key => results[key].value > 0 ? results[key].value / results[key].delta : 0).reduce((current, result) => current + result, 0);
      const overallResult = sum / denominator;

      // 2.5 < x
      if (2.5 < overallResult) {
        return { ...this.getQcBatchNote(), technicalStatus: "Good"};
      }
      // 2 < x <= 2.5
      else if (2.5 >= overallResult && overallResult > 2) {
        return { ...this.getQcBatchNote(), technicalStatus: "Average"};
      }
      // 0 < x <= 2
      else if (overallResult <= 2 && overallResult > 0) {
        return { ...this.getQcBatchNote(), technicalStatus: "Poor"};
      }
    }
    return undefined;
  }

  handleQcBatchNoteChange(qcNote: QcNote) {
    const currentNote: QcNote = { ...this.qcBatchNote, technicalStatus: qcNote.technicalStatus, content: qcNote.content};
    this.qaService.upsertQcBatchNote(currentNote).toPromise().then(
      data => {
        this.lastBatchAudit$.next(data);
        this.qcBatchNote = data;
      }
    )
  }

  handleQcStatusChange(qcNote: QcNote) {
    let currentNote: QcNote = qcNote;
    currentNote.technicalStatus = qcNote.technicalStatus;
    currentNote.softSkillStatus = qcNote.softSkillStatus;
    currentNote.content = qcNote.content;
    this.qaService.upsertQcTraineeNote(currentNote).subscribe(
      data => {
        this.noteMap.set(data.traineeId, data);
        // Whenever an Individual Qc Note Changes, recalculate the overall score
        this.handleQcBatchNoteChange(this.determineOverallBatchScore());
      }
    )
  }

  show() {
    this.showCalculatedFeedback = true;
  }

  hide() {
    this.showCalculatedFeedback = false;
  }
}
