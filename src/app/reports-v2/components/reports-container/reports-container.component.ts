import {Component, OnInit} from '@angular/core';
import {ReportsService} from "../../../services/reports.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Batch} from "../../../domain/model/batch.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Benchmark} from "../../../domain/dto/benchmark.dto";
import {onReportTransition} from "../../../app.animations";

@Component({
  selector: 'app-reports-container',
  templateUrl: './reports-container.component.html',
  styleUrls: ['./reports-container.component.css'],
  animations: [onReportTransition]
})
export class ReportsContainerComponent implements OnInit {

  selectedYear: number = this.reportsService.getCurrentYear();
  private selectedBatchSubject$: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);
  private traineesForSelectedBatchSubject$: BehaviorSubject<Trainee[]> = new BehaviorSubject<Trainee[]>(undefined);
  private selectedYearSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private selectedWeekSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private benchmarkSubject$: BehaviorSubject<Benchmark> = new BehaviorSubject<Benchmark>(undefined);
  private selectedTraineeSubject$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);
  private weeksSubject$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(undefined);

  selectedBatch$: Observable<Batch> = this.selectedBatchSubject$.asObservable();
  traineesForSelectedBatch$: Observable<Trainee[]> = this.traineesForSelectedBatchSubject$.asObservable();
  selectedWeek$: Observable<number> = this.selectedWeekSubject$.asObservable();
  benchmark$: Observable<Benchmark> = this.benchmarkSubject$.asObservable();
  selectedTrainee$: Observable<Trainee> = this.selectedTraineeSubject$.asObservable();
  weeks$: Observable<number[]> = this.weeksSubject$.asObservable();
  private benchmarkSubscription: Subscription;

  weeks: number[] = [];


  years$: Observable<number[]>;
  batchesThisYear$: Observable<Batch[]>;

  constructor(
    private reportsService: ReportsService
  ) {
    this.years$ = this.reportsService.getAllYears();
  }

  ngOnInit() {
    this.batchesThisYear$ = this.reportsService.getBatchesByYear(this.selectedYear);
    this.selectedYearSubject$.asObservable().subscribe(
      year => {
        if (year) {
          this.batchesThisYear$ = this.reportsService.getBatchesByYear(this.selectedYear);
        }
      }
    )
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.selectedYearSubject$.next(year);
    this.selectedBatchSubject$.next(undefined);
    this.traineesForSelectedBatch$ = undefined;
  }

  selectBatch(batch: Batch) {
    this.selectedBatchSubject$.next(batch);
    if (batch) {
      this.traineesForSelectedBatch$ = this.reportsService.getTraineesByBatchId(batch.batchId);
      this.selectedTraineeSubject$.next(undefined);
      this.benchmarkSubscription = this.reportsService.getBenchmarkForBatch(batch.batchId).subscribe(
        benchmark => this.benchmarkSubject$.next(benchmark)
      );
      this.weeksSubject$.next(this.getWeeksForBatch(batch));
    } else {
      this.traineesForSelectedBatchSubject$.next(undefined);
      this.benchmarkSubject$.next(undefined);
      this.selectedTraineeSubject$.next(undefined);
    }
  }

  selectWeek(week: number) {
    this.selectedWeekSubject$.next(week);
  }

  selectTrainee(trainee: Trainee) {
    this.selectedTraineeSubject$.next(trainee);
  }

  private getWeeksForBatch(batch: Batch): number[] {
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
