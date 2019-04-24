import { Component, OnInit, OnChanges } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
import { traineeAssessment, Grade, Category } from 'src/app/User/user/types/trainee';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service';
import { AssessmentService } from '../../Services/assessment.service';
import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal/update-delete-assessment-modal.component';
import { Assessment } from '../../Models/Assesment';

@Component({
  selector: "app-associate",
  templateUrl: "./associate.component.html",
  styleUrls: ["./associate.component.css"]
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
  gradesArr: Grade[] = [];
  superArr: Grade[][] = [];
  avgArr: Number[] = [];
  batchAvgArrr: number;
  score: number = 0;
  result: number = 0;;
  scoreId: number;
  category: Category[] = [];
  
  constructor(private AssessBatchService: AssessBatchService ,private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService, private assessmentService: AssessmentService, private updateDelModal: UpdateDeleteAssessmentModalComponent) { }
  ngOnInit( ) {
    this.avgArr =[];
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
   });
   this.populateAssess();
  }

  populateAssess(): traineeAssessment[]{
    this.assessBatchGradeService.assessments.subscribe((assessmentArr) => {
      this.assessmentArr = assessmentArr;
      this.assessBatchGradeService.grades.subscribe((gradesArr) => {
          this.gradesArr = gradesArr;
          this.myInit();
          this.sumRawScores();
      });
    });
    return this.assessmentArr;
  }

  myInit() {
    this.superArr = [];

    let tempArr = [];
    for (let i = 0; i < this.assessmentArr.length; i++) {
      var temp: Grade[] = [];

      this.assessBatchGradeService
        .getAvgGradeByAssessmentId(this.assessmentArr[i].assessmentId)
        .subscribe(response => {
          tempArr[i] = response;
        });

      this.avgArr = tempArr;

      for (let j = 0; j < this.gradesArr.length; j++) {
        if (
          this.assessmentArr[i].assessmentId == this.gradesArr[j].assessmentId
        ) {
          temp.push(this.gradesArr[j]);
        }
      }
      this.superArr.push(temp);
    }
    this.category = this.getCategoryName();
    this.AssessBatchService.getBatchById(this.traineeArr[0].batchId).subscribe((result) => {
      this.assessBatchGradeService.getBatchAvgGradeByBatchIdAndWeek(this.traineeArr[0].batchId, result.weeks).subscribe((batchAvg) => {
        this.result = batchAvg;
      });
    })
  }

  selectedId (assessment:Assessment){
    this.assessmentService.getCurrentAssessment(assessment);
    this.assessmentService.currentAssessment.emit(assessment);
    this.selectedAssessmentId = assessment.assessmentId;
    this.selectedAssessmentCategoryId= assessment.assessmentCategory;
    this.assessmentService.getCurrentAssessmentId(assessment.assessmentId);
    this.assessmentService.currentAssessmentId.emit(assessment.assessmentId);
    this.assessmentService.getCurrentCategoryId(assessment.assessmentCategory);
    this.assessmentService.currentCategoryId.emit(assessment.assessmentCategory);
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
        let newStatus = "";
        // Determine the new status string
        switch (this.traineeArr[i].flagStatus) {
          case null:
            newStatus = "RED";
            break;
          case "RED":
            newStatus = "GREEN";
            break;
          case "GREEN":
            newStatus = null;
            break;
        }
        // Update the status
        this.traineeArr[i].flagStatus = newStatus;
      }
    }
  }
  //method to close the flag notes popup by removing id from temporory  "flagNoteSwitch" array.
  deleteFromSwitch(x: number) {
    delete this.flagNoteSwitch[this.flagNoteSwitch.indexOf(x)];
  }
  // Cycle the flag notes popup
  cycleFlagNotesInput(selectedtraineeId: number, value: boolean): void {
    // Loop through each trainer in traineeArr until the target is found
    for (let i = 0; i < this.traineeArr.length; i++) {

      // Find the clicked note
      if (this.traineeArr[i].traineeId === selectedtraineeId) {
        // add Id of trainee to "flagNoteSwitch" array
        if (this.flagNoteSwitch.indexOf(selectedtraineeId) == -1) {
          this.flagNoteSwitch.push(selectedtraineeId);
        }
        this.noteFlagInputActive = value;
      }
    }
  }
  //send the object of the trainee to the service in order to include the flag note
  commentOnTrainee(trainee, comment: string) {
    trainee.flagNotes = comment;
    this.AssessBatchService.postComment(trainee).subscribe(response => {
      if (Object != null) {
        //if http respond successses,delete trainee id from temporary "flagNoteSwitch" in order to close popup box
        // when the clicked on save button
        console.log("Success");
        this.deleteFromSwitch(trainee.traineeId);
      } else {
        console.log("Fails");
      }
    });
  }

  // Disables the associated notes text area box for 1 second.
  noteOnBlur(selectedtraineeId: number, secondRound: boolean): void {
    // The first call will recursivley call this function again to re-enable the input box after 1 second
    if (!secondRound) {
      $("#note-textarea-" + selectedtraineeId).prop("disabled", true);
      setInterval(this.noteOnBlur, 1000, selectedtraineeId, true);
    } else {
      $("#note-textarea-" + selectedtraineeId).prop("disabled", false);
    }
  }

  //Add this in blur event save function
  validateScore(e){
   if(e.target.value < 0){
    e.target.style = "border-color : red; background-color: #fff9f9";
    e.target.placeholder = e.target.value;
    e.target.value = "";
   } else {
    e.target.style = "";
    e.target.placeholder = "";
    let grade: Grade;
    this.assessBatchGradeService.getGradeById(e.target.id).subscribe((response) => {
      grade = response;
      grade.score = e.target.value;

      this.assessBatchGradeService.updateGrade(grade).subscribe((response) => {
        console.log(response.gradeId + " has been updated to the score: " + response.score);
      });

    });
   }
  }

  checkForGrade(arr: Grade[], train: Trainee) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].traineeId == train.traineeId) {
        this.score = arr[i].score;
        this.scoreId = arr[i].gradeId;
        return true;
      }
    }
    return false;
  }

  
    getCategoryName() : any[] {
      let temp = [];
      for(let i = 0; i < this.assessmentArr.length; i++) {
        this.assessBatchGradeService.getCategoryByCategoryId(this.assessmentArr[i].assessmentCategory).subscribe((category) => {
          console.log("category" + category.skillCategory);
          temp.push(category);
      });   
      }
      return temp;
     

  }

}
