import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/Batch/type/note';
import { BatchModalComponent } from '../../batch-modal/batch-modal.component';
import { NoteService } from '../../Services/note.service';

@Component({
 selector: 'app-feedback',
 templateUrl: './feedback.component.html',
 styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
 notes: Note[];
 selectedWeek: number;
 feedbackNote: Note;
 selectedBatchId: number;
 selectedWeekId: NumberConstructor;
 traineeId: number;
 @ViewChild('batchModal') batchModal: BatchModalComponent;

 constructor(private noteService: NoteService) { }

//provides the traineer feedback note for the week
getFeedbackNote(selectedBatchId, selectedWeek){
  //get all batch notes for the week
  this.noteService.getBatchNotesByWeek(selectedBatchId, selectedWeek)
  .subscribe(result => {
    //narrow down to the singlar feedback note
    for(let n of result){
      if(n.noteType == 'BATCH'){
        this.notes.push(n);
      }
    }
    if(this.notes.length = 1){
      this.feedbackNote = this.notes[0];
    }
    console.log(this.notes);
  });
 }

 //updates feedback note on blur
updateFeedbackNote(){
  this.noteService.putNote(this.feedbackNote);
 }

ngOnInit() {

 }
}

