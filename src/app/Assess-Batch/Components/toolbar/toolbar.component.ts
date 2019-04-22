import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchModalComponent } from '../../batch-modal/batch-modal.component';
import { Trainee } from '../../../Batch/type/trainee';
import { TraineeService } from '../../Services/trainee.service';
import { traineeAssessment, Grade } from 'src/app/User/user/types/trainee';
import { AssessBatchGradeService } from '../../Services/assess-batch-grades.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
  showQ: boolean = false;
  showBatch: boolean = false;
  quarters: String[]=["Q1", "Q2", "Q3", "Q4"];
  years: number[];
  batches: Batch[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: string = "Select Year";
  selectedQuarter: string = "Select Quarter";

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

  assessments: traineeAssessment = {
    assessmentId: 0,
    rawScore: 0,
    assessmentTitle: '',
    assessmentType: '',
    weekNumber: 0,
    batchId: 0,
    assessmentCategory: 0
  }

   grades: Grade = {
    gradeId: 0,
    dateReceived: 0,
    score: 0,
    assessmentId: 0,
    traineeId: 0
}

  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;
  createUpdate: Batch = null;
  ourTrainee: Trainee[];
  weeklyAssessments: any[] = [];
  weeklyGrades: any[] = [];
  @ViewChild('batchModal') batchModal: BatchModalComponent;
  
  constructor(
    public auditService: AuditService, public traineeService: TraineeService, public assessBatchGradeService: AssessBatchGradeService
  ) { }
  ngOnInit() {
    this.selectedWeek=1; 
  }
     /**
   * resets createorUpdate variable for child component
   */
  resetBatchForm(): void {
    this.createUpdate = null;
    this.batchModal.resetForm();
  }
  // ToDo: future implementation
  // method for import button
  resetImportModal(): void {
  }

  displayYears(){
    this.getAllYears();
  }

  getAllYears() {
    this.auditService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0].toString();
      console.log(this.years);
    });
    
  }

  getBatches() {
    this.auditService.getBatchesByYear(Number.parseInt(this.selectedYear))
    .subscribe(result => {
      this.batches = result;
      this.selectedBatch = this.batches[0];
      this.auditService.selectedBatch = this.batches[0];
      console.log(this.batches);
      this.getWeeks();
        this.selectedWeek = this.weeks.length;
      });
  }

  selectYear(event: number) {
    this.selectedYear = event.toString();
    this.auditService.selectedYear = Number.parseInt(this.selectedYear);
    this.auditService.getBatchesByYear(event)
    .subscribe(result => {
      this.batches = result;
      });
    this.showQ = true;
  }
  
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
    this.getAssessmentsByBatchId();

  }
  addWeek() {
    var last = this.weeks[this.weeks.length-1];
    this.weeks.push(last+1);
    this.selectedWeek=last+1;
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
    console.log(this.selectedBatch.batchId);
    this.weeklyAssessments=[];
    this.weeklyGrades=[];
    this.assessBatchGradeService.getAssessmentsByBatchId(this.selectedBatch.batchId).subscribe(assessments => {
      for(let i = 0; i < assessments.length; i++){
        if(assessments[i].weekNumber == this.selectedWeek){
          this.weeklyAssessments.push(assessments[i]);

        }
      }
      this.assessBatchGradeService.storeAssessments(this.weeklyAssessments);
      this.assessBatchGradeService.assessments.emit(this.weeklyAssessments);
    })
    
  }

}