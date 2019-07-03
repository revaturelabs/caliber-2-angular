import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Trainee, Grade} from 'src/app/Batch/type/trainee';
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
  batches: Batch[] =[];  
  weeks : number[];
  trainees : Trainee[];
  quarters: String[]=[];
  allTrainees : Trainee;
  redraw : boolean = true;

  selectedYear: string = "Select Year";
  selectedBatches: Batch[];
  titledWeek: string = "Not Found";
  selectedWeek: number;
  selectedTrainee: Trainee = new Trainee();
  selectedQuarter: String = "Select Quarter";
  
  averageGradeScore: number = 0;
  gradesDataStore:Grade[] = [];
  qaNoteDataStore:QANote[] = [];
  categoryDataStore: Category[] = [];
  assessmentsDataStore:Assessment[] = [];

  assessmentAverage:number[]=[]; 
  gradesAverage: number[]=[];

  batchExists: boolean = false;
  listedTrainees: Trainee[];

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
    this.initializeTotalGradeAndCreateDummyTraineeForSelectAll();
    this.selectedTrainee.name = "No, Data"
    this.reportService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0].toString();
 
      this.getBatch(this.years[0]);
    });
    this.getCategories();
  }

  getBatch(year:number){
    this.reportService.getBatchesByYear(year)
    .subscribe(results =>{
      // console.log(results);
      if(!this.arraysEqualPreventsReportOutput(results,this.batches)){
        this.batches = results;
        if(results.length >0){
          this.selectedBatch = this.batches[0];
          this.batchExists = true;
          this.reportService.setBatch(this.batches[0]);
          this.getWeeks();
          this.getTraineesByBatchId();
        }
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
    this.traineeService.getTraineesByBatchId(this.selectedBatch.batchId).subscribe(
      trainees => {
      // console.log(trainees)    

      if(trainees.length>0 && this.trainees){
        this.trainees = trainees;
        this.listedTrainees = trainees;
        this.traineeService.storeTrainees(trainees);


        this.listedTrainees.unshift(this.allTrainees);
        this.selectedTrainee = this.listedTrainees[0];
        this.reportService.setTrainee(this.listedTrainees[0]);

        this.processAveragesAndOutput();
        this.reportService.setTraineeDataStore(trainees);
      }
    });    
  }

  selectYear(event: number) {
    if(this.selectedYear != event.toString()){
      this.selectedYear = event.toString();

      this.trainees = [];
      this.listedTrainees = [];
      this.getBatch(event);
   }
  }

  selectTrainee(event: Trainee){
    if(this.selectedTrainee.traineeId != event.traineeId){
      this.selectedTrainee = event;
      this.reportService.setTrainee(event);
      // this.getAllGradesofTrainee();
      this.processAveragesAndOutput();
    } 
  }

  selectWeek(event: number) {
    if(this.selectedWeek != event){
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
    }
  }

  selectBatch(event: Batch) {
    if(this.selectedBatch.batchId != event.batchId){
      this.selectedBatch = event;
      this.reportService.setBatch(event);
      this.auditService.selectedBatch = this.selectedBatch;
      this.reportService.setBatch(this.selectedBatch);
  
      this.getWeeks();
      this.getTraineesByBatchId();
    } 
  }

  showYears(){
  }

  showBatches(){

  }
  showWeeks(){
  }

  showTrainees(){
    this.listedTrainees = this.trainees.map((element)=>{return element});
    this.listedTrainees.unshift(this.allTrainees);
  }

  getAllAssessments(){
    this.reportService.getAllAssessments().subscribe(
      (assessments)=>{
        // console.log("Updating Assessments");
        this.assessmentsDataStore = assessments;
    });
  }

  getAllGrades(){
    this.reportService.setGradesOfTraineeDataStore([]);
    this.reportService.getAllGrades().subscribe(
      (grades)=>{
        // console.log("Updating Grades");
        this.gradesDataStore = grades;
        this.getAllGradesofTrainee();
    });
  }

  getAllGradesofTrainee(){
    if(this.selectedTrainee != null && this.selectedTrainee.traineeId>0){
      this.reportService.getAllTraineeGrades().subscribe(
        (traineeGrades)=>{
          // console.log("Updating Grades///////");
          this.reportService.setGradesOfTraineeDataStore(traineeGrades);
          // console.log(this.reportService.getGradesOfTraineeDataStore())
          this.assessReportOutput();
      });
    }
    else{
      this.assessReportOutput();
    }
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

    this.submitReportOutput.emit(this.reportOutput);
  }

  createAllTrainees(){ // A generic trainee to signify all trainees are selected
    if(this.allTrainees == null){
      this.allTrainees = new Trainee()
      this.allTrainees.traineeId=-1;
      this.allTrainees.name="Trainees (all)";
      this.allTrainees.batchId = -1;
    }
  }

  processAveragesAndOutput(){
    this.getAllAssessments();
    this.getQANotes();
    this.getAllGrades();
  }

  processTotalAverageGrade(){
    if(this.averageGradeScore == 0){
      this.reportService.getAllGradesForTotalAverage().subscribe(
        (grades)=>{
        grades.forEach((element) =>{
          this.averageGradeScore += element.score
        });  
        this.averageGradeScore = this.averageGradeScore/grades.length;
        this.averageGradeScore = Math.round(this.averageGradeScore * 100) / 100;
        this.reportService.setAverageGradeScore(this.averageGradeScore);
      });
    }  
  }

  initializeTotalGradeAndCreateDummyTraineeForSelectAll(){
    this.createAllTrainees();
    this.processTotalAverageGrade();
  }

  arraysEqualPreventsReportOutput(array1, array2) {
    if(array1.length !== array2.length)
        return false;
    for(var i = array1.length; i--;) {
        if(array1[i] !== array2[i])
            return false;
    }
    return true;
  }
}