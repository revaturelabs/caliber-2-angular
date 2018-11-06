import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { Batch } from 'src/app/Team2/type/batch';
import { BatchService } from 'src/app/Team2/batch.service';
import { ViewBatchesService } from '../../Services/view-batches.service';
import { Trainee } from '../../Types/trainee';
import { TraineesService } from '../../Services/trainees.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-switch-batch',
  templateUrl: './switch-batch.component.html',
  styleUrls: ['./switch-batch.component.css']
})
export class SwitchBatchComponent implements OnInit, OnChanges {

  batches: Array<Batch> = [];
  allBatches: Array<Batch> = [];
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
   * @ignore
   */
  constructor(private vbs: ViewBatchesService, private ts: TraineesService) { }

  /**
   * grabs all of the batches and puts them in the 'allBatches' field when initialized
   */
  ngOnInit() {
    this.vbs.getBatches().subscribe(data => {
      this.allBatches = data;
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
      });
    }
  }
}
