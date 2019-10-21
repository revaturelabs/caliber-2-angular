import {Component, EventEmitter, Input, OnInit, Output, ViewChildren, ElementRef, QueryList, AfterViewChecked } from '@angular/core';
import {AssessBatchService} from "../../../Assess-Batch/Services/assess-batch.service";
import {Subscription} from "rxjs";
import {Batch} from "../../../domain/model/batch.dto";
import {ChronoService} from "../../../services/subvertical/util/chrono.service";
import {WeekName} from "../../../domain/model/week-name.dto";

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.css']
})
export class WeekSelectorComponent implements OnInit, AfterViewChecked {

  @Output("selectedWeek") selectedWeekEmitter: EventEmitter<number> = new EventEmitter<number>(true);
  @Output("updatedBatch") updatedBatch: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  @Output("updatedName") nameEmitter: EventEmitter<WeekName> = new EventEmitter<WeekName>(true);
  @Input("names") weekNames: WeekName[];
  @Input("batch") batch: Batch;

  selectedWeek: number;
  weeks: number[] = [];
  names: string[] = [];
  nameInput: string = "";
  activeEdit: number = 0;

  @ViewChildren("updateName") inputs: QueryList<ElementRef<HTMLInputElement> >;
  clicks: number = 0;

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
      this.names[i - 1] = "Week " + i;
    }

    // Replace default names with persisted week names
    for(let week of this.weekNames) {
      this.names[week.weekNumber - 1] = week.name;
    }

    // Set default week
    this.selectedWeekEmitter.asObservable().subscribe(
      selectedWeek => {
        this.weeks = [];
        this.selectedWeek = selectedWeek;

        // Repopulate weeks with new week
        for (let i = 1; i <= this.batch.weeks; i++) {
          this.weeks[i-1] = i;
          this.names[i - 1] = "Week " + i;
        }

        // Repersist default names with week names
        for(let week of this.weekNames) {
          this.names[week.weekNumber - 1] = week.name;
        }
      }
    )
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

  displayWeekName(week: number): string {
    if(this.activeEdit == week) {
      return "";
    }

    return this.names[week - 1];
  }

  onClick(week: number) {
    this.clicks++;

    if(this.clicks == 2) {
      this.nameInput = "Week Name";
      this.activeEdit = week;
      this.clicks = 0;
    }

    if(this.activeEdit != week) {
      setTimeout(() => {
        if(this.clicks == 1) {
          this.forget();
          this.selectWeek(week);
        }
      }, 150);
    }
  }

  forget(): void {
    this.clicks = 0;
    this.activeEdit = 0;
  }

  remember(week: number): void {
    this.names[week - 1] = this.nameInput;

    let weekName: WeekName = this.findName(week);
    if(weekName === null) {
      this.nameEmitter.emit({ id: 0, batchId: this.batch.batchId, weekNumber: week, name: this.nameInput } as WeekName);
    } else {
      weekName.name = this.nameInput;
      this.nameEmitter.emit(weekName);
    }
    this.forget();
  }

  findName(week: number): WeekName {
    for(let weekName of this.weekNames) {
      if(weekName.weekNumber === week) {
        return weekName;
      }
    }

    return null;
  }

  getKeyName(week: number): string {
    for(let weekName of this.weekNames) {
      if(weekName.weekNumber === week) {
        return "" + weekName.id;
      }
    }

    return "newWeek";
  }

  ngAfterViewChecked(): void {
    let shown: ElementRef<HTMLInputElement> = this.inputs.find(input => !!input);
    if(shown) {
      shown.nativeElement.focus();
    }
  }
}
