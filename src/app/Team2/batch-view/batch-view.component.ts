import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';
import { BatchService } from '../batch.service';
import { FormsModule } from '@angular/forms';
import {ViewTraineesComponent } from '../../User/user/Components/view-trainees/view-trainees.component';
import { Batch } from '../type/batch';

@Component({
  selector: 'app-batch-view',
  templateUrl: './batch-view.component.html',
  styleUrls: ['./batch-view.component.css']
})
export class BatchViewComponent implements OnInit {

  @ViewChild('batchModal') batchModal: BatchModalComponent;
  createUpdate: Batch = null;
  years: string[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: number;
  selectedBatch: Batch;

  constructor(private batchservice: BatchService) { }

  ngOnInit() {
    this.getAllYears();
    console.log(this.defaultYears);
  }

  resetBatchForm(): void {
    this.createUpdate = null;
  }

  resetImportModal(): void {

  }

  populateBatch(batch: Batch) {
    console.log(batch);
    this.createUpdate = batch;
  }

  refreshPage() {
    this.batchservice.getBatchesByYear(this.selectedYear).subscribe(result => {
      this.selectedBatches = result;
    });
    this.getAllYears();
  }

  pickYear(event: number) {
    this.selectedYear =  event;
    this.batchservice.getBatchesByYear(event).subscribe(result => {
      this.selectedBatches = result;
    });
  }

  selectCurrentBatch(bid: number) {
    sessionStorage.setItem('bid', '' + bid);
  }

  deleteBatch(batchId: number) {
    console.log('delete');
    console.log(batchId);
    this.batchservice.deleteBatch(batchId).subscribe( data => console.log(data));
    this.refreshPage();
  }

  getAllYears() {
    this.batchservice.getAllYears().subscribe(years => {
      console.log(years);
      if (years.length === 0 ) {
        this.makeDefaultBatches();
        this.getAllYears();
      } else {
        this.defaultYears = years;
        this.selectedYear = this.defaultYears[this.defaultYears.length - 1];
        this.pickYear(this.defaultYears[this.defaultYears.length - 1]);
      }
    });
  }

  makeDefaultBatches() {
    this.batchservice.postBatch(new Batch('Tester', 'Tester',
    'Tester', 'Nick', 'Help', 'Nowhere', new Date('October 19, 2018'),
    new Date('October 20, 2018'), 55, 45)).subscribe();
  }
}
