import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { BatchService } from '../../../../services/subvertical/batch/batch.service';
import { TraineesService } from '../../Services/trainees.service';
import { EventEmitter } from '@angular/core';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Batch} from "../../../../domain/model/batch.dto";
import {Trainee} from "../../../../domain/model/trainee.dto";


@Component({
  selector: 'app-switch-batch',
  templateUrl: './switch-batch.component.html',
  styleUrls: ['./switch-batch.component.css']
})
/**
 * Component used for handling switching trainees from one batch to another
 */
export class SwitchBatchComponent implements OnInit, OnChanges {

  /**
   * All of the current batches minus the current batch
   */
  batches: Array<Batch> = [];

  /**
   * All of the current batches as retrieved from the Batch microservice
   */
  allBatches: Array<Batch> = [];

  /**
   * The batch id of the batch to be switched to as a string
   */
  switchBatch = '';

  /**
   * expects to output an 'EventEmitter<boolean>'
   */
  @Output() switchBatchEvent = new EventEmitter<boolean>();

  /**
   * expects a 'trainee' as an input
   */
  @Input() trainee: Trainee;

  /**
   * @param bs The batch service from the batch folder, used to communicate with the batch microservice
   * @param ts The trainee service from the User folder, used to communicate with the user microservice
   * @param errorService The error service from the error handling folder,
   *   used to communicate with the error modal to display errors on failed http requests
   */
  constructor(
    private bs: BatchService,
    private ts: TraineesService,
    private errorService: ErrorService) { }

  /**
   * grabs all of the batches and puts them in the 'allBatches' field when initialized
   */
  ngOnInit() {
    this.bs.getAllBatches().subscribe(data => {
      this.allBatches = data;
    },
    issue => {
      if (issue instanceof HttpErrorResponse) {
        const err = issue as HttpErrorResponse;
        this.errorService.setError('ViewBatchService',
        `Issue getting batches. Please contact system administrator: \n
        Status Code: ${err.status} \n
        Status Text: ${err.statusText} \n
        Error: ${err.message}`);
      }
    });
  }

  /**
   * filters out current batch and returns all other batches
   */
  ngOnChanges() {
    if (this.batches && this.trainee) {
      this.batches = this.allBatches.filter(batch => {
        return batch.batchId !== this.trainee.batchId;
      });
    }
  }

  /**
   * Will swap the trainee's current batch with the new, desired batch
   * @param switchBatch the batch that is to be switched to
   */
  switchBatchForTrainee(switchBatch) {
    if (switchBatch) {
      this.trainee.batchId = Number(switchBatch);
      this.ts.updateTrainee(this.trainee).subscribe(data => {
        if (data) {
          const elem = document.getElementById('closeButton3');
          const evt = new MouseEvent('click', { bubbles: true });
          elem.dispatchEvent(evt);
          this.switchBatchEvent.emit(true);
        }
      },
      issue => {
        if (issue instanceof HttpErrorResponse) {
          const err = issue as HttpErrorResponse;
          this.errorService.setError('TraineesService',
          `Issue updating trainee ${this.trainee.name}. Please contact system administrator: \n
          Status Code: ${err.status} \n
          Status Text: ${err.statusText} \n
          Error: ${err.message}`);
        }
      });
    }
  }
}
