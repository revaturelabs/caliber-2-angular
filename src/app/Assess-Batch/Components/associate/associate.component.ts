import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
import { NoteService } from '../../Services/note.service';
import { Note } from 'src/app/Batch/type/note';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  // List of test notes
  notes = [
    {
      qcStatus: 'Undefined',
      noteId: 0,
      noteFlagInputActive: false,
      trainee: {
        name: 'Hajek, Alexander',
        project: '89.45',
        verbal: '79.23',
        exam: '78.23',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    }
  ];

  traineeArr: Trainee[] = [];
  noteArr: Note[] = [];
  

  // Unimplemented functions
  constructor(private traineeService: TraineeService, private noteService: NoteService) { }
  ngOnInit( ) {
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
      console.log(traineeArr);
    });
    
    this.noteService.noteEmitter.subscribe((noteArr) => {
     
      this.noteArr = noteArr;
      this.sortNoteArrayByTraineeId();
      console.log(noteArr);
      this.makeContentArray();
      
      
    });
  }
  
  change: Boolean;
  i : number;
  temp: Note;
sortNoteArrayByTraineeId(){

  do {
    this.change=false;
 for(this.i=0;this.i<this.noteArr.length-1;this.i++){

if (this.noteArr[this.i].traineeId>this.noteArr[this.i+1].traineeId)
{
  this.temp=this.noteArr[this.i];
  this.noteArr[this.i]=this.noteArr[this.i+1];
  this.noteArr[this.i+1]=this.temp;
  this.change=true
}

 }
 
}while (this.change)
return this.noteArr;
}
content: string[]=[]
makeContentArray(){
  for(this.i=0;this.i<this.noteArr.length;this.i++){
this.content[this.i]=this.noteArr[this.i].noteContent;
console.log("console Array =  " + this.content);
  }
}


str: string;
 // Disables the associated notes text area box for 1 second.
 noteBlur(index: number,  secondRound: boolean): void {

  // The first call will recursivley call this function again to re-enable the input box after 1 second
  if (!secondRound) {
    
    console.log(blur);
    console.log(this.content[index]);
   
    this.noteArr[index].noteContent=this.content[index];
    console.log(this.noteArr[index]);
    this.noteService.putNote(this.noteArr[index]).subscribe(response =>{
      if(Object !=null){
        console.log("success")
      }else{
        console.log("fail")
      }
    }

    );
    console.log(this.noteArr[index]);
    $('#note-textarea-' + index).prop('disabled', true);
    setInterval(this.noteBlur, 1000, index,  true);
  } else {
    $('#note-textarea-' + index).prop('disabled', false);
  }
}


  showTrainees(){
    this.traineeArr = this.traineeService.returnTrainees();
    for(let train of this.traineeArr){
      console.log(train);
    }
  }

  // Cycle the Individual Feedback Status
  cycleFlag(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].trainee.flagStatus) {
          case 'NONE':
            newStatus = 'RED';
            break;
          case 'RED':
            newStatus = 'GREEN';
            break;
          case 'GREEN':
            newStatus = 'NONE';
            break;
        }

        // Update the status
        this.notes[i].trainee.flagStatus = newStatus;
      }
    }
  }

  // Cycle the flag notes popup
  cycleFlagNotesInput(selectedNoteId: number, enable: boolean): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {
        
          // Enable or disable the notes box popup
          this.notes[i].noteFlagInputActive = enable;
      }
    }
  }

  // Cycle the Individual Feedback Status
  cycleIF(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].qcStatus) {
          case 'Undefined':
            newStatus = 'Superstar';
            break;
          case 'Superstar':
            newStatus = 'Good';
            break;
          case 'Good':
            newStatus = 'Average';
            break;
          case 'Average':
            newStatus = 'Poor';
            break;
          case 'Poor':
            newStatus = 'Undefined';
            break;
        }

        // Update the status
        this.notes[i].qcStatus = newStatus;
      }
    }
  }

  // Disables the associated notes text area box for 1 second.
 
}
