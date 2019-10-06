import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {QcNote} from "../../../domain/model/qc-note.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Note} from "../../../domain/model/assessment-note.dto";
import {QaService} from "../../../services/qa.service";
import {AssessmentNotesService} from "../../../services/subvertical/assessment/assessment-notes.service";
import {QaNotesService} from "../../../services/subvertical/quality-audit/qa-notes.service";

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
    private assessmentNotesService: AssessmentNotesService,
    private qcNotesService: QaNotesService
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
    const noteContent: string = this.traineeNotesForm.get("notes").value;
    // When assessment note is supplied
    if (Boolean(noteContent) && this.note.noteContent !== noteContent) {
      this.success = false;
      this.failure = false;
      this.isSaving = true;
      this.note.noteContent = noteContent;
      this.assessmentNotesService.upsertNote(this.note).toPromise().then(
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
    if (Boolean(noteContent) && this.qcNote.content !== noteContent) {
      this.isSaving = true;
      if (this.isQcNote) {
        qcNote.content = noteContent;
        this.qcNotesService.upsertQcTraineeNote(qcNote).toPromise().then(
          data => {
            this.qcNote = data;
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
