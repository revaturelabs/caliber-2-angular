import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/Batch/type/note';
import { NoteService } from '../../Services/note.service';

@Component({
 selector: 'app-feedback',
 templateUrl: './feedback.component.html',
 styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
 batchNoteArr: Note[] = [];
 selectedWeek: number;
 batchId: number;
 feedbackNote: Note = {
  noteId: undefined,
  noteContent: undefined,
  noteType: undefined,
  weekNumber: undefined,
  batchId: undefined,
  traineeId: undefined
 };

 constructor(private noteService: NoteService) { }
//provides the traineer feedback note for the week
getFeedbackNote(){
  //get all batch notes for the week
  this.noteService.noteEmitter
  .subscribe(result => {
    this.feedbackNote = new Note(-2, "", "BATCH", this.selectedWeek, this.batchId, -1);
    this.batchNoteArr = [];
    //narrow down to the singla1r feedback note
    for(let n of result){
      if(n.noteType == 'BATCH'){
        this.feedbackNote = n;
      }
    }
    if(this.batchNoteArr.length == 1){
      this.feedbackNote = this.batchNoteArr[0];
    }
  });
}

//persists input text into textarea after leaving the focus area
feedbackNoteOnBlur(){
  if(this.feedbackNote.noteId == -2){
    this.feedbackNote.noteId = -5;
    this.feedbackNote.batchId = this.batchId;
    this.feedbackNote.weekNumber = this.selectedWeek;
    this.noteService.postNote(this.feedbackNote)
    .subscribe(result => {

    });
  }
  else{
  this.feedbackNote.batchId = this.batchId;
  this.noteService.putNote(this.feedbackNote)
  .subscribe(result => {
  });
 }
}

//Component init grabs the selected week so it can get the appropriate overall feedback note.
ngOnInit() {
  this.noteService.weekEmitter.subscribe((selectedWeek) => {
    this.selectedWeek = selectedWeek;
   });

   this.noteService.batchIdEmitter.subscribe((batchId) => {
     this.batchId = batchId;
    }); 
  this.getFeedbackNote();
 }
}

