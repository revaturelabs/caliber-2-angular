import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Batch} from "../../../domain/model/batch.dto";
import {ReportsService} from "../../../services/reports.service";
import {BatchGradeDto} from "../../../domain/dto/batch-grade.dto";
import {GradeComparisonDto} from "../../../domain/dto/grade-comparison.dto";
import {Label} from "ng2-charts";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Benchmark} from "../../../domain/dto/benchmark.dto";
import {fadeInOut} from "../../../app.animations";

@Component({
  selector: 'app-compare-assessment-scores',
  templateUrl: './compare-assessment-scores.component.html',
  styleUrls: ['./compare-assessment-scores.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut]
})
export class CompareAssessmentScoresComponent implements OnInit, OnChanges, OnDestroy {

  @Input('batch') batch: Batch;
  @Input('trainees') trainees$: Observable<Trainee[]>;
  @Input('week') week: number;
  @Input('trainee') trainee: Trainee;
  @Input('benchmark') benchmark: Benchmark;
  batchGradeComparison$: Observable<BatchGradeDto[]> = this.reportsService.getBatchGradeComparison();
  traineeGradeComparison$: Observable<GradeComparisonDto> = this.reportsService.getTraineeGradeComparison();
  showRestOfPage: boolean = false;

  private batchComparisonSubscription: Subscription;
  private individualGradeComparisonSubscription: Subscription;

  readonly chartType: string = 'bar';
  readonly barChartOptions: ChartOptions = {
    tooltips: {
      mode: 'label', //Note: setting mode to label displays all existing labels in a dataset at once. Without this, individual data points will display their own label independently.
      callbacks: {
        title(item: Chart.ChartTooltipItem[], data: Chart.ChartData): string | string[] {
          if (item && item.length === 1) {
            const name: string[] = item[0].label.split(", ");
            const score: number = Number.parseFloat(`${item[0].yLabel}`);
            return `${name[1]} ${name[0]} - ${(score / 100).toLocaleString("en-US", { style: 'percent', maximumFractionDigits: 2 })}`
          }
        },
      },
    },
    responsive: true,
    scales : {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Average'
        },
        ticks: {
          max : 100,
          min : 0,
          stepSize: 20,
          padding: 0,
          backdropPaddingX: 0,
          display: true,
        }
      }],
    },
  };

  readonly barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(114, 164, 194, .5)',
      borderColor: 'rgba(114, 164, 194, 1)',
      pointBackgroundColor: 'rgba(252, 180, 20, .6)',
      pointBorderColor: 'rgba(252, 180, 20, 1)',
      pointHoverBackgroundColor: 'rgba(252, 180, 20, .6)',
      pointHoverBorderColor: 'rgba(252, 180, 20, 1)',
    }
  ];

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    if (this.week === 0) {
      // Overall Comparison for Batch
      if (!Boolean(this.trainee)) {
        this.reportsService.setBatchGradeComparison(this.batch.batchId);
      }
    } else if (this.week > 0) {
      // Comparison for Batch by selected week
      if (!Boolean(this.trainee)) {
        this.reportsService.setBatchGradeComparisonForWeek(this.batch.batchId, this.week);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'batch' && !Boolean(this.trainee)) {
        this.reportsService.setBatchGradeComparison(change.currentValue.batchId);
        this.reportsService.setSpiderGraphData(change.currentValue.batchId);
      } else if (prop === 'week') {
        if (!Boolean(this.trainee)) {
          if (change.currentValue === 0) {
            this.reportsService.setBatchGradeComparison(this.batch.batchId);
          } else if (change.currentValue > 0) {
            this.reportsService.setBatchGradeComparisonForWeek(this.batch.batchId, change.currentValue);
            this.reportsService.setBatchGradesToCompareForWeeklyAssessmentBreakdownComponent(this.batch.batchId, change.currentValue);
          }
        } else {
          this.reportsService.setBatchGradeComparison(undefined);
          if (change.currentValue === 0) {
            this.reportsService.setTraineeToCompareGrades(this.trainee.traineeId);
          } else if (change.currentValue > 0) {
            this.reportsService.setTraineeToCompareGradesOnWeek(this.trainee.traineeId, change.currentValue);
          }
        }
      } else if (prop === 'trainee') {
        if (change.currentValue) {
          this.reportsService.setBatchGradeComparison(undefined);
          this.reportsService.setTraineeToCompareGrades(change.currentValue.traineeId);
          this.reportsService.setSpiderGraphDataWithTrainee(this.batch.batchId, change.currentValue.traineeId);
        } else {
          this.reportsService.setTraineeToCompareGrades(undefined);
          if (this.week === 0 && this.batch) {
            this.reportsService.setBatchGradeComparison(this.batch.batchId);
            this.reportsService.setSpiderGraphData(this.batch.batchId);
          } else if (this.week > 0 && this.batch) {
            this.reportsService.setBatchGradeComparisonForWeek(this.batch.batchId, this.week);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.batchComparisonSubscription) {
      this.batchComparisonSubscription.unsubscribe();
    }
    if (this.individualGradeComparisonSubscription) {
      this.individualGradeComparisonSubscription.unsubscribe();
    }
  }


  getChartLabels(batchGrades: BatchGradeDto[]): Label[] {
    if (batchGrades && batchGrades.length > 0) {
      return batchGrades.map(batchGrade => batchGrade.traineeName);
    }
  }

  getTraineeChartLabel(gradeComparison: GradeComparisonDto): Label[] {
    if (gradeComparison && Object.keys(gradeComparison).length > 0) {
      if (Object.keys(gradeComparison.traineeGrades).length === Object.keys(gradeComparison.restOfBatchGrades).length) {
        const labels: Label[] = [];
        Object.keys(gradeComparison.traineeGrades).forEach(assessmentType => labels.push(assessmentType));
        return labels;
      }
    }
  }

  getChartData(batchGrades: BatchGradeDto[], benchmark: Benchmark): ChartDataSets[] {
    if (benchmark && batchGrades && batchGrades.length > 0) {
      const data = batchGrades.map(batchGrade => batchGrade.average);
      const goodGrades = batchGrades.map(() => benchmark.goodGrade);
      const passingGrades = batchGrades.map(() => benchmark.passingGrade);
      return [
        { data, label: `Overall` },
        { data: goodGrades, label: 'Benchmark', type: "line", fill: false, pointRadius:0, backgroundColor: 'rgba(252, 180, 20, 1)', borderColor: 'rgba(252, 180, 20, 1)', pointBackgroundColor: 'rgba(252, 180, 20, 1)', pointBorderColor: 'rgba(252, 180, 20, 1)', pointHoverBackgroundColor: 'rgba(252, 180, 20, 1)', pointHoverBorderColor: 'rgba(252, 180, 20, 1)'},
        { data: passingGrades, label: 'Passing', type: "line", fill: false, pointRadius:0, backgroundColor: 'rgba(255, 0, 63, 1)', borderColor: 'rgba(255, 0, 63, 1)', pointBackgroundColor: 'rgba(255, 0, 63, 1)', pointBorderColor: 'rgba(255, 0, 63, 1)', pointHoverBackgroundColor: 'rgba(255, 0, 63, 1)', pointHoverBorderColor: 'rgba(255, 0, 63, 1)'}
      ];
    }
  }

  getTraineeChartData(gradeComparison: GradeComparisonDto, benchmark: Benchmark): ChartDataSets[] {
    if (benchmark && gradeComparison && Object.keys(gradeComparison).length && Object.keys(gradeComparison.traineeGrades).length > 0 && Object.keys(gradeComparison.restOfBatchGrades).length > 0 && Object.keys(gradeComparison.restOfBatchGrades).length === Object.keys(gradeComparison.traineeGrades).length) {
      const traineeData = Object.keys(gradeComparison.traineeGrades).map(assessmentType => gradeComparison.traineeGrades[assessmentType]);
      const batchData = Object.keys(gradeComparison.restOfBatchGrades).map(assessmentType => gradeComparison.restOfBatchGrades[assessmentType]);
      const goodGrades: number[] = [];
      const passingGrades: number[] = [];
      const datasets: ChartDataSets[] = [];

      for (let i = 0; i < Object.keys(gradeComparison.traineeGrades).length; i++) {
        goodGrades.push(benchmark.goodGrade);
        passingGrades.push(benchmark.passingGrade);
      }
      goodGrades.push(benchmark.goodGrade);
      passingGrades.push(benchmark.passingGrade);

      datasets.push({ data: traineeData, label: `${this.trainee.name}`});
      datasets.push({ data: batchData, label: `${this.batch.skillType}`});
      datasets.push({ data: goodGrades, label: 'Benchmark', type: "line", fill: false, pointHoverRadius: 0, pointRadius: 0, pointHitRadius: 0, backgroundColor: 'rgba(252, 180, 20, 1)', borderColor: 'rgba(252, 180, 20, 1)', pointBackgroundColor: 'rgba(252, 180, 20, 1)', pointBorderColor: 'rgba(252, 180, 20, 1)', pointHoverBackgroundColor: 'rgba(252, 180, 20, 1)', pointHoverBorderColor: 'rgba(252, 180, 20, 1)'},);
      datasets.push({ data: passingGrades, label: 'Passing', type: "line", fill: false, pointHoverRadius: 0, pointRadius: 0, pointHitRadius: 0, backgroundColor: 'rgba(255, 0, 63, 1)', borderColor: 'rgba(255, 0, 63, 1)', pointBackgroundColor: 'rgba(255, 0, 63, 1)', pointBorderColor: 'rgba(255, 0, 63, 1)', pointHoverBackgroundColor: 'rgba(255, 0, 63, 1)', pointHoverBorderColor: 'rgba(255, 0, 63, 1)'});
      return datasets;
    }
  }

}
