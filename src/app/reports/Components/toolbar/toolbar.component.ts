import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Services/report.service';
import { Trainee, Grade, traineeAssessment } from 'src/app/Batch/type/trainee';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { AssessBatchService } from 'src/app/Assess-Batch/Services/assess-batch.service';
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  years: number[];
  batches: Batch[];  
  weeks : number[];
  trainees : Trainee[];
  quarters: String[]=[];
  
  selectedYear: string = "Select Year";
  selectedBatches: Batch[];
  titledWeek: string = "Not Found";
  selectedWeek: number;
  selectedTrainee: Trainee = new Trainee();
  selectedQuarter: String = "Select Quarter";

  assessmentsDataStore:Assessment[] = [];
  gradesDataStore:Grade[]=[];

  assessmentAverage:number[]=[]; 
  gradesAverage: number[]=[];

  batchExists: boolean = false;
  ourTrainee: Trainee[];

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


  constructor(private reportService: ReportService, private auditService : 
    AuditService, private assessBatchService : AssessBatchService,
    private traineeService: TraineeService) { }

  ngOnInit() {
    this.getAllYears();
  }

  getAllYears() {
    this.selectedTrainee.name = "Hermo, Knighknee"
    this.reportService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0].toString();
      // this.selectedYear = "Select Year";
      this.getBatch(this.years[0]);
    });
    this.getAllAssessments();
    this.getAllGrades();
  }

  getBatch(year:number){
    this.reportService.getBatchesByYear(year)
    .subscribe(results =>{
      console.log(results);
      this.batches = results;
      if(results.length >0){
        this.selectedBatch = this.batches[0];
        this.batchExists = true;
        this.getWeeks();
        this.getTraineesByBatchId()
      }
    });
  }

  getWeeks() {
    this.weeks = [];
    this.weeks.push(0);
    for(var i = 0; i<this.selectedBatch.weeks; i++){
      this.weeks.push(i+1);
    }
    this.selectedWeek = 0;
    this.titledWeek = "Weeks (all)";
  }

  getTraineesByBatchId(){
    this.traineeService.getTraineesByBatchId(this.selectedBatch.batchId).subscribe(trainees => {
      console.log(trainees)    
      //this.getBatchNotesByWeek();
      if(trainees.length>0){
        this.trainees = trainees;
        this.traineeService.storeTrainees(trainees);
        this.traineeService.trainees.emit(trainees);
        let allTrainee = new Trainee();
        allTrainee.traineeId=0;
        allTrainee.name="Trainees (all)";
        this.trainees.unshift(allTrainee);
        this.selectedTrainee = trainees[0];
      }
    });    
  }

  selectYear(event: number) {
    this.selectedYear = event.toString();
    // this.selectedWeek = "Select Week (All)";
    this.trainees = [];
    this.getBatch(event);
  }

  selectTrainee(event: Trainee){
    this.selectedTrainee = event;
  }

  selectWeek(event: number) {
    this.selectedWeek = event;
    if(event){
      this.titledWeek = "Week " +event;
    }
    else{
      this.titledWeek = "Weeks (all)";
    }
    // this.auditService.selectedWeek = event;
    // this.getBatchNotesByWeek();
    // this.getAssessmentsByBatchIdAndWeekNum();
    // this.getGradesByBatchIdAndWeekNum();
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.auditService.selectedBatch = this.selectedBatch;
    // this.getWeeks();
    // this.showActiveWeek(this.auditService.selectedBatch.weeks);
    // this.selectWeek(this.auditService.selectedBatch.weeks);
    this.getWeeks();
    this.getTraineesByBatchId()
  }

  showYears(){
    this.selectedYear = "Select Year";
  }

  showBatches(){

  }
  showWeeks(){
    this.titledWeek = "Select Week";
  }
  showTrainees(){

  }

  getAllAssessments(){
    this.reportService.getAllAssessments().subscribe(
      (assessments)=>{
        console.log(assessments);
        this.assessmentsDataStore = assessments;
    });
  }

  getAllGrades(){
    this.reportService.getAllGrades().subscribe(
      (grades)=>{
        console.log(grades);
        this.gradesDataStore = grades;
    });
  }

  // calculateGradeAverage(){
  //   this.gradesDataStore.forEach()
  // }
  
  // calculateAssessmentAverage(){
  //   this.assessmentsDataStore.forEach()
  // }
}
// this.traineeService.getTraineesByBatchId(this.selectedBatch.batchId).subscribe(trainees => {
//   console.log(trainees)    
//   //this.getBatchNotesByWeek();
//   if(trainees.length>0){
//     this.trainees = trainees;