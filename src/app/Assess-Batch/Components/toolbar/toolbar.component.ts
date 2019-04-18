import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchModalComponent } from '../../batch-modal/batch-modal.component';
import { Trainee } from '../../../Batch/type/trainee';
import { TraineeService } from '../../Services/trainee.service';
import { AssessBatchService } from '../../Services/assess-batch.service';

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

  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;
  createUpdate: Batch = null;
  ourTrainee: Trainee[];
  @ViewChild('batchModal') batchModal: BatchModalComponent;
  
  constructor(
    public auditService: AuditService, public traineeService: TraineeService, public assessBatchService: AssessBatchService
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
    this.assessBatchService.getBatchesByQuarter(Number.parseInt(this.selectedYear), this.selectedQuarter.slice(1,2))
    .subscribe(result => {
        if(result.length > 0) {
      this.batches = result;
      this.selectedBatch = this.batches[0];
      this.getWeeks();
        this.selectedWeek = this.weeks.length;
    }
      });
  }

  selectYear(event: number) {
    this.selectedYear = event.toString();
    this.batches = [];
    this.selectedBatch = null;
    console.log(this.batches);
    this.showBatch = false;
    this.showQ = true;
  }
  
  showQs(){
    this.showBatch = false;
    this.batches = [];
    this.selectedBatch = null;
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

}