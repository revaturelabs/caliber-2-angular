import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Trainee, Grade, traineeAssessment } from 'src/app/Batch/type/trainee';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { AssessBatchService } from 'src/app/Assess-Batch/Services/assess-batch.service';
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { ReportOutput } from '../../Models/report-output';
import { ReportService } from '../../Service/report.service';
import { Category } from 'src/app/User/user/types/trainee';
import { QANote } from '../../Models/qanote';

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
  
  
  gradesDataStore:Grade[] = [];
  qaNoteDataStore:QANote[] = [];
  categoryDataStore: Category[] = [];
  assessmentsDataStore:Assessment[] = [];

  assessmentAverage:number[]=[]; 
  gradesAverage: number[]=[];

  batchExists: boolean = false;
  ourTrainee: Trainee[];

  calculateGradesAverage: number =0;
  calculateAssessmentsAverage:number =0;

  reportOutput: ReportOutput;
  @Output() submitReportOutput:EventEmitter<ReportOutput> = new EventEmitter<ReportOutput>();

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
    this.getCategories();
  }

  getBatch(year:number){
    this.reportService.getBatchesByYear(year)
    .subscribe(results =>{
      console.log(results);
      this.batches = results;
      if(results.length >0){
        this.selectedBatch = this.batches[0];
        this.batchExists = true;
        this.reportService.setBatch(this.batches[0]);
        this.getWeeks();
        this.getTraineesByBatchId();
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
    this.reportService.setWeek(0);
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
        allTrainee.traineeId=-1;
        allTrainee.name="Trainees (all)";
        this.trainees.unshift(allTrainee);
        this.selectedTrainee = trainees[0];
        this.processAveragesAndOutput();
        this.reportService.setTrainee(trainees[0]);
        this.reportService.setTraineeDataStore(trainees);
      }
    });    
  }

  selectYear(event: number) {
    this.selectedYear = event.toString();
    // this.selectedWeek = "Select Week (All)";
    this.trainees = [];
    this.getBatch(event);
    this.calculateGradeAverage();
  }

  selectTrainee(event: Trainee){
    this.selectedTrainee = event;
    this.reportService.setTrainee(event);
    this.processAveragesAndOutput();
  }

  selectWeek(event: number) {
    this.selectedWeek = event;
    if(event){
      this.titledWeek = "Week " +event;
      this.reportService.setWeek(event);
    }
    else{
      this.titledWeek = "Weeks (all)";
      this.reportService.setWeek(0);
    }
    this.processAveragesAndOutput();
    // this.auditService.selectedWeek = event;
    // this.getBatchNotesByWeek();
    // this.getAssessmentsByBatchIdAndWeekNum();
    // this.getGradesByBatchIdAndWeekNum();
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.reportService.setBatch(event);
    this.auditService.selectedBatch = this.selectedBatch;
    this.reportService.setBatch(this.selectedBatch);
    // this.getWeeks();
    // this.showActiveWeek(this.auditService.selectedBatch.weeks);
    // this.selectWeek(this.auditService.selectedBatch.weeks);
    this.getWeeks();
    this.getTraineesByBatchId();
    
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
        // console.log("Updating Assessments");
        this.assessmentsDataStore = assessments;
        this.calculateAssessmentAverage();
    });
  }

  getAllGrades(){
    this.reportService.getAllGrades().subscribe(
      (grades)=>{
        // console.log("Updating Grades");
        this.gradesDataStore = grades;
        this.calculateGradeAverage();
        this.assessReportOutput();
    });
  }

  getCategories(){
    if(this.categoryDataStore.length == 0){
      this.reportService.getAllCategories().subscribe((categories)=>{
        // console.log("Getting all categories");
        this.categoryDataStore = categories;
        this.reportService.setCategoryDataStore(categories);
      });
    }
  }

  getQANotes(){ 
    this.reportService.getAllQANotes().subscribe((qaNotes)=>{
      // console.log("Getting all QA Notes of Batch");
      this.qaNoteDataStore = qaNotes;
      this.reportService.setQANoteDataStore(qaNotes);
    });
  }

  calculateAssessmentAverage(){
    let totalScore: number = 0;
    let calculateAssessmentsSampleCount = this.assessmentsDataStore.length;
    this.assessmentsDataStore.forEach((item) => {
      totalScore += item.rawScore;
      
    });
    totalScore = totalScore/calculateAssessmentsSampleCount;
    this.calculateAssessmentsAverage = totalScore;
    console.log("QC average Score:" + this.calculateAssessmentsAverage + " over " + calculateAssessmentsSampleCount + " batch assessments.");
  }

  calculateGradeAverage(){
    let totalScore: number = 0;
    let calculateGradesSampleCount = this.gradesDataStore.length;
    this.gradesDataStore.forEach((item) => {
      totalScore += item.score;
    });
    totalScore = totalScore/calculateGradesSampleCount;
    this.calculateGradesAverage = totalScore;
    console.log("Quiz average Score:" + this.calculateGradesAverage + " over " + calculateGradesSampleCount + " administerred quizzes.");
  }

  assessReportOutput(){
    this.reportOutput = new ReportOutput();
    // this.reportOutput.selectedYear = this.selectedYear;
    // this.reportOutput.selectedBatches = this.batches;
    this.reportOutput.selectedWeek = this.selectedWeek;
    this.reportOutput.selectedTrainee = this.selectedTrainee;
    // this.reportOutput.assessmentsDataStore = this.assessmentsDataStore;
    // this.reportOutput.gradesDataStore = this.gradesDataStore;
    // this.reportOutput.calculateAssessmentsAverage = this.calculateAssessmentsAverage;
    // this.reportOutput.calculateGradesAverage = this.calculateGradesAverage;
    this.reportService.setGradeDataStore(this.gradesDataStore);
    this.reportService.setAssessmentDataStore(this.assessmentsDataStore);

    console.log(this.reportOutput);
    this.submitReportOutput.emit(this.reportOutput);
  }

  processAveragesAndOutput(){
    this.getAllAssessments();
    this.getAllGrades();
    this.getQANotes();
  }
}
