import {Component, OnInit, ViewChild} from '@angular/core';
import {BatchModalComponent} from '../batch-modal/batch-modal.component';
import {ViewTraineesComponent} from '../../User/user/Components/view-trainees/view-trainees.component';
import {ErrorService} from 'src/app/error-handling/services/error.service';
import {Batch} from "../../domain/model/batch.dto";
import {ManageBatchService} from "../../services/manage-batch.service";

/**
  *  The batch-view component is the parent component for the manage batch feature.
  *This component allows the user to view all of the batches by the selected year.
  *This component also displays the buttons to create and edit batches and displays the number of trainees per batch.
  * @author Anthony Jin, Juan Trejo
  *
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

  constructor(
    private manageBatchService: ManageBatchService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    // gets all years for dropdown button
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

  /**
   * sets batch information for child component
   * @param batch batch to populate the child component form
   */
  populateBatch(batch: Batch) {
    this.createUpdate = batch;
  }

  /**
   * re-renders contents in batch view component
   */
  refreshPage() {
    this.manageBatchService.getBatchesByYear(this.selectedYear).subscribe(result => {
      this.selectedBatches = result;

    }, error => {
      const serviceName = 'Batch Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
    this.getAllYears();
  }

  /**
   * renders contents in view batch component based on year selected
   * @param event year selected to display batches from
   */
  pickYear(event: number) {
    this.selectedYear =  event;
    this.manageBatchService.getBatchesByYear(event).subscribe(result => {
      this.selectedBatches = result;
      this.getTraineeCount();
    }, error => {
      const serviceName = 'Batch Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
  }

  /**
   * gets all trainee counts for the batches
   */
  getTraineeCount() {
    const allids: number[] = [];
    for (const batch of this.selectedBatches) {
      if (batch) {
        allids.push(batch.batchId);
      }
    }
    this.manageBatchService.getTraineeCount(allids).subscribe( count => {
      this.populateTraineeCount(count);
    }, error => {
      const serviceName = 'Batch Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
  }

  /**
   * sets all trainee counts for the batches
   * @param count 2d array returned from batchservice call
   */
  populateTraineeCount(count: number[][]) {
    for (const batch of this.selectedBatches) {
      for (const c of count) {
        if (c[0] === batch.batchId) {
          batch.traineeCount = c[1];
        }
      }
    }
  }

  /**
   * stores batch id for trainee display
   * @param bid the batch identifier
   */
  selectCurrentBatch(bid: number) {
    this.selectedBatchId = bid;
  }

  /**
   * removes a batch
   * @param batchId batchid of the batch to be deleted
   */
  deleteBatch(batchId: number) {
    this.manageBatchService.deleteBatch(batchId).subscribe( data => this.refreshPage(), error => {
      const serviceName = 'Batch Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
  }

  /**
   * gets all start years from database for dropdown button
   */
  getAllYears() {
    this.manageBatchService.getAllYears().subscribe(years => {
      if (years.length === 0 ) {
        this.getAllYears();
      } else {
        this.defaultYears = years;
        this.selectedYear = this.defaultYears[this.defaultYears.length - 1];
        this.pickYear(this.defaultYears[this.defaultYears.length - 1]);
      }
    }, error => {
      const serviceName = 'Batch Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
  }

  /**
   * closes trainee modal and resets the selected batchid
   */
  traineeClose() {
    this.viewTraineeModal.refreshView();
    this.selectedBatchId = 0;
    this.refreshPage();
  }
}
