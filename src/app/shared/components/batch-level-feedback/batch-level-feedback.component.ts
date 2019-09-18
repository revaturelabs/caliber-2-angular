import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {BehaviorSubject, combineLatest} from "rxjs";
import {Note} from "../../../Batch/type/note";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QcNote} from "../../../Audit/types/note";

@Component({
  selector: 'app-batch-level-feedback',
  templateUrl: './batch-level-feedback.component.html',
  styleUrls: ['./batch-level-feedback.component.css']
})
export class BatchLevelFeedbackComponent implements OnInit, OnChanges {

  @Input("batchId") batchId: number;
  @Input("week") week: number;
  @Input("isQcFeedback") isQcFeedback: boolean;
  private batchIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.batchId);
  private weekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.week);
  batchNoteForm: FormGroup;

  note: Note;
  qcNote: QcNote = {
    content: "",
    type: "QC_BATCH",
    batchId: this.batchId,
    week: this.week,
    qcStatus: "Undefined"
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
    private noteService: NoteService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.batchNoteForm = this.generateBatchNoteForm();
    combineLatest(this.batchIdSubject.asObservable(), this.weekSubject.asObservable()).subscribe(
      ([batchId, week]) => {
        if (batchId && week) {
          if (!this.isQcFeedback) {
            this.noteService.getBatchNoteByBatchIdAndWeekNumber(batchId, week).subscribe(
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
            this.noteService.getOverallQcNoteByBatchAndWeek(batchId, week).toPromise().then(
              data => {
                this.qcNote = data;
                if (data && data.content) {
                  this.batchNoteForm.patchValue({
                    batchNote: data.content
                  });
                  this.success = true;
                } else {
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
    this.isSaving = true;
    this.success = false;
    this.failure = false;
    const noteContent = this.batchNoteForm.get("batchNote").value;
    if (Boolean(noteContent)) {
      if (Boolean(this.note)) {
        // If note already exists, update
        this.note.noteContent = noteContent;
        this.noteService.putNote(this.note).subscribe(
          (data: Note) => {
            this.note = data;
            setTimeout(() => this.isSaving = false, this.timeout);
            this.success = true;
          }, err => {
            setTimeout(() => this.isSaving = false, this.timeout);
            this.failure = true;
          }
        )
      } else {
        // If note does not already exist, create
        this.note = {
          batchId: this.batchId,
          weekNumber: this.week,
          noteContent: noteContent,
          noteType: "QC_BATCH",
          traineeId: -1
        };
        this.noteService.postNote(this.note).subscribe(
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
  }

  handleQcNoteUpdate() {
    const noteContent = this.batchNoteForm.get("batchNote").value;
    if (!this.qcNote) {
      this.qcNote = {
        content: "",
        type: "QC_BATCH",
        batchId: this.batchId,
        week: this.week,
        qcStatus: "Undefined"
      }
    }
    if (Boolean(noteContent)) {
      // Only begin network request if there is note content
      this.qcNote.content = noteContent;
      this.isSaving = true;
      this.success = false;
      this.failure = false;
      this.noteService.createQcBatchNote(this.qcNote).toPromise().then(
        data => {
          this.qcNote = data;
          setTimeout(() => this.isSaving = false, this.timeout);
          this.success = true;
        }, () => {
          setTimeout(() => this.isSaving = false, this.timeout);
          this.failure = true;
        }
      )
    }
  }

  private isValidFirstChange(change: SimpleChange): boolean {
    return change.isFirstChange() && change.previousValue === undefined && change.currentValue !== undefined
  }

  private isValidSubsequentChange(change: SimpleChange): boolean {
    return change.previousValue !== undefined && change.currentValue !== undefined && change.previousValue !== change.currentValue;
  }
}
