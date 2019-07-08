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
  //Data needed to track state of toolbar
  years: number[];
  batches: Batch[] =[];  
  weeks : number[];
  trainees : Trainee[];
  quarters: String[]=[];
  allTrainees : Trainee;
  redraw : boolean = true;

  //Data used to draw text on toolbar, or upload to ReportService
  selectedYear: string = "Select Year";
  selectedBatches: Batch[];
  titledWeek: string = "Not Found";
  selectedWeek: number;
  selectedTrainee: Trainee = new Trainee();
  selectedQuarter: String = "Select Quarter";
  
  //Data stores for the ReportService
  averageGradeScore: number = 0;
  gradesDataStore:Grade[] = [];
  qaNoteDataStore:QANote[] = [];
  categoryDataStore: Category[] = [];
  assessmentsDataStore:Assessment[] = [];
  batchAssessmentsDataStore:Assessment[] = [];
  listedTrainees: Trainee[];

  reportOutput: ReportOutput;
  @Output() submitReportOutput:EventEmitter<ReportOutput> = new EventEmitter<ReportOutput>();

  selectedBatch: Batch = {
    batchId: 0,
    trainingName: "",
    trainingType: "",
    skillType: "",
    trainer: "No Batch Data",
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
  noBatchDisplay:Batch = this.selectedBatch;
  
  constructor(private reportService: ReportService, private auditService : 
    AuditService, private assessBatchService : AssessBatchService,
    private traineeService: TraineeService) { }

  ngOnInit() {
    //All years are mandatory to pull, as we need to specifically get all batches within a year
    this.getAllYears();
  }

  getAllYears() {
    //This is the initial pull of data in the toolbar on load of the reports page.
    this.initializeTotalGradeAndCreateDummyTraineeForSelectAll();
    //If no trainee exists, show the name "No Data" on trainee bar
    this.selectedTrainee.name = "No Data"
    //get all years from the list of years
    this.reportService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0].toString();
      //Run getBatch() for the current year
      this.getBatch(this.years[0]);
    });
    this.getCategories();
  }

  getBatch(year:number){
    //This is the initial pull of data in the toolbar for getting all batches for a year
    this.reportService.getBatchesByYear(year)
    .subscribe(results =>{
      // console.log(results);
      // only update the information if results differs from the current this.batches
      if(!this.arraysEqualPreventsReportOutput(results,this.batches)){
        this.batches = results;
        //Only update to results if the array is greater than 0 
        if(results.length >0){
          //update Selected Batch in toolbar, save in report Service
          this.selectedBatch = this.batches[0];
          this.reportService.setBatch(this.batches[0]);
          //Get all weeks of selected batch and get trainees
          this.getWeeks();
          this.getTraineesByBatchId();
        }else{
          //Set selectedBatch and Service no display having no batches
          this.selectedBatch = this.noBatchDisplay;
          this.reportService.setBatch(this.noBatchDisplay);
        }
      }
    });
  }

  getWeeks() {
    //This is the initial pull of data in the toolbar for getting all batches for a year
    this.weeks = [];//Empty all weeks
    this.weeks.push(0);//Add 0 (representing all weeks are selected)
    for(var i = 0; i<this.selectedBatch.weeks; i++){
      this.weeks.push(i+1);//Add the appropriate amount of weeks to the array
    }
    this.selectedWeek = 0; //Make the "Weeks (all)" option selected
    this.reportService.setWeek(0); // set weeks in the reportService
    this.titledWeek = "Weeks (all)"; // Show the string, Weeks (all) in the toolbar
  }

  getTraineesByBatchId(){
    //Get all the trainees within a batch
    this.traineeService.getTraineesByBatchId(this.selectedBatch.batchId).subscribe(
      trainees => {
      // console.log(trainees)    
      
      if(!this.arraysEqualPreventsReportOutput(trainees,this.trainees) ){   
        //if the trainees aray length is greater than one, set new data 
        if(trainees.length>0){
          this.trainees = trainees;
          this.listedTrainees = trainees;
          this.traineeService.storeTrainees(trainees);

          this.listedTrainees.unshift(this.allTrainees);
          this.selectedTrainee = this.listedTrainees[0];
          this.reportService.setTrainee(this.listedTrainees[0]);

          this.processAveragesAndOutput();
          this.reportService.setTraineeDataStore(trainees);
        }else{
          //otherwise, set everything to empty arrays
          this.listedTrainees =[];
          this.trainees = []
          this.traineeService.storeTrainees([]);
          this.listedTrainees.unshift(this.allTrainees);
          this.selectedTrainee = this.listedTrainees[0];
          this.reportService.setTrainee(this.listedTrainees[0]);
          this.reportService.setTraineeDataStore(trainees);
        }
      }
    });    
  }

  selectYear(event: number) {
    this.selectedYear = event.toString();
    // this.selectedWeek = "Select Week (All)";
    this.trainees = [];
    this.getBatch(event);
    this.getTraineesByBatchId();
    //if you select a year, it has to be different than the current year to change to toolbar
    if(this.selectedYear != event.toString()){
      this.selectedYear = event.toString();

      this.trainees = [];
      this.listedTrainees = [];
      this.getBatch(event);
   }
  }

  selectTrainee(event: Trainee){
    //if you select a trainee, it has to be different than the current trainee to change to toolbar
    if(this.selectedTrainee.traineeId != event.traineeId){
      this.selectedTrainee = event;
      this.reportService.setTrainee(event);
      // this.getAllGradesofTrainee();
      this.processAveragesAndOutput();//update Assessments, Notes, and Grades.
    } 
  }

  selectWeek(event: number) {
    //if you select a week, it has to be different than the current week to change to toolbar
    if(this.selectedWeek != event){
      this.selectedWeek = event;
      if(event){// If week is not 0, show "Week #""
        this.titledWeek = "Week " +event;
        this.reportService.setWeek(event);
      }
      else{// If week is 0, show "Week (all)""
        this.titledWeek = "Weeks (all)";
        this.reportService.setWeek(0);
      }
      this.processAveragesAndOutput();//update Assessments, Notes, and Grades.
    }
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.getTraineesByBatchId();
    this.reportService.setBatch(event);
    this.auditService.selectedBatch = this.selectedBatch;
    this.reportService.setBatch(this.selectedBatch);
    // this.getWeeks();
    // this.showActiveWeek(this.auditService.selectedBatch.weeks);
    // this.selectWeek(this.auditService.selectedBatch.weeks);
    this.getWeeks();// if I get a new batch, I need to recalculate the weeks to show
    //this.getTraineesByBatchId(); // and I need to update the trainees in the batch
    
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
    //Show a list of trainees that shows all current trainees in batch, and a "Trainees (all)" dummy batch
    this.listedTrainees = this.trainees.map((element)=>{return element});
    this.listedTrainees.unshift(this.allTrainees);
  }

  getAllAssessments(){
    //update assessment datastore
    this.reportService.getAllAssessments().subscribe(
      (assessments)=>{
        // console.log("Updating Assessments");
        this.assessmentsDataStore = assessments;
    });
  }

  getAllBatchAssessments(){
    //update assessment datastore
    this.reportService.getAllBatchAssessments().subscribe(
      (assessments)=>{
        // console.log("Updating Assessments");
        this.batchAssessmentsDataStore = assessments;
        this.reportService.setBatchAssessmentDataStore(assessments);
    });
  }

  getAllGrades(){
    //update grades datastore
    this.reportService.setGradesOfTraineeDataStore([]);
    this.reportService.getAllGrades().subscribe(
      (grades)=>{
        // console.log("Updating Grades");
        this.gradesDataStore = grades;
        this.getAllGradesofTrainee();
    });
  }

  getAllGradesofTrainee(){
    //update grades from trainee (if one is selected) datastore
    if(this.selectedTrainee != null && this.selectedTrainee.traineeId>0){
      this.reportService.getAllTraineeGrades().subscribe(
        (traineeGrades)=>{
          // console.log("Updating Grades///////");
          this.reportService.setGradesOfTraineeDataStore(traineeGrades);
          // console.log(this.reportService.getGradesOfTraineeDataStore())
          //call for report page to update charts
          this.assessReportOutput();
      });
    }
    else{
      //call for report page to update charts
      this.assessReportOutput();
    }
  }

  getCategories(){
    //update category datastore
    if(this.categoryDataStore.length == 0){
      this.reportService.getAllCategories().subscribe((categories)=>{
        // console.log("Getting all categories");
        this.categoryDataStore = categories;
        this.reportService.setCategoryDataStore(categories);
      });
    }
  }

  getQANotes(){
    //update reportService datastore
    this.reportService.getAllQANotes().subscribe((qaNotes)=>{
      // console.log("Getting all QA Notes of Batch");
      this.qaNoteDataStore = qaNotes;
      this.reportService.setQANoteDataStore(qaNotes);
      this.getAllGrades();
    });
  }

  assessReportOutput(){
    //The method that causes the emit that updates the report component
    //update reportOutput (event emit from toolbar to Report Component)
    this.reportOutput = new ReportOutput();
    this.reportOutput.selectedWeek = this.selectedWeek;
    this.reportOutput.selectedTrainee = this.selectedTrainee;
    //update reportService (the service to pull toolbar information from)
    this.reportService.setGradeDataStore(this.gradesDataStore);
    this.reportService.setAssessmentDataStore(this.assessmentsDataStore);

    this.submitReportOutput.emit(this.reportOutput);
  }

  createAllTrainees(){ // A generic trainee to signify all trainees are selected
    //Creating a generic trainee that is used as the generic "all trainees are selected" marker
    if(this.allTrainees == null){
      this.allTrainees = new Trainee()
      this.allTrainees.traineeId=-1;
      this.allTrainees.name="Trainees (all)";
      this.allTrainees.batchId = -1;
    }
  }

  processAveragesAndOutput(){
    //update Assessments, Notes, and Grades.
    this.getAllAssessments();
    this.getAllBatchAssessments();
    //getting grades is chained in the async call on get QA notes
    this.getQANotes();
  }

  processTotalAverageGrade(){
    //When necessary, calculate the average grade store (should only be done once per page load)
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
    //Make the generic trainee and process total average grade (for use in cumulative scores chart)
    this.createAllTrainees();
    this.processTotalAverageGrade();
  }

  arraysEqualPreventsReportOutput(array1 : any[], array2: any[]) {
    //Compare if the two arrays have the same contents, if so, return true.
    if(array1 != undefined && array2 != undefined){
      if(array1.length !== array2.length)
          return false;
      for(var i = array1.length; i--;) {
          if(array1[i] !== array2[i])
              return false;
      }
      return true;
    } else{
      return false;
    }
  }
}