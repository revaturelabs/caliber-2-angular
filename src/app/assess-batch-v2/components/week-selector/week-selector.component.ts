import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Batch} from "../../../Batch/type/batch";
import {AssessBatchService} from "../../../Assess-Batch/Services/assess-batch.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.css']
})
export class WeekSelectorComponent implements OnInit {

  @Output("selectedWeek") selectedWeekEmitter: EventEmitter<number> = new EventEmitter<number>(true);
  @Output("updatedBatch") updatedBatch: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  @Input("batch") batch: Batch;

  private updateBatchSubscription: Subscription;

  selectedWeek: number;
  weeks: number[] = [];

  constructor(
    private assessBatchService: AssessBatchService
  ) { }

  ngOnInit() {
    if (this.batch.weeks > 0) {
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

  addWeek() {
    this.batch.weeks = this.batch.weeks + 1;
    this.updateBatchSubscription = this.assessBatchService.addWeekAndReturn(this.batch).subscribe(
      updated => {
        this.updatedBatch.emit(updated);
        this.selectWeek(updated.weeks);
      }
    )
  }

  selectWeek(week: number) {

    this.selectedWeekEmitter.emit(week);
  }
}
