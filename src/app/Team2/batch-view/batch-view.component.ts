import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';
import { BatchService } from '../batch.service';
import { FormsModule } from '@angular/forms';
import {ViewTraineesComponent } from '../../User/user/Components/view-trainees/view-trainees.component';
import { Batch } from '../type/batch';
import { analyzeAndValidateNgModules } from '@angular/compiler';

 /*

 The batch-view component is the parent component for the manage batch feature.
 This component allows the user to view all of the batches by the selected year.
 This component also displays the buttons to create and edit batches and displays the number of trainees per batch.
 @author Juan Trejo, Anthony Jin

 */

@Component({
  selector: 'app-batch-view',
  templateUrl: './batch-view.component.html',
  styleUrls: ['./batch-view.component.css']
})
export class BatchViewComponent implements OnInit {

  // class variables
  @ViewChild('batchModal') batchModal: BatchModalComponent;
  @ViewChild('viewTraineeModal') viewTraineeModal: ViewTraineesComponent;
  createUpdate: Batch = null;
  years: string[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: number;
  selectedBatch: Batch;
  selectedBatchId = 0;

  constructor(private batchservice: BatchService) { }

  ngOnInit() {
    // gets all years for dropdown button
    this.getAllYears();
  }

  // resets createorUpdate variable for child component
  resetBatchForm(): void {
    this.createUpdate = null;
    this.batchModal.resetForm();
  }

  // ToDo: future implementation
  // method for import button
  resetImportModal(): void {

  }

  // sets batch information for child component
  populateBatch(batch: Batch) {
    console.log(batch);
    this.createUpdate = batch;
  }

  // re-renders contents in batch view component
  refreshPage() {
    this.batchservice.getBatchesByYear(this.selectedYear).subscribe(result => {
      this.selectedBatches = result;
    });
    this.getAllYears();
  }

  // renders contents in view batch component based on year selected
  pickYear(event: number) {
    this.selectedYear =  event;
    this.batchservice.getBatchesByYear(event).subscribe(result => {
      this.selectedBatches = result;
      this.getTraineeCount();
    });
  }

  getTraineeCount() {
    const allids: number[] = [];
    for (const batch of this.selectedBatches) {
      if (batch) {
        allids.push(batch.batchId);
      }
    }
    console.log('ids: ' + allids);
    this.batchservice.getTraineeCount(allids).subscribe( count => {
      this.populateTraineeCount(count);
    });
  }

  populateTraineeCount(count: number[][]) {
    for (const batch of this.selectedBatches) {
      for (const c of count) {
        if (c[0] === batch.batchId) {
          batch.traineeCount = c[1];
        }
      }
    }
  }

  // stores batch id for trainee display
  selectCurrentBatch(bid: number) {
    // sessionStorage.setItem('bid', '' + bid);
    this.selectedBatchId = bid;
  }

  // removes a batch
  deleteBatch(batchId: number) {
    console.log('delete');
    console.log(batchId);
    this.batchservice.deleteBatch(batchId).subscribe( data => this.refreshPage());
  }

  // gets all start years from database for dropdown button
  getAllYears() {
    this.batchservice.getAllYears().subscribe(years => {
      if (years.length === 0 ) {
        this.getAllYears();
      } else {
        this.defaultYears = years;
        this.selectedYear = this.defaultYears[this.defaultYears.length - 1];
        this.pickYear(this.defaultYears[this.defaultYears.length - 1]);
      }
    });
  }

  traineeClose() {
    this.refreshPage();
    this.viewTraineeModal.refreshView();
  }
}
