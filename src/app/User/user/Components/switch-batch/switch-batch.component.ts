import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchService } from 'src/app/Batch/batch.service';
import { ViewBatchesService } from '../../Services/view-batches.service';
import { Trainee } from '../../Types/trainee';
import { TraineesService } from '../../Services/trainees.service';
import { EventEmitter } from '@angular/core';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-switch-batch',
  templateUrl: './switch-batch.component.html',
  styleUrls: ['./switch-batch.component.css']
})
export class SwitchBatchComponent implements OnInit, OnChanges {

  batches: Array<Batch> = [];
  allBatches: Array<Batch> = [];
  switchBatch = '';

  @Output() switchBatchEvent = new EventEmitter<boolean>();

  @Input() trainee: Trainee;

  constructor(
    private bs: BatchService,
    private ts: TraineesService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.bs.getBatches().subscribe(data => {
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

  ngOnChanges() {
    if (this.batches && this.trainee) {
      this.batches = this.allBatches.filter(batch => {
        return batch.batchId !== this.trainee.batchId;
      });
    }
  }

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
