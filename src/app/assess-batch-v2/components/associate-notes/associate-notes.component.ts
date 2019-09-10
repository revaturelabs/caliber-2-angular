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
export class AssociateNotesComponent implements OnInit, OnChanges {

  @Input("trainee") trainee: Trainee;
  @Input("week") week: number;
  @Input("batchId") batchId: number;
  @Input("note") note: Note;
  @Output("onNoteUpdate") onNoteUpdate: EventEmitter<Note> = new EventEmitter<Note>(true);
  traineeNotesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.traineeNotesForm = this.generateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      // Only call for notes once we change the current week
      if (typeof change.previousValue === 'number' && typeof change.currentValue === 'number') {
        console.log(`Found associate ${this.trainee.traineeId} for week ${this.week}`);
      }
    }
  }

  private generateForm(): FormGroup {
    if (Boolean(this.note) && Boolean(this.note.noteContent)) {
      return this.fb.group({
        "notes": [this.note.noteContent]
      })
    }
    return this.fb.group({
      "notes": ['']
    })
  }

  handleNote() {
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
          }
        )
      } else {
        this.note.noteContent = noteContent;
        this.noteService.putNote(this.note).subscribe(
          (data: Note) => {
            this.onNoteUpdate.emit(data);
          }
        )
      }
    } else {
      if (this.note !== undefined) {
        this.note.noteContent = noteContent;
        this.noteService.putNote(this.note).subscribe(
          (data: Note) => {
            this.onNoteUpdate.emit(data);
          }
        )
      }
    }
  }

}
