import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
import { AssessBatchService } from '../../Services/assess-batch.service';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  noteFlagInputActive: boolean;

  traineeArr: Trainee[] = [];
  flagNoteSwitch:Array<number> = [];

 
  // List of test notes
  // notes = [
  //   {
  //     qcStatus: 'Undefined',
  //     noteId: 0,
  //     noteFlagInputActive: false,
  //     trainee: {
  //       name: 'Hajek, Alexander',
  //       project: '89.45',
  //       verbal: '79.23',
  //       exam: '78.23',
  //       flagNotes: '',
  //       flagStatus: 'NONE'
  //     }
  //   }
  // ];

  // [{
  //   traineeId: 1,
  //   resourceId: null,
  //   name: "Howard Johnson",
  //   email: "howard.johnson@hotmail.com",
  //   trainingStatus: "Training",
  //   batchId: 2003,
  //   phoneNumber: "555-555-5555",
  //   skypeId: null,
  //   profileUrl: null,
  //   recruiterName: null,
  //   college: null,
  //   degree: null,
  //   major: null,
  //   techScreenerName: null,
  //   techScreenScore: null,
  //   projectCompletion: null,
  //   flagStatus: null,
  //   flagNotes: null,
  //   flagTimestamp: null,
  //   flagAuthor: null
  //   }]   private postloginService: PostloginService


  // Unimplemented functions
  constructor(private AssessBatchService: AssessBatchService ,private traineeService: TraineeService) { }
  ngOnInit( ) {
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
   });
  }

  // Cycle the Individual Feedback Status
  cycleFlag(selectedtraineeId: number): void {
    // Loop through each note in notes until the target is found

    for (let i = 0; i < this.traineeArr.length; i++) {

      // Find the clicked note
      if (this.traineeArr[i].traineeId === selectedtraineeId) {

        // Create placeholder for new status string
        let newStatus = '';
        //this.noteFlagInputActive= true;
        console.log(this.traineeArr[i].flagStatus);

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
        console.log(newStatus);
        // Update the status
        this.traineeArr[i].flagStatus = newStatus;
      }
    }
  }

  deleteFromSwitch(x:number){
    delete this.flagNoteSwitch[this.flagNoteSwitch.indexOf(x)];
  }

  // Cycle the flag notes popup
  cycleFlagNotesInput(selectedtraineeId: number, value: boolean): void {
    console.log(selectedtraineeId)
    // Loop through each trainer in traineeArr until the target is found
    console.log( this.flagNoteSwitch);
    for (let i = 0; i < this.traineeArr.length; i++) {

      // Find the clicked note
      if (this.traineeArr[i].traineeId === selectedtraineeId) {
        
        console.log(selectedtraineeId)
          // Enable or disable the notes box popup
          // this.traineeArr[i].noteFlagInputActive = enable;
          if(this.flagNoteSwitch.indexOf(selectedtraineeId)==-1){
            this.flagNoteSwitch.push(selectedtraineeId);
          }
          this.noteFlagInputActive=value;
      }
    }
  }

  commentOnTrainee(trainee ,comment: string){
    console.log(trainee);
    console.log(comment);
    trainee.flagNotes = comment; 
    this.AssessBatchService.postComment(trainee).subscribe(response => {
      if(Object != null){
        console.log("Success");
        this.deleteFromSwitch(trainee.traineeId);
      }else{
        console.log("Fails");
        this.show = false;
      }
    });

  }

  show = true;







  // Disables the associated notes text area box for 1 second.
  noteOnBlur(selectedtraineeId: number, secondRound: boolean): void {

    // The first call will recursivley call this function again to re-enable the input box after 1 second
    if (!secondRound) {
      $('#note-textarea-' + selectedtraineeId).prop('disabled', true);
      setInterval(this.noteOnBlur, 1000, selectedtraineeId, true);
    } else {
      $('#note-textarea-' + selectedtraineeId).prop('disabled', false);
    }
  }
}
