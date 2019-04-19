import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
<<<<<<< HEAD
import { traineeAssessment } from 'src/app/User/user/types/trainee';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service'
=======
import { NoteService } from '../../Services/note.service';
import { Note } from 'src/app/Batch/type/note';
import { stringify } from '@angular/compiler/src/util';
>>>>>>> 1fb760a8d44bc95342a5865a731a6b92dfe5bc0f

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
//boolean to show module if valid
  noteFlagInputActive: boolean;
//Array to hold all trainnee
  traineeArr: Trainee[] = [];
  assessmentArr: traineeAssessment[] = [];

<<<<<<< HEAD
//Temporaray Array to hold ids for traineed when the flag clicked, acts as place holder, and also allow for opening 
//multiple flag popup box in the same time.
  flagNoteSwitch:Array<number> = [];


  constructor(private AssessBatchService: AssessBatchService ,private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService) { }
  ngOnInit( ) {
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
   });
   this.assessBatchGradeService.assessments.subscribe((assessmentArr) => {
     this.assessmentArr = assessmentArr;
      
   });
=======
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
>>>>>>> 1fb760a8d44bc95342a5865a731a6b92dfe5bc0f
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
    this.noteService.putNote(this.noteArr[index]);
    $('#note-textarea-' + index).prop('disabled', true);
    setInterval(this.noteBlur, 1000, index,  true);
  } else {
    $('#note-textarea-' + index).prop('disabled', false);
  }
}



  // Cycle the Individual Feedback Status
  cycleFlag(selectedtraineeId: number): void {
    // Loop through each note in notes until the target is found

    for (let i = 0; i < this.traineeArr.length; i++) {

      // Find the clicked note
      if (this.traineeArr[i].traineeId === selectedtraineeId) {

        // Create placeholder for new status string
        let newStatus = '';
        // Determine the new status string
        switch (this.traineeArr[i].flagStatus) {

          case null:
            newStatus = 'RED';
            break;
          case 'RED':
            newStatus = 'GREEN';
            break;
          case 'GREEN':
            newStatus = null;
            break;
        }
        // Update the status
        this.traineeArr[i].flagStatus = newStatus;
      }
    }
  }
//method to close the flag notes popup by removing id from temporory  "flagNoteSwitch" array.
  deleteFromSwitch(x:number){
    delete this.flagNoteSwitch[this.flagNoteSwitch.indexOf(x)];
  }

  // Cycle the flag notes popup
  cycleFlagNotesInput(selectedtraineeId: number, value: boolean): void {
    // Loop through each trainer in traineeArr until the target is found
    for (let i = 0; i < this.traineeArr.length; i++) {

      // Find the clicked note
      if (this.traineeArr[i].traineeId === selectedtraineeId) {
        
          // add Id of trainee to "flagNoteSwitch" array 
          if(this.flagNoteSwitch.indexOf(selectedtraineeId)==-1){
            this.flagNoteSwitch.push(selectedtraineeId);
          }
          this.noteFlagInputActive=value;
      }
    }
  }

  //send the object of the trainee to the service in order to include the flag note
  commentOnTrainee(trainee ,comment: string){
    trainee.flagNotes = comment; 
    this.AssessBatchService.postComment(trainee).subscribe(response => {
      if(Object != null){
        //if http respond successses,delete trainee id from temporary "flagNoteSwitch" in order to close popup box 
        // when the clicked on save button
        console.log("Success");
        this.deleteFromSwitch(trainee.traineeId);
      }else{
        console.log("Fails");
      }
    });

  }


  // Disables the associated notes text area box for 1 second.
<<<<<<< HEAD
  noteOnBlur(selectedtraineeId: number, secondRound: boolean): void {

    // The first call will recursivley call this function again to re-enable the input box after 1 second
    if (!secondRound) {
      $('#note-textarea-' + selectedtraineeId).prop('disabled', true);
      setInterval(this.noteOnBlur, 1000, selectedtraineeId, true);
    } else {
      $('#note-textarea-' + selectedtraineeId).prop('disabled', false);
    }
  }
=======
 
>>>>>>> 1fb760a8d44bc95342a5865a731a6b92dfe5bc0f
}
