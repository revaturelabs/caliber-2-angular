import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-batch-select-toolbar',
  templateUrl: './batch-select-toolbar.component.html',
  styleUrls: ['./batch-select-toolbar.component.css']
})
export class BatchSelectToolbarComponent implements OnInit {

  @Input("years") years: number[];
  @Input("quarters") quarters: number[];
  @Input("batches") batches: Batch[];
  @Input("year") year: number;
  @Input("quarter") quarter: number;
  @Input("batch") batch: Batch;
  @Input("week") week: number;

  @Output("selectedQuarter") selectedQuarter: EventEmitter<number> = new EventEmitter(true);
  @Output("selectedYear") selectedYear: EventEmitter<number> = new EventEmitter(true);
  @Output("selectedBatch") selectedBatch: EventEmitter<Batch> = new EventEmitter(true);

  constructor() {
  }

  ngOnInit() {
  }

  selectQuarter(quarter: number) {
    this.selectedQuarter.emit(quarter);
  }

  selectYear(year: number) {
    this.selectedYear.emit(year);
  }

  selectBatch(batch: Batch) {
    this.selectedBatch.emit(batch);
  }

  formatQuarters(quarter: number): string {
    return "Q" + quarter;
  }

  formatBatches(batch: Batch): string {
    if (batch !== undefined) {
      const dateString: string = new Date(batch.startDate).toLocaleDateString("en-US");
      return `${batch.trainer} - ${batch.skillType} - ${dateString}`;
    }
  }
}
