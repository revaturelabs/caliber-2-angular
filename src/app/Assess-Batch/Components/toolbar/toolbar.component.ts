import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchModalComponent } from '../../batch-modal/batch-modal.component';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  quarters: String[]=["Q1", "Q2", "Q3", "Q4"];
  years: number[];
  batches: Batch[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: number;
  selectedQuarter: String = "Q1";
  selectedBatch: Batch;
  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;
  createUpdate: Batch = null;
  @ViewChild('batchModal') batchModal: BatchModalComponent;
  
  constructor(
    public auditService: AuditService
  ) { }
  ngOnInit() {
    
    this.selectedWeek=1;
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
  getAllYears() {
    this.auditService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0];
      console.log(this.years);
      this.getBatches();
    });
    
  }
  getBatches() {
    this.auditService.getBatchesByYear(this.selectedYear)
    .subscribe(result => {
      this.batches = result;
      this.selectedBatch = this.batches[0];
      this.auditService.selectedBatch = this.batches[0];
      console.log(this.batches);
      this.getWeeks();
      });
      
  }
  selectYear(event: number) {
    this.selectedYear = event;
    this.auditService.selectedYear = this.selectedYear;
    this.auditService.getBatchesByYear(event)
    .subscribe(result => {
      this.batches = result;
      });
  }
  
  selectQuarter(event: String) {
    this.selectedQuarter = event;
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
  }
  getWeeks() {
    this.weeks = [];
    for(var i = 0; i<this.selectedBatch.weeks; i++){
      this.weeks.push(i+1);
    }
  }
}