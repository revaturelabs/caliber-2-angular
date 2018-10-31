import { Component, OnInit } from '@angular/core';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';
import { BatchService } from '../batch.service';
import { FormsModule } from '@angular/forms';
import { Batch } from '../type/batch';

@Component({
  selector: 'app-batch-view',
  templateUrl: './batch-view.component.html',
  styleUrls: ['./batch-view.component.css']
})
export class BatchViewComponent implements OnInit {

  years: string[];
  selectedBatches: Batch[];
  defaultYears = [2016, 2017, 2018, 2019];
  selectedYear = 2016;

  constructor(private batchservice: BatchService) { }

  ngOnInit() {
    this.pickYear(2016);
  }

  resetBatchForm(): void {

  }

  resetImportModal(): void {

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
}
