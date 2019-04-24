import { Component, OnInit, OnChanges } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
import { traineeAssessment } from 'src/app/User/user/types/trainee';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service';
import { AssessmentService } from '../../Services/assessment.service';
import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal/update-delete-assessment-modal.component';

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
  selectedAssessmentId: number;
  selectedAssessmentCategoryId: number;
  totalRaw: number = 0;
  calcArr: number[] = [];
//Temporaray Array to hold ids for traineed when the flag clicked, acts as place holder, and also allow for opening 
//multiple flag popup box in the same time.
  flagNoteSwitch:Array<number> = [];


  constructor(private AssessBatchService: AssessBatchService ,private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService, private assessmentService: AssessmentService, private updateDelModal: UpdateDeleteAssessmentModalComponent) { }
  ngOnInit( ) {
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
   });
   this.populateAssess();
  }

  populateAssess(): traineeAssessment[]{
    console.log("is populateAssess rrunning?!?!");
    this.assessBatchGradeService.assessments.subscribe((assessmentArr) => {
      this.assessmentArr = assessmentArr;
       this.sumRawScores();
    });
    return this.assessmentArr;
  }

  selectedId (assessmentId, assessmentCategory){
    this.selectedAssessmentId = assessmentId;
    this.selectedAssessmentCategoryId= assessmentCategory;
    this.assessmentService.getCurrentAssessmentId(assessmentId);
    this.assessmentService.currentAssessmentId.emit(assessmentId);
    this.assessmentService.getCurrentCategoryId(assessmentCategory);
    this.assessmentService.currentCategoryId.emit(assessmentCategory);
    console.log(this.selectedAssessmentId)
    
  }
  
  //Sum of Assessment RawScores
  sumRawScores(){
    this.totalRaw = 0;
    for(let assess of this.assessmentArr){
      this.totalRaw += assess.rawScore;
      console.log(this.totalRaw);
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
