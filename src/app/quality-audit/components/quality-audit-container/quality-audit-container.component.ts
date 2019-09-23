import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Batch} from "../../../domain/model/batch.dto";
import {AssessBatchService} from "../../../services/assess-batch.service";
import {ChronoService} from "../../../services/subvertical/util/chrono.service";
import {BatchService} from "../../../services/subvertical/batch/batch.service";

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
    private chronoService: ChronoService,
    private batchService: BatchService
  ) {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedQuarter = this.chronoService.getQuarterFromDate(date);
    this.yearSubject = new BehaviorSubject(this.selectedYear);
    this.quarterSubject = new BehaviorSubject(this.selectedQuarter);
  }

  ngOnInit() {
    this.chronoService.getValidYears().toPromise().then(data => {
      this.years = data;
    });

    combineLatest(this.yearSubject.asObservable(), this.quarterSubject.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([year, quarter]) => {
        if (year && quarter) {
          this.batches$ = this.batchService.getBatchesByYearAndQuarter(year, quarter);
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

}
