import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {ChronoService} from "../../../services/subvertical/util/chrono.service";

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.css'],
})
export class WeekSelectorComponent implements OnInit, OnChanges {

  @Output("selectedWeek") selectedWeekEmitter: EventEmitter<number> = new EventEmitter<number>(true);
  @Output("updatedBatch") updatedBatch: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  @Input("batch") batch: Batch;

  selectedWeek: number;
  weeks: number[] = [];

  constructor(
    private chronoService: ChronoService
  ) { }

  ngOnInit() {
    if (this.batch && this.batch.weeks > 0) {
      this.selectedWeek = this.batch.weeks;
      this.selectedWeekEmitter.emit(this.batch.weeks);
    }

    // Populate initial weeks
    for (let i = 1; i <= this.batch.weeks; i++) {
      this.weeks[i-1] = i;
    }

    // Set default week
    this.selectedWeekEmitter.asObservable().subscribe(
      selectedWeek => {
        this.weeks = [];
        this.selectedWeek = selectedWeek;

        // Repopulate weeks with new week
        for (let i = 1; i <= this.batch.weeks; i++) {
          this.weeks[i-1] = i;
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'batch' && change.currentValue) {
        this.selectedWeek = change.currentValue.weeks;
      }
    }
  }



  addWeek() {
    this.batch.weeks = this.batch.weeks + 1;
    this.chronoService.addWeekAndReturn(this.batch).toPromise().then(
      updated => {
        this.updatedBatch.emit(updated);
        this.selectWeek(updated.weeks);
      }
    );
  }

  selectWeek(week: number) {
    this.selectedWeekEmitter.emit(week);
  }

  getWeeksForBatch(batch: Batch): number[] {
    if (batch) {
      const weeks: number[] = [];
      for (let i = 1; i <= batch.weeks; i++) {
        weeks.push(i);
      }
      return weeks;
    }
  }
}
