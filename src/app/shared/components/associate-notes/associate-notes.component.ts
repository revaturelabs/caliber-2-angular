import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Trainee} from "../../../Batch/type/trainee";
import {Note} from "../../../Batch/type/note";
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {QcNote} from "../../../Audit/types/note";

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
  traineeNotesForm: FormGroup;

  isSaving: boolean = false;
  success: boolean = false;
  failure: boolean = false;

  private readonly timeout: number = 250;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
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
    this.isSaving = false;
    this.success = false;
    this.failure = false;
    const noteContent: string = this.traineeNotesForm.get("notes").value;
    // When assessment note is supplied
    if (this.note && !this.qcNote) {
      // Only send network request if there is note content
      if (Boolean(noteContent)) {
        this.isSaving = true;
        // If the note supplied to this component is undefined, it has yet to be created
        if (this.note.noteId === undefined) {
          this.noteService.postNote(this.note).subscribe(
            (data: Note) => {
              this.note = data;
              setTimeout(() => this.isSaving = false, this.timeout);
              this.success = true;
            }, err => {
              this.isSaving = false;
              this.failure = true;
            }
          )
        } else {
          // If the note supplied to the component has a note id, we update
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
        }
      } else {
        if (this.note !== undefined) {
          this.isSaving = true;
          this.note.noteContent = noteContent;
          this.noteService.putNote(this.note).subscribe(
            (data: Note) => {
              setTimeout(() => this.isSaving = false, this.timeout);
              this.onNoteUpdate.emit(data);
              this.success = true;
            }, err => {
              setTimeout(() => this.isSaving = false, this.timeout);
              this.failure = true;
            }
          )
        }
      }
    }
    // I know, formatting, right?
    // This branch is for when QC Note is supplied, but not assessment note
    else if (!this.note && this.qcNote) {
      if (Boolean(noteContent)) {
        this.isSaving = true;
        // Set current QC note to have last note content
        this.qcNote.content = noteContent;
        // QC Note does not have a note id, so we create it
        if (this.qcNote.noteId <= 0) {
          this.noteService.createQcTraineeNote(this.qcNote).toPromise().then(
            data => {
              this.qcNote = data;
              setTimeout(() => this.isSaving = false, this.timeout);
              this.success = true;
            }, () => {
              setTimeout(() => this.isSaving = false, this.timeout);
              this.failure = true;
            }
          )
        } else {
          // QC Note does have an id => it has already been persisted => need to update
          this.noteService.updateQcTraineeNote(this.qcNote).toPromise().then(
            data => {
              this.qcNote = data;
              setTimeout(() => this.isSaving = false, this.timeout);
              this.success = true;
            }, () => {
              setTimeout(() => this.isSaving = false, this.timeout);
              this.failure = false;
            }
          )
        }
      }
    }
  }

}
