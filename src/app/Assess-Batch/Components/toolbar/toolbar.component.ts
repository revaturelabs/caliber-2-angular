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

  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;
  createUpdate: Batch = null;
  ourTrainee: Trainee[];
  batchExists: boolean = false;
  @ViewChild('batchModal') batchModal: BatchModalComponent;
  
  constructor(
    public auditService: AuditService, public traineeService: TraineeService, public assessBatchService: AssessBatchService
  ) { }
  ngOnInit() {
    this.getAllYears();
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
    console.log(this.batches);
  }

  checkBatchExistanceInaQuarter(yearselect, quarter) {
    this.assessBatchService.getBatchesByQuarter(Number.parseInt(yearselect), quarter)
    .subscribe(result => {
        if(result.length > 0) {
          this.quarters.push("Q"+quarter);
        } else {
     // this.batchExists = false;
    }

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
    this.selectedQuarter = this.quarters[0];
    this.selectedBatch = result[0];
    this.getBatches();
      });
  }

  showQs(){
    this.batches = [];
    this.selectedQuarter = "Select Quarter";
    // this.selectedBatch = null;
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