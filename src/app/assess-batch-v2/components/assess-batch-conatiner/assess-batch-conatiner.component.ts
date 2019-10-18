import {Component, OnDestroy, OnInit} from '@angular/core';

import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Batch} from "../../../domain/model/batch.dto";
import {AssessBatchService} from "../../../services/assess-batch.service";

@Component({
  selector: 'app-assess-batch-conatiner',
  templateUrl: './assess-batch-conatiner.component.html',
  styleUrls: ['./assess-batch-conatiner.component.css']
})
export class AssessBatchConatinerComponent implements OnInit, OnDestroy {

  years: number[];
  readonly quarters: number[] = [1, 2, 3, 4];
  batches: Observable<Batch[]>;
  selectedYear: number;
  selectedQuarter: number;
  selectedBatch: Batch;
  selectedWeek: number;

  private yearSubject: BehaviorSubject<number>;
  private quarterSubject: BehaviorSubject<number>;

  private allBatchesThisYearAndQuarterSubscription: Subscription;

  constructor(
    private assessBatchService: AssessBatchService,
  ) {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedQuarter = this.assessBatchService.getQuarterFromDate();
    this.yearSubject = new BehaviorSubject(this.selectedYear);
    this.quarterSubject = new BehaviorSubject(this.selectedQuarter);
  }

  ngOnInit() {
    this.assessBatchService.getValidYears().subscribe(
      data => {
        this.years = data;
      }, err => {
        alert("Ya done goofed. Check the logs");
        console.log(err);
      }
    );

    combineLatest(this.yearSubject.asObservable(), this.quarterSubject.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([year, quarter]) => {
        this.batches = this.assessBatchService.getBatchesByYearAndQuarter(year, quarter);

        this.allBatchesThisYearAndQuarterSubscription = this.batches.subscribe(
          batches => {
            // Never select a batch on batch load
            this.selectedBatch = undefined;
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.allBatchesThisYearAndQuarterSubscription.unsubscribe();
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
