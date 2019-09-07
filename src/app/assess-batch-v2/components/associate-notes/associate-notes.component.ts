import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Trainee} from "../../../Batch/type/trainee";
import {Note} from "../../../Batch/type/note";

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
  traineeNotesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

}
