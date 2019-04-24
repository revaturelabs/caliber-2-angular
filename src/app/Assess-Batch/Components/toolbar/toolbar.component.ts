import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
// import { BatchModalComponent } from '../../Components/toolbar/batch-modal/batch-modal.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { Trainee } from '../../../Batch/type/trainee';
import { TraineeService } from '../../Services/trainee.service';
<<<<<<< HEAD
import { AssessBatchGradeService } from '../../Services/assess-batch-grades.service';
import { BatchModalComponent } from 'src/app/Batch/batch-modal/batch-modal.component';

=======
import { AssessBatchService } from '../../Services/assess-batch.service';
>>>>>>> e6d7b23d53262b833449ff12ad21e146262dddb7

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})

export class ToolbarComponent implements OnInit {
  showBatch: boolean  = true;
  quarters: String[]=[];
  years: number[];
  batches: Batch[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: string = "Select Year";
  selectedQuarter: String = "Select Quarter";



  // selectedBatch: Batch;
  selectedBatch: Batch = {
    batchId: 0,
    trainingName: "",
    trainingType: "",
    skillType: "",
    trainer: "Select Batch",
    coTrainer: "",
    location: "",
    locationId: 0,
    startDate: null,
    endDate: null,
    goodGrade: 0,
    passingGrade: 0,
    traineeCount: 0,
    weeks: 0
  };

  // assessments: traineeAssessment = {
  //   assessmentId: 0,
  //   rawScore: 0,
  //   assessmentTitle: '',
  //   assessmentType: '',
  //   weekNumber: 0,
  //   batchId: 0,
  //   assessmentCategory: 0
  // }

  //  grades: Grade = {
  //   gradeId: 0,
  //   dateReceived: 0,
  //   score: 0,
  //   assessmentId: 0,
  //   traineeId: 0
  // }

  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;
  createUpdate: Batch = null;
  ourTrainee: Trainee[];
<<<<<<< HEAD
  weeklyAssessments: any[] = [];
  weeklyGrades: any[] = [];
  gradesArr: any[] = [];
=======
  batchExists: boolean = false;
>>>>>>> e6d7b23d53262b833449ff12ad21e146262dddb7
  @ViewChild('batchModal') batchModal: BatchModalComponent;

  constructor(
<<<<<<< HEAD
    public auditService: AuditService, public traineeService: TraineeService, public assessBatchGradeService: AssessBatchGradeService
=======
    public auditService: AuditService, public traineeService: TraineeService, public assessBatchService: AssessBatchService
>>>>>>> e6d7b23d53262b833449ff12ad21e146262dddb7
  ) { }
  ngOnInit() {
    this.getAllYears();
  }
     /**
   * resets createorUpdate variable for child component
   */
  // resetCreateForm(): void {
  //   this.createUpdate = null;
  //  this.batchModal.resetForm();
  // }
  // ToDo: future implementation
  // method for import button
  resetImportModal(): void {
  }

  displayYears(){
    this.selectedYear = "Select Year";

  }

  getAllYears() {
    this.auditService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0].toString();
<<<<<<< HEAD
    });

=======
      for (var q = 4; q > 0; q--) { 
        this.checkBatchExistanceInaQuarter(this.years[0], q);
      }
      this.selectedYear = "Select Year";
    });
>>>>>>> e6d7b23d53262b833449ff12ad21e146262dddb7
  }

  // openFormModal(){
  //   let options: NgbModalOptions = {
  //     backdrop: false
  //   }
  //   const modalRef = this.modalService.open(BatchModalComponent,options);
  //   modalRef.componentInstance
  //   modalRef.result.then((result) => {
  //     console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // });
  // }

  getBatches() {
    this.assessBatchService.getBatchesByQuarter(Number.parseInt(this.selectedYear), this.selectedQuarter.slice(1,2))
    .subscribe(result => {
        if(result.length > 0) {
          this.batchExists = true;
      this.batches = result;
      this.selectedBatch = this.batches[0];
<<<<<<< HEAD
      this.auditService.selectedBatch = this.batches[0];
=======
>>>>>>> e6d7b23d53262b833449ff12ad21e146262dddb7
      this.getWeeks();
        this.selectedWeek = this.weeks.length;
    } else {
      this.batchExists = false;
    }
      });
  }

  selectYear(event: number) {
    this.selectedYear = event.toString();
    this.selectedQuarter = "Select Quarter";
    this.batches = [];
    this.selectedBatch = null;
    this.showBatch = false;
  }

  checkBatchExistanceInaQuarter(yearselect, quarter) {
    this.assessBatchService.getBatchesByQuarter(Number.parseInt(yearselect), quarter)
    .subscribe(result => {
        if(result.length > 0) {
          this.quarters.push("Q"+quarter);
          this.selectedQuarter = this.quarters[0];
         
          var temp: String[] = this.quarters.sort((n1, n2) => {
            if (n1 > n2) {
              return -1;
            }

            if (n1 < n2) {
              return 1;
            }

            return 0;
          });

          this.quarters = temp;
          this.selectedYear = yearselect;
          this.selectedBatch = result[0];
          this.getBatches();
        } else {
          console.log("this quarter wasn't included " + quarter);
        }
      });
  }

<<<<<<< HEAD
=======
  showQs(){
    this.batches = [];
    this.selectedQuarter = "Select Quarter";
  }

>>>>>>> e6d7b23d53262b833449ff12ad21e146262dddb7
  selectQuarter(event: string) {
    this.selectedQuarter = event;
    this.showBatch = true;
    this.getBatches();
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.auditService.selectedBatch = this.selectedBatch;
    this.getWeeks();
  }

  showActiveWeek(week: number) {
    if (week==this.selectedWeek) {
      return "active";
    }
  }
  selectWeek(event: number) {
    this.selectedWeek = event;
    this.auditService.selectedWeek = event;
    this.getAssessmentsByBatchIdAndWeekNum();
    this.getGradesByBatchIdAndWeekNum();
  }
  addWeek() {
    var last = this.weeks[this.weeks.length-1];
    this.weeks.push(last+1);
    this.selectedWeek=last+1;
    this.selectedBatch.weeks = last+1;
    console.log(this.selectedBatch);
    this.assessBatchService.addWeek(this.selectedBatch);
  }
  getWeeks() {
    this.weeks = [];
    for(var i = 0; i<this.selectedBatch.weeks; i++){
      this.weeks.push(i+1);
    }
    this.getTraineesByBatchId();
  }

  getTraineesByBatchId(){
    this.traineeService.getTraineesByBatchId(this.selectedBatch.batchId).subscribe(trainees => {
      this.traineeService.storeTrainees(trainees);
      this.traineeService.trainees.emit(trainees);
    })
  }
  getAssessmentsByBatchId(){
    this.weeklyAssessments=[];

    this.assessBatchGradeService.getAssessmentsByBatchId(this.selectedBatch.batchId).subscribe(assessments => {

      this.weeklyAssessments = assessments;

      this.assessBatchGradeService.storeAssessments(this.weeklyAssessments);
      this.assessBatchGradeService.assessments.emit(this.weeklyAssessments);
    })
  }

  getAssessmentsByBatchIdAndWeekNum(){
    this.weeklyAssessments=[];

    this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(this.selectedBatch.batchId, this.selectedWeek).subscribe(assessments => {

      this.weeklyAssessments = assessments;

      this.assessBatchGradeService.storeAssessments(this.weeklyAssessments);
      this.assessBatchGradeService.assessments.emit(this.weeklyAssessments);
    })
  }

  getGradesByBatchIdAndWeekNum(){
    this.gradesArr=[];
    this.assessBatchGradeService.getGradesByBatchIdAndWeekNum(this.selectedBatch.batchId, this.selectedWeek).subscribe(grades => {

      this.gradesArr = grades;

      this.assessBatchGradeService.storeGrades(this.gradesArr);
      this.assessBatchGradeService.grades.emit(this.gradesArr);
    })
  }

  getGradesByBatchId(){
    this.gradesArr=[];
    this.assessBatchGradeService.getGradesByBatchId(this.selectedBatch.batchId).subscribe(grades => {
      for(let i = 0; i < grades.length; i++){
        for(let y = 0; y < this.weeklyGrades.length; y++){

          if(grades[i].assessmentId == this.weeklyGrades[y].assessmentId){
            this.gradesArr.push(grades[i]);

        }
      }}
      this.assessBatchGradeService.storeGrades(this.gradesArr);
      this.assessBatchGradeService.grades.emit(this.gradesArr);
    })
  }
}
