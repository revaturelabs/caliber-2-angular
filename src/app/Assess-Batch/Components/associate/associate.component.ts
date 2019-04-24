import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee, traineeAssessment } from 'src/app/Batch/type/trainee';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service'
import { NoteService } from '../../Services/note.service';
import { Note } from 'src/app/Batch/type/note';
import { stringify } from '@angular/compiler/src/util';

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

//Temporaray Array to hold ids for traineed when the flag clicked, acts as place holder, and also allow for opening 
//multiple flag popup box in the same time.
  flagNoteSwitch:Array<number> = [];
  noteArr: Note[] = [];

  constructor(private AssessBatchService: AssessBatchService ,private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService, private noteService: NoteService) { }
  weekNoteArr: Note[]=[];
  note: Note;
  selectedWeek: number;
  batchId: number;
  i : number;
  j : number;
  change: Boolean;
  temp: Note;
  str: string;

  ngOnInit( ) {
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr; 
    });

    this.assessBatchGradeService.assessments.subscribe((assessmentArr) => {
      this.assessmentArr = assessmentArr;  
    });

    this.noteService.noteEmitter.subscribe((noteArr) => {
      this.noteArr = [];
      for (this.i = 0; this.i < this.traineeArr.length; this.i++) {
        for (this.j = 0; this.j < noteArr.length; this.j++) {
          if (noteArr[this.j].traineeId == this.traineeArr[this.i].traineeId) {
            this.noteArr[this.i] = noteArr[this.j];
          }
        }
        if(this.noteArr[this.i]==null){
          this.note=new Note(-1, "", "Trainee", this.selectedWeek, this.batchId, this.traineeArr[this.i].traineeId );
          this.noteArr[this.i]= this.note;
        }
     }
    });

    this.noteService.weekEmitter.subscribe((selectedWeek) => {
      this.selectedWeek = selectedWeek;
     });
 
     this.noteService.batchIdEmitter.subscribe((batchId) => {
       this.batchId = batchId;
       });

    }

// Disables the associated notes text area box for 1 second.
  noteBlur(index: number, secondRound: boolean): void {
    console.log(this.noteArr[index].noteId);
    if (this.noteArr[index].noteId != -1) {
     
// The first call will recursivley call this function again to re-enable the input box after 1 second



      console.log(blur);


      // this.noteArr[index].noteContent=this.content[index];
      console.log("posting" + this.noteArr[index]);
      this.noteService.putNote(this.noteArr[index]).subscribe(response => {
        if (Object != null) {
          console.log("success")
        } else {
          console.log("fail")
        }
      }

      );
      console.log(this.noteArr[index]);

    } else {

      console.log("Creating note");
      console.log(blur);

      //  this.note=new Note(-1, this.content[index], "Trainee", this.selectedWeek, this.batchId, this.traineeArr[index].traineeId );
      this.note = this.noteArr[index]
      console.log("Creating Note" + this.note);
      // create note
      this.noteService.postNote(this.note).subscribe(response => {
        if (Object != null) {
          console.log("success")
        } else {
          console.log("fail")
        }
      }
      );
      console.log(this.noteArr[index]);
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
}
