import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {BehaviorSubject, combineLatest} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QcNote} from "../../../domain/model/qc-note.dto";
import {Note} from "../../../domain/model/assessment-note.dto";
import {AssessmentNotesService} from "../../../services/subvertical/assessment/assessment-notes.service";
import {QaNotesService} from "../../../services/subvertical/quality-audit/qa-notes.service";

@Component({
  selector: 'app-batch-level-feedback',
  templateUrl: './batch-level-feedback.component.html',
  styleUrls: ['./batch-level-feedback.component.css']
})
export class BatchLevelFeedbackComponent implements OnInit, OnChanges {

  @Input("batchId") batchId: number;
  @Input("week") week: number;
  @Input("isQcFeedback") isQcFeedback: boolean;
  @Input('lastQcStatus') lastQcStatus: string;
  @Input("lastBatchNoteChange") lastBatchNoteChange: QcNote;
  @Output("onBatchNoteChange") onBatchNoteChange: EventEmitter<QcNote> = new EventEmitter<QcNote>(true);
  private batchIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.batchId);
  private weekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.week);
  batchNoteForm: FormGroup;

  note: Note = {
    noteContent: "",
    traineeId: -1,
    weekNumber: this.week,
    batchId: this.batchId,
    noteType: "BATCH"
  };
  qcNote: QcNote = {
    content: "",
    type: "QC_BATCH",
    batchId: this.batchId,
    week: this.week,
    technicalStatus: "Undefined",
    softSkillStatus: "Undefined"
  };

  private readonly timeout: number = 250;

  showSaving = false;
  showCheck = false;
  showFloppy = true;

  // Used to track state of spinner - spinner if saving, check if success, red x if failure
  isSaving: boolean = false;
  success: boolean = false;
  failure: boolean = false;

  constructor(
    private fb: FormBuilder,
    private assessmentNoteService: AssessmentNotesService,
    private qcNoteService: QaNotesService
  ) {
  }

  ngOnInit() {
    this.batchNoteForm = this.generateBatchNoteForm();
    combineLatest(this.batchIdSubject.asObservable(), this.weekSubject.asObservable()).subscribe(
      ([batchId, week]) => {
        if (batchId && week) {
          if (!this.isQcFeedback) {
            this.assessmentNoteService.getBatchNoteByBatchAndWeek(batchId, week).subscribe(
              data => {
                this.note = data;
                if (data && data.noteContent) {
                  this.batchNoteForm.patchValue({
                    batchNote: data.noteContent
                  });
                  this.success = true;
                } else {
                  this.isSaving = false;
                  this.failure = false;
                  this.success = false;
                }
              }
            )
          } else {
            this.qcNoteService.getQcBatchNotesByBatchAndWeek(batchId, week).toPromise().then(
              data => {
                this.qcNote = data;
                if (data && data.content) {
                  this.batchNoteForm.patchValue({
                    batchNote: data.content
                  });
                  this.success = true;
                } else {
                  this.qcNote = {
                    content: "",
                    type: "QC_BATCH",
                    batchId: this.batchId,
                    week: this.week,
                    technicalStatus: "Undefined",
                    softSkillStatus: "Undefined"
                  };
                  this.isSaving = false;
                  this.failure = false;
                  this.success = false;
                }
              }
            ).catch(() => {
              this.isSaving = false;
              this.failure = true;
            })
          }
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'batchId') {
        if (this.isValidFirstChange(change) || this.isValidSubsequentChange(change)) {
          this.batchIdSubject.next(change.currentValue)
        }
      } else if (prop === "week") {
        if (this.isValidFirstChange(change) || this.isValidSubsequentChange(change)) {
          this.weekSubject.next(change.currentValue);
        }
      } else if (prop === 'lastQcStatus') {
        if (this.qcNote && !change.isFirstChange()) {
          this.qcNote.technicalStatus = change.currentValue;
        }
      } else if (prop === 'lastBatchNoteChange') {
        this.qcNote = change.currentValue;
        setTimeout(() => this.isSaving = false, this.timeout);
        this.success = true;
      }
    }
  }

  private generateBatchNoteForm(): FormGroup {
    return this.fb.group({
      "batchNote": ''
    });
  }

  //doBurrito acts as the mock save
  doBurrito() {
    this.showFloppy = false;
    this.showSaving = true;
    setTimeout(() => {
      this.showSaving = false;
      this.showCheck = true
    }, 1000);
    setTimeout(() => {
      this.showCheck = false;
      this.showFloppy = true
    }, 2000);
  }

  handleNoteUpdate() {
    const noteContent = this.batchNoteForm.get("batchNote").value;
    if (Boolean(noteContent)) {
      if (!Boolean(this.note)) {
        this.note = {
          noteContent: noteContent,
          traineeId: -1,
          weekNumber: this.week,
          batchId: this.batchId,
          noteType: "BATCH"
        }
      } else {
        if (this.note.noteContent !== noteContent) {
          this.note.noteContent = noteContent;
        } else {
          return;
        }
      }
      this.isSaving = true;
      this.success = false;
      this.failure = false;
      this.assessmentNoteService.upsertNote(this.note).subscribe(
        (data: Note) => {
          this.note = data;
          setTimeout(() => this.isSaving = false, this.timeout);
          this.success = true;
        }, err => {
          setTimeout(() => this.isSaving = false, this.timeout);
          this.failure = true;
        }
      )
    }
  }

  handleQcNoteUpdate() {
    const noteContent = this.batchNoteForm.get("batchNote").value;
    // Only begin network request if there is note content
    if (Boolean(noteContent) && this.qcNote.content !== noteContent) {
      if (this.qcNote) {
        if (this.qcNote.content !== noteContent) {
          this.qcNote.content = noteContent;
        } else {
          return;
        }
      } else {
        this.qcNote = {
          content: noteContent,
          type: "QC_BATCH",
          week: this.week,
          batchId: this.batchId,
        };
      }
      this.isSaving = true;
      this.success = false;
      this.failure = false;
      // If the qcNote was already set from qaService.getOverallQcNoteByBatchAndWeek
      this.onBatchNoteChange.emit(this.qcNote);
    }
  }

  private isValidFirstChange(change: SimpleChange): boolean {
    return change.isFirstChange() && change.previousValue === undefined && change.currentValue !== undefined
  }

  private isValidSubsequentChange(change: SimpleChange): boolean {
    return change.previousValue !== undefined && change.currentValue !== undefined && change.previousValue !== change.currentValue;
  }
}
