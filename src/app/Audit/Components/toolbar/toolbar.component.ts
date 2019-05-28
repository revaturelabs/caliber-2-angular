import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { QcNote } from '../../types/note';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  quarters: number[]=[1,2,3,4];
  years: number[];
  batches: Batch[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: number;
  selectedQuarter: number;
  selectedBatch: Batch;
  selectedBatchId: number;
  weeks = [];
  selectedWeek: number;
  notes: QcNote[] = [];
  constructor(
    public auditService: AuditService
  ) { }

  ngOnInit() {
    
    this.selectedWeek=1;
    this.getAllYears();
    
  }

  

  getAllYears() {
    this.auditService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0];
      console.log(this.years);
      this.getBatches();
      this.selectYear(this.selectedYear);
    });
    
  }

  getBatches() {
    this.auditService.getBatchesByYearByQuarter(this.selectedYear, this.selectedQuarter)
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
    this.selectQuarter(this.quarters[0]);
  }
  selectQuarter(event: number) {
    this.selectedQuarter = event;
    this.auditService.selectedQuarter = this.selectedQuarter;
    this.getBatches();
    this.auditService.getBatchesByYearByQuarter(this.selectedYear, this.selectedQuarter)
    .subscribe(result => {
      this.batches = result;
      this.selectBatch(this.batches[0]);
      });

      console.log(event + " quarter value");
      console.log(this.selectedQuarter + " quarter value");

      
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.auditService.selectedBatch = this.selectedBatch;
    this.getWeeks();
    this.selectedWeek = 1;
    this.auditService.selectedWeek = this.selectedWeek;
    this.selectWeek(this.auditService.selectedWeek);
  }

  showActiveWeek(week: number) {
    if (week==this.selectedWeek) {
      return "active";
    }
  }

  selectWeek(event: number) { 
    this.selectedWeek = event; 
    this.auditService.selectedWeek = this.selectedWeek; 
    this.auditService.getNotesByBatchByWeek(this.selectedBatch.batchId, this.selectedWeek)
    .subscribe(result => {
      this.auditService.setNotes(result);
      console.log(result);
      this.auditService.onWeekClick();  
    });
     
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
