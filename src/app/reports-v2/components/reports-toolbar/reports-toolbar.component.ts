import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Trainee} from "../../../domain/model/trainee.dto";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-reports-toolbar',
  templateUrl: './reports-toolbar.component.html',
  styleUrls: ['./reports-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsToolbarComponent implements OnInit, OnChanges {

  @Input('batches') batches: Batch[];
  @Input('batch') selectedBatch: Batch;
  @Input('years') years: number[];
  @Input('year') year: number;
  @Input('trainees') trainees: Trainee[];
  @Input("selectedTrainee") selectedTrainee: Trainee;
  @Input('week') selectedWeek: number;
  @Input('weeks') weeks: number[];
  @Output('onYearSelect') onYearSelect: EventEmitter<number> = new EventEmitter<number>(true);
  @Output('onBatchSelect') onBatchSelect: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  @Output('onWeekSelect') onWeekSelect: EventEmitter<number> = new EventEmitter<number>(true);
  @Output('onTraineeSelect') onTraineeSelect: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'trainees') {
        this.trainees = change.currentValue;
      }
    }
  }



  selectYear(year: number) {
    // Set current year value
    this.onYearSelect.emit(year);

    // Reset batch
    this.onBatchSelect.emit(undefined);

    // Reset selected week, selected trainee, reset weeks in dropdown
    this.onWeekSelect.emit(0);
    this.onTraineeSelect.emit(undefined);
    this.selectWeek(0);
  }

  selectBatch(batch: Batch) {
    this.selectedBatch = batch;
    this.onBatchSelect.emit(batch);
    this.onTraineeSelect.emit(undefined);
    this.selectWeek(0);
  }

  selectTrainee(trainee: Trainee) {
    this.onTraineeSelect.emit(trainee);
  }

  selectWeek(week: number) {
    this.selectedWeek = week;
    this.onWeekSelect.emit(week);
  }

  getWeeksForBatch(batch: Batch): number[] {
    if (batch) {
      const weeks: number[] = [];
      for (let i = 0; i <= batch.weeks; i++) {
        weeks.push(i);
      }
      return weeks;
    } else {
      return [];
    }
  }

}
