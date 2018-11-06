import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchService } from 'src/app/Batch/batch.service';
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

  @Output() switchBatchEvent = new EventEmitter<boolean>();

  @Input() trainee: Trainee;

  constructor(private vbs: ViewBatchesService, private ts: TraineesService) { }

  ngOnInit() {
    this.vbs.getBatches().subscribe(data => {
      this.allBatches = data;
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
      });
    }
  }
}
