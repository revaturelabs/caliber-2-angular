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

  test = 'whats poppin';
  selectedYear: '2018';

  constructor(private batchservice: BatchService) { }

  ngOnInit() {
  }

  resetBatchForm(): void {

  }

  resetImportModal(): void {

  }
}
