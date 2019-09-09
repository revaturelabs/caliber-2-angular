import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {combineLatest} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Note} from "../../../Batch/type/note";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-batch-level-feedback',
  templateUrl: './batch-level-feedback.component.html',
  styleUrls: ['./batch-level-feedback.component.css']
})
export class BatchLevelFeedbackComponent implements OnInit, OnChanges {

  @Input("batchId") batchId: number;
  @Input("week") week: number;
  private batchIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.batchId);
  private weekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.week);
  batchNote$: Observable<Note>;
  shouldCreate: boolean = false;
  note: Note;

  private lastUpdatedBatchNote$: BehaviorSubject<Note> = new BehaviorSubject<Note>(this.note);
  batchNoteForm: FormGroup;

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.batchNoteForm = this.generateBatchNoteForm();
    combineLatest(this.batchIdSubject.asObservable(), this.weekSubject.asObservable(), this.lastUpdatedBatchNote$.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([batchId, week, note]) => {
        console.log(`Latest batchId value: ${batchId}`);
        console.log(`Latest week value: ${week}`);
        if (Boolean(this.note) && this.note.noteContent) {
          console.log(`Latest note value: ${this.note.noteContent}`);
        } else {

        }
        this.batchNote$ = this.noteService.getBatchNoteByBatchIdAndWeekNumber(batchId, week);
        this.batchNote$.subscribe(
          data => {
            if (data === null) {
              this.shouldCreate = true;
            } else {
              this.shouldCreate = false;
              this.note = data;
            }
          }
        )
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

  handleNoteUpdate() {
    if (this.shouldCreate) {
      const note: Note = {
        noteContent: this.batchNoteForm.get("batchNote").value,
        batchId: this.batchId,
        weekNumber: this.week,
        noteType: "BATCH",
        noteId: 0,
        traineeId: 0
      };
      this.noteService.postNote(note).subscribe(
        data => {
          this.note = data;
          this.lastUpdatedBatchNote$.next(data);
        }
      );
      this.shouldCreate = false;
    } else {
      this.note.noteContent = this.batchNoteForm.get("batchNote").value;
      this.noteService.putNote(this.note).subscribe(
        (data: Note) => {
          this.note = data;
          this.lastUpdatedBatchNote$.next(data);
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
