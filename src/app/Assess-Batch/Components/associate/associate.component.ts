import { Component, OnInit, OnChanges } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service'
import { NoteService } from '../../Services/note.service';
import { AssessmentService } from '../../Services/assessment.service';
import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal/update-delete-assessment-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import {Category} from "../../../domain/model/category.dto";
import {Assessment} from "../../../domain/model/assessment.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Note} from "../../../domain/model/assessment-note.dto";
import {Grade} from "../../../domain/model/grade.dto";
import {TraineeFlag} from "../../../domain/model/trainee-flag.dto";

//import { AuditService } from '../../Services/audit.service';  // ag

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
  assessmentArr: Assessment[] = [];
  selectedAssessmentId: number;
  selectedAssessmentCategoryId: number;
  totalRaw: number = 0;
  calcArr: number[] = [];
  //Temporaray Array to hold ids for traineed when the flag clicked, acts as place holder, and also allow for opening
  //multiple flag popup box in the same time.
  flagNoteSwitch: Array<number> = [];
  noteArr: Note[] = [];
  weekNoteArr: Note[] = [];
  note: Note;
  selectedWeek: number;
  batchId: number;
  i: number;
  j: number;
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

  spinner: HTMLElement;
  checkMark: HTMLElement;
  errMark: HTMLElement;
  isTyping: boolean;

  // added for flag note change..
  isaddFlagClicked: boolean = false;

  // variable to hold previous flagStatus
  selectedTraineeFlagStatusBeforeSelecting: string;

  // variable for small flag in module; 'Selected Flag: '..
  flagStatusVisual: string;

  constructor(private AssessBatchService: AssessBatchService, private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService, private noteService: NoteService, private assessmentService: AssessmentService, private updateDelModal: UpdateDeleteAssessmentModalComponent) { }
  //Beginning of associate component lifecycle is populating the trainee array, assessment array, and getting all of the notes
  ngOnInit() {
    this.avgArr = [];
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
    });

    //noteEmitter just emits the array of notes that are coming from noteService
    this.noteService.noteEmitter.subscribe((noteArr) => {
      this.noteArr = [];
      if (this.traineeArr.length != 0) {
        for (this.i = 0; this.i < this.traineeArr.length; this.i++) {
          for (this.j = 0; this.j < noteArr.length; this.j++) {
            if (noteArr[this.j].traineeId == this.traineeArr[this.i].traineeId) {
              this.noteArr[this.i] = noteArr[this.j];
            }

          }
          if (this.noteArr[this.i] == null) {
            this.note = {
              noteId: -1,
              noteContent: "",
              noteType: "Trainee",
              weekNumber: this.selectedWeek,
              batchId: this.batchId,
              traineeId: this.traineeArr[this.i].traineeId
            }
            this.noteArr[this.i] = this.note;
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

  //Emitting the array of assessments being populated by ToolbarComponent and is also getting all of the grades by assessmentId.
  populateAssess() {
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

    this.result = 0;
    if (this.traineeArr.length != 0 && this.assessmentArr.length != 0) {
      this.assessBatchGradeService.getBatchAvgGradeByBatchIdAndWeek(this.traineeArr[0].batchId, this.assessmentArr[0].weekNumber).subscribe((batchAvg) => {
        this.result = batchAvg;
      });
    }
  }

  //This takes selected assessmentId to get the category to persist the assessment over to the modal.
  selectedId(assessment: Assessment) {
    this.assessmentService.getCurrentAssessment(assessment);
    this.assessmentService.currentAssessment.emit(assessment);
    this.selectedAssessmentId = assessment.assessmentId;
    this.selectedAssessmentCategoryId = assessment.assessmentCategory;
    this.assessmentService.getCurrentAssessmentId(assessment.assessmentId);
    this.assessmentService.currentAssessmentId.emit(assessment.assessmentId);
    this.assessmentService.getCurrentCategoryId(assessment.assessmentCategory);
    this.assessmentService.currentCategoryId.emit(assessment.assessmentCategory);

  }
  //Sum of Assessment RawScores
  sumRawScores() {
    this.totalRaw = 0;
    for (let assess of this.assessmentArr) {
      this.totalRaw += assess.rawScore;
    }
  }


  // set the trainee flag status
  cycleFlag3(trainee: Trainee, newStatus: string): void {
    trainee.flagStatus = TraineeFlag[newStatus];
    this.flagStatusVisual = "fa-" + trainee.flagStatus.toLowerCase();
  }

  //method to close the flag notes popup by removing id from temporory  "flagNoteSwitch" array.
  deleteFromSwitch(x: number) {
    delete this.flagNoteSwitch[this.flagNoteSwitch.indexOf(x)];
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
  validateScore(e) {
    if (e.target.value < 0) {
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
  getCategoryName(): any[] {
    let temp = [];
    for (let i = 0; i < this.assessmentArr.length; i++) {

      this.assessBatchGradeService.getCategoryByCategoryId(this.assessmentArr[i].assessmentCategory).subscribe((category) => {
        temp[i] = category;
      });
    };
    return temp;
  }

  // ******************************************************
  // ** THIS IS THE CHECKMARK/SPINNING/ERROR DIV SECTION **
  // ******************************************************

  // Disables the associated notes text area box for 1 second.

  noteOnBlur(i: number): void {
    this.showSpinner(i);
    if (this.noteArr[i].noteId != -1) {

      // The first call will recursivley call this function again to re-enable the input box after 1 second
      // this.noteArr[index].noteContent=this.content[index];
      this.noteService.putNote(this.noteArr[i]).subscribe(/*response => {
        console.log("PUT INVOKED");
      }*/
        data => {
          if (this.isTyping == true) {

            this.showCheck(i);
          } else {

            this.clearAllSavingIcon(i);
          }

          this.isTyping = false;
        },
        issue => {
          this.updateNoteError(i, issue);
        }

      );

    } else {

      //  this.note=new Note(-1, this.content[index], "Trainee", this.selectedWeek, this.batchId, this.traineeArr[index].traineeId );
      this.note = this.noteArr[i]
      // create note
      this.noteService.postNote(this.note).subscribe(/*response => {
        console.log("POST INVOKED");
      },*/
        data => {
          if (this.isTyping == true) {
            this.showCheck(i);
          } else {
            this.clearAllSavingIcon(i);
          }

          this.isTyping = false;
        },
        issue => {
          this.updateNoteError(i, issue);
        }
      );
    }
  }

  showSpinner(i: number) {
    //showSpinner is called when keystroke event occurs in a note
    //it displays a "loading" icon until noteOnBlur is called..
    //see noteOnBlur below
    this.spinner = document.getElementById('spinner' + i);
    this.spinner.style.display = "block";
    this.checkMark = document.getElementById('checkMark' + i);
    this.checkMark.style.display = "none";
    this.errMark = document.getElementById('errMark' + i);
    this.errMark.style.display = "none";
  }

  showCheck(i: number) {
    this.spinner = document.getElementById('spinner' + i);
    this.spinner.style.display = "none";
    this.checkMark = document.getElementById('checkMark' + i);
    this.checkMark.style.display = "block";
    this.errMark = document.getElementById('errMark' + i);
    this.errMark.style.display = "none";
  }

  clearAllSavingIcon(i: number) {
    //console.log("i = " + i);
    this.spinner = document.getElementById('spinner' + i);
    this.spinner.style.display = "none";
    this.checkMark = document.getElementById('checkMark' + i);
    this.checkMark.style.display = "none";
    this.errMark = document.getElementById('errMark' + i);
    this.errMark.style.display = "none";
  }

  updateNoteError(i: number, issue) {
    const checkMark: HTMLElement = document.getElementById('checkMark' + i);
    checkMark.style.display = "none";
    const spinner: HTMLElement = document.getElementById('spinner' + i);
    spinner.style.display = "none";
    const errMark: HTMLElement = document.getElementById('errMark' + i);
    errMark.style.display = "block";
    if (issue instanceof HttpErrorResponse) {
      const err = issue as HttpErrorResponse;
    }
  }



    // when pen icon clicked to open comment modal
  onAddFlagClicked(trainee: Trainee, index: number)
  {

    this.selectedTraineeFlagStatusBeforeSelecting = trainee.flagStatus;

    if (trainee.flagStatus == undefined)
    {

      trainee.flagStatus = TraineeFlag["NONE"];
    }

    this.flagStatusVisual = "fa-" + trainee.flagStatus.toLowerCase();
  }

  // when modal 'cancel' button clicked..
  onFlagCancel2(trainee: Trainee)
  {
    trainee.flagStatus = TraineeFlag[this.selectedTraineeFlagStatusBeforeSelecting];
    this.isaddFlagClicked = false;
  }

  // when modal 'delete' button is clicked.. delete flag and notes
  onFlagDelete(trainee: Trainee)
  {

    trainee.flagNotes = "";
    trainee.flagStatus = TraineeFlag["NONE"];
    this.AssessBatchService.postComment(trainee).subscribe(response => {});
    this.isaddFlagClicked = false;

  }

  // when modal 'submit' button is clicked.. trainee flag and comment status
  onFlagSubmit(trainee: Trainee)
  {

    this.selectedTraineeFlagStatusBeforeSelecting = trainee.flagStatus;

    this.AssessBatchService.postComment(trainee).subscribe(response => {});

  }



}  // end of class








