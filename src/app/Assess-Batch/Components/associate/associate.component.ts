import { Component, OnInit, OnChanges } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee, traineeAssessment, Grade } from 'src/app/Batch/type/trainee';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service'
import { NoteService } from '../../Services/note.service';
import { Note } from 'src/app/Batch/type/note';
import { AssessmentService } from '../../Services/assessment.service';
import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal/update-delete-assessment-modal.component';
import { Assessment } from '../../Models/Assesment';
import { Category } from 'src/app/User/user/types/trainee';

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
  noteArr: Note[] = [];
  weekNoteArr: Note[]=[];
  note: Note;
  selectedWeek: number;
  batchId: number;
  i : number;
  j : number;
  change: Boolean;
  temp: Note;
  str: string;
  gradesArr: Grade[] = [];
  superArr: Grade[][] = [];
  avgArr: Number[] = [];
  batchAvgArrr: number;
  score: number = 0;
  result: number = 0;
  scoreId: number;
  category: Category[] = [];
  
  constructor(private AssessBatchService: AssessBatchService ,private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService, private noteService: NoteService, private assessmentService: AssessmentService, private updateDelModal: UpdateDeleteAssessmentModalComponent) { }
  //Beginning of associate component lifecycle is populating the trainee array, assessment array, and getting all of the notes
  ngOnInit( ) {
    this.avgArr =[];
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr; 
    });

    //noteEmitter just emits the array of notes that are coming from noteService
    this.noteService.noteEmitter.subscribe((noteArr) => {
      this.noteArr = [];
      if(this.traineeArr.length != 0){
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
        //checks if index in noteArr is null -- if so creates a new note
        
     }
    });

    //Getting selected week
    this.noteService.weekEmitter.subscribe((selectedWeek) => {
      this.selectedWeek = selectedWeek;
     });
 
     //Getting batchId to pass it along components (coming from Toolbar component)
     this.noteService.batchIdEmitter.subscribe((batchId) => {
       this.batchId = batchId;
       });

    //calling the method to populate all of the assessments 
    this.populateAssess();
    }


// Disables the associated notes text area box for 1 second.
  noteOnBlur(index: number, secondRound: boolean): void {
    if (this.noteArr[index].noteId != -1) {
     
// The first call will recursivley call this function again to re-enable the input box after 1 second
      // this.noteArr[index].noteContent=this.content[index];
      this.noteService.putNote(this.noteArr[index]).subscribe(response => {
      }

      );

    } else {

      //  this.note=new Note(-1, this.content[index], "Trainee", this.selectedWeek, this.batchId, this.traineeArr[index].traineeId );
      this.note = this.noteArr[index]
      // create note
      this.noteService.postNote(this.note).subscribe(response => {
      }
      );
  }
}

//Emitting the array of assessments being populated by ToolbarComponent and is also getting all of the grades by assessmentId.
  populateAssess(){
   
    this.assessBatchGradeService.assessments.subscribe((assessmentArr) => {
      
      this.assessmentArr = assessmentArr;
      this.assessBatchGradeService.grades.subscribe((gradesArr) => {
          this.gradesArr = gradesArr;
          this.myInit();
          this.sumRawScores();
      });
    });
  
  }

  
  //Initializing the array of array (superArr) which is equal to the amount of assessments for that week.
  //Within each inner array is the grades for each assignemnt
  myInit() {
    this.superArr = [];

    let tempArr = [];
    this.avgArr = [];
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

      this.result =0;
      if(this.traineeArr.length != 0 && this.assessmentArr.length != 0){
          this.assessBatchGradeService.getBatchAvgGradeByBatchIdAndWeek(this.traineeArr[0].batchId, this.assessmentArr[0].weekNumber).subscribe((batchAvg) => {
            this.result = batchAvg;
          });
      }
  }

  //This takes selected assessmentId to get the category to persist the assessment over to the modal.
  selectedId (assessment:Assessment){
    this.assessmentService.getCurrentAssessment(assessment);
    this.assessmentService.currentAssessment.emit(assessment);
    this.selectedAssessmentId = assessment.assessmentId;
    this.selectedAssessmentCategoryId= assessment.assessmentCategory;
    this.assessmentService.getCurrentAssessmentId(assessment.assessmentId);
    this.assessmentService.currentAssessmentId.emit(assessment.assessmentId);
    this.assessmentService.getCurrentCategoryId(assessment.assessmentCategory);
    this.assessmentService.currentCategoryId.emit(assessment.assessmentCategory);
    
  }
  
  //Sum of Assessment RawScores
  sumRawScores(){
    this.totalRaw = 0;
    for(let assess of this.assessmentArr){
      this.totalRaw += assess.rawScore;
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
        this.deleteFromSwitch(trainee.traineeId);
      } else {
      }
    });
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
      })
    });
   }
  }

  //checking to see if a grade exists
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

  //Getting all category names
  getCategoryName() : any[] {
    let temp = [];
    for(let i = 0; i < this.assessmentArr.length; i++) {
      
      this.assessBatchGradeService.getCategoryByCategoryId(this.assessmentArr[i].assessmentCategory).subscribe((category) => {
        temp[i] = category;
      }); 
    };
    return temp;
  }

}
