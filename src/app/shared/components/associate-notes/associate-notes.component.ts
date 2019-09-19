import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {QcNote} from "../../../domain/model/qc-note.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Note} from "../../../domain/model/assessment-note.dto";
import {AssessBatchService} from "../../../services/assess-batch.service";
import {QaService} from "../../../services/qa.service";

@Component({
  selector: 'app-associate-notes',
  templateUrl: './associate-notes.component.html',
  styleUrls: ['./associate-notes.component.css']
})
export class AssociateNotesComponent implements OnInit {

  @Input("trainee") trainee: Trainee;
  @Input("week") week: number;
  @Input("batchId") batchId: number;
  @Input("note") note: Note;
  @Input("isQcNote") isQcNote: boolean;
  @Input("qcNote") qcNote: QcNote;
  @Output("onNoteUpdate") onNoteUpdate: EventEmitter<Note> = new EventEmitter<Note>(true);
  @Output("onQcNoteUpdate") onQcNoteUpdate: EventEmitter<QcNote> = new EventEmitter<QcNote>(true);
  traineeNotesForm: FormGroup;

  isSaving: boolean = false;
  success: boolean = false;
  failure: boolean = false;

  private readonly timeout: number = 250;

  constructor(
    private fb: FormBuilder,
    private assessBatchService: AssessBatchService,
    private qaService: QaService
  ) { }

  ngOnInit() {
    this.traineeNotesForm = this.generateForm();
    if (this.note && this.note.noteContent && this.qcNote === undefined) {
      this.traineeNotesForm.patchValue({
        "notes": this.note.noteContent
      });
      this.success = true;
    } else if (this.qcNote && this.qcNote.content && this.note === undefined) {
      this.traineeNotesForm.patchValue({
        "notes": this.qcNote.content
      });
      this.success = true;
    }
  }



  private generateForm(): FormGroup {
    return this.fb.group({
      "notes": ['']
    })
  }

  handleNote() {
    this.success = false;
    this.failure = false;
    const noteContent: string = this.traineeNotesForm.get("notes").value;
    // When assessment note is supplied
    if (Boolean(noteContent)) {
      this.isSaving = true;
      this.note.noteContent = noteContent;
      this.qaService.upsertNote(this.note).toPromise().then(
        data => {
          this.note = data;
          setTimeout(() => this.isSaving = false, this.timeout);
          this.success = true;
        }, () => {
          this.isSaving = false;
          this.failure = true;
        }
      );
    }
  }

  handleQcNote(qcNote: QcNote) {
    const noteContent: string = this.traineeNotesForm.get("notes").value;
    if (Boolean(noteContent)) {
      this.isSaving = true;
      if (this.isQcNote) {
        qcNote.content = noteContent;
        this.qaService.upsertQcTraineeNote(qcNote).toPromise().then(
          data => {
            this.qcNote = data;
            this.onQcNoteUpdate.emit(data);
            setTimeout(() => this.isSaving = false, this.timeout);
            this.success = true;
          }, () => {
            this.isSaving = false;
            this.failure = true;
          }
        );
      }
    }
  }

}
