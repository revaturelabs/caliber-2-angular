import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {AssessBatchService} from "../../../Assess-Batch/Services/assess-batch.service";
import {distinctUntilChanged} from "rxjs/operators";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-quality-audit-container',
  templateUrl: './quality-audit-container.component.html',
  styleUrls: ['./quality-audit-container.component.css']
})
export class QualityAuditContainerComponent implements OnInit {

  years: number[];
  readonly quarters: number[] = [1, 2, 3, 4];
  batches$: Observable<Batch[]>;
  selectedYear: number;
  selectedQuarter: number;
  selectedBatch: Batch;
  selectedWeek: number;

  private yearSubject: BehaviorSubject<number>;
  private quarterSubject: BehaviorSubject<number>;

  constructor(
    private assessBatchService: AssessBatchService
  ) {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedQuarter = this.getQuarterFromDate(date);
    this.yearSubject = new BehaviorSubject(this.selectedYear);
    this.quarterSubject = new BehaviorSubject(this.selectedQuarter);
  }

  ngOnInit() {
    this.assessBatchService.getAllYears().toPromise().then(data => {
      this.years = data;
    });

    combineLatest(this.yearSubject.asObservable(), this.quarterSubject.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([year, quarter]) => {
        if (year && quarter) {
          this.batches$ = this.assessBatchService.getBatchesByYearAndQuarter(year, quarter);
          this.selectedBatch = undefined;
        }
      }
    )
  }

  setSelectedQuarter(quarter: number) {
    this.selectedQuarter = quarter;
    this.quarterSubject.next(quarter);
  }

  setSelectedYear(year: number) {
    this.selectedYear = year;
    this.yearSubject.next(year);
  }

  setSelectedBatch(batch: Batch) {
    this.selectedBatch = batch;
  }

  setSelectedWeek(week: number) {
    this.selectedWeek = week;
  }

  private getQuarterFromDate(date: Date): number {
    const month = date.getMonth();
    if (month >= 0 && month < 3) {
      return 1;
    } else if (month >=3 && month < 6) {
      return 2;
    } else if (month >= 6 && month < 9) {
      return 3;
    } else if (month >= 9 && month < 12) {
      return 4;
    }
  }

}
