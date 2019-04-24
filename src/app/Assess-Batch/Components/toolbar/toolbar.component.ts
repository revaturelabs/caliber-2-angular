import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchModalComponent } from '../../Components/toolbar/batch-modal/batch-modal.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { Trainee, traineeAssessment } from '../../../Batch/type/trainee';
import { TraineeService } from '../../Services/trainee.service';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { AssessBatchGradeService } from '../../Services/assess-batch-grades.service';
import { NoteService } from '../../Services/note.service';
import { Note } from 'src/app/Batch/type/note';

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

  grades: traineeAssessment = {
    assessmentId: 0,
    rawScore: 0,
    assessmentTitle: '',
    assessmentType: '',
    weekNumber: 0,
    batchId: 0,
    assessmentCategory: 0
  }

  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;
  createUpdate: Batch = null;
  ourTrainee: Trainee[];
  batchExists: boolean = false;
  weeklyGrades: any[] = [];
  @ViewChild('batchModal') batchModal: BatchModalComponent;
  
  constructor(
    public auditService: AuditService, public traineeService: TraineeService, public assessBatchService: AssessBatchService, public assessBatchGradeService: AssessBatchGradeService, public noteService: NoteService
  ) { }
  ngOnInit() {
    this.getAllYears();
  }
     /**
   * resets createorUpdate variable for child component
   */
  resetCreateForm(): void {
    this.createUpdate = null;
   this.batchModal.resetForm();
  }
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
      for (var q = 4; q > 0; q--) { 
        this.checkBatchExistanceInaQuarter(this.years[0], q);
      }
      this.selectedYear = "Select Year";
    });
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

  showQs(){
    this.selectedQuarter = "Select Quarter";
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
    this.getBatchNotesByWeek();
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
      this.getBatchNotesByWeek();
    })    
  }
  getBatchNotesByWeek(){
    this.noteService.getBatchNotesByWeek(this.selectedBatch.batchId, this.selectedWeek).subscribe(notes => {
      
      this.noteService.noteEmitter.emit(notes);
    })   

  }

  getAssessmentsByBatchId(){
    console.log(this.selectedBatch.batchId);
    this.weeklyGrades=[];
    this.assessBatchGradeService.getAssessmentsByBatchId(this.selectedBatch.batchId).subscribe(assessments => {
      for(let i = 0; i < assessments.length; i++){
        if(assessments[i].weekNumber == this.selectedWeek){
          this.weeklyGrades.push(assessments[i]);
        }
      }
      this.assessBatchGradeService.storeAssessments(this.weeklyGrades);
      this.assessBatchGradeService.assessments.emit(this.weeklyGrades);
    })
  }

}