import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Trainee} from "../../../Batch/type/trainee";
import {Note} from "../../../Batch/type/note";
import {NoteService} from "../../../Assess-Batch/Services/note.service";

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
  }

  private generateForm(): FormGroup {
    if (Boolean(this.note) && Boolean(this.note.noteContent)) {
      this.success = true;
      return this.fb.group({
        "notes": [this.note.noteContent]
      });
    }
    return this.fb.group({
      "notes": ['']
    })
  }

  handleNote() {
    this.isSaving = true;
    this.success = false;
    this.failure = false;
    const noteContent: string = this.traineeNotesForm.get("notes").value;
    if (Boolean(noteContent)) {
      if (this.note === undefined) {
        this.note = {
          noteContent: noteContent,
          traineeId: this.trainee.traineeId,
          batchId: this.batchId,
          weekNumber: this.week,
          noteType: "TRAINEE",
        };
        this.noteService.postNote(this.note).subscribe(
          (data: Note) => {
            this.note = data;
            this.onNoteUpdate.emit(data);
            setTimeout(() => this.isSaving = false, this.timeout);
            this.success = true;
          }, err => {
            this.isSaving = false;
            this.failure = true;
          }
        )
      } else {
        this.note.noteContent = noteContent;
        this.noteService.putNote(this.note).subscribe(
          (data: Note) => {
            this.onNoteUpdate.emit(data);
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

}
