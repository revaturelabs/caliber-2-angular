import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {ReportsService} from "../../../services/reports.service";
import {Observable} from "rxjs";
import {QcNote} from "../../../domain/model/qc-note.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Label} from "ng2-charts";
import {GradeComparisonDto} from "../../../domain/dto/grade-comparison.dto";
import {fadeInOut} from "../../../app.animations";

@Component({
  selector: 'app-qc-scores',
  templateUrl: './qc-scores.component.html',
  styleUrls: ['./qc-scores.component.css'],
  animations: [fadeInOut]
})
export class QcScoresComponent implements OnInit, OnChanges {

  @Input('batch') batch: Batch;
  @Input('trainees') trainees$: Observable<Trainee[]>;
  @Input('selectedWeek') week: number;
  @Input('trainee') trainee: Trainee;
  private readonly baseClass: string = "fa fa-2x qc-feedback ";
  batchGradesForWeek$: Observable<GradeComparisonDto> = this.reportsService.getBatchGradesToCompareForWeeklyAssessmentBreakdownComponent();
  showWeeklyAnalysis: boolean = false;
  qcBatchNotes$: Observable<QcNote[]>;
  qcTraineeNotes$: Observable<QcNote[]>;

  readonly chartType: string = 'doughnut';
  readonly barChartType: string = 'bar';

  readonly superstarBackgroundColor = 'rgba(57, 63, 239, 1)';
  readonly goodBackgroundColor = 'rgba(24, 173, 24, 1)';
  readonly averageBackgroundColor = 'rgba(249, 233, 0, 1)';
  readonly poorBackgroundColor = 'rgba(234, 40, 37, 1)';

  readonly superstarHoverColor = 'rgba(57, 63, 239, .7)';
  readonly goodHoverColor = 'rgba(24, 173, 24, .7)';
  readonly averageHoverColor = 'rgba(249, 233, 0, .7)';
  readonly poorHoverColor = 'rgba(234, 40, 37, .7)';

  readonly chartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: "label"
    }
  };

  readonly barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: "label",
      callbacks: {
        title(item: Chart.ChartTooltipItem[], data: Chart.ChartData): string | string[] {
          const score: number = Number.parseFloat(`${item[0].yLabel}`);
          return `${(score / 100).toLocaleString("en-US", {style: 'percent', maximumFractionDigits: 2})}`;
        }
      }
    },
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

  readonly doughnutColors = [
    {
      hoverBackgroundColor: [
        this.poorHoverColor,
        this.averageHoverColor,
        this.goodHoverColor,
        this.superstarHoverColor,
      ],
      backgroundColor: [
        this.poorBackgroundColor,
        this.averageBackgroundColor,
        this.goodBackgroundColor,
        this.superstarBackgroundColor,
      ]
    }
  ];

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
    if (this.batch && this.batch.batchId > 0) {
      this.qcTraineeNotes$ = this.reportsService.getIndividualQcNotesByBatchId(this.batch.batchId);
      this.qcBatchNotes$ = this.reportsService.getAllBatchQcNotes(this.batch.batchId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'week' && !change.isFirstChange()) {
        if (change.previousValue === 0 && change.currentValue > 0) {
          this.showWeeklyAnalysis = true;
        } else if (change.previousValue > 0 && change.currentValue === 0) {
          this.showWeeklyAnalysis = false;
        }
      } else if (prop === 'trainee' && !change.isFirstChange()) {
        // if (change.currentValue) {
        //   this.reportsService.getIndividualQcNotesByBatchId(this.batch.batchId).subscribe(
        //     data => this.qcNotes$.next(data.filter(note => note.traineeId === change.currentValue.traineeId))
        //   )
        // } else {
        //   this.reportsService.getIndividualQcNotesByBatchId(this.batch.batchId).subscribe(
        //     data => this.qcNotes$.next(data)
        //   )
        // }
      }
    }
  }


  getQcResult(qcNotes: QcNote[], traineeId: number, week: number): string {
    if (traineeId > 0 && week > 0 && qcNotes && qcNotes.length > 0) {
      const found = qcNotes.find(note => note.traineeId === traineeId && note.week === week);
      if (found) {
        return this.getIconClassForQcResult(found.technicalStatus);
      }
    }
    return 'N/A';
  }

  getWeeklyQcChartData(qcNotes: QcNote[]): ChartDataSets[] {
    const scores = this.initScoresObject();
    if (this.week > 0 && qcNotes && qcNotes.length > 0) {
      const thisWeeksNotes = qcNotes.filter(note => note.week === this.week && note.technicalStatus !== 'Undefined');
      thisWeeksNotes.forEach(note => scores[note.technicalStatus]++);
      return [
        {
          data: Object.keys(scores).map(score => scores[score])
        }
      ]
    }
  }

  getWeeklyQcChartLabels(): Label[] {
    return ["Poor", "Average", "Good", "Superstar"]
  }

  getBarChartLabels(grade: GradeComparisonDto): Label[] {
    if (grade && grade.restOfBatchGrades && Object.keys(grade.restOfBatchGrades).length > 0) {
      return Object.keys(grade.restOfBatchGrades).map(assessmentType => assessmentType);
    }
  }

  getBarChartData(grade: GradeComparisonDto): ChartDataSets[] {
    if (grade && grade.restOfBatchGrades && Object.keys(grade.restOfBatchGrades).length > 0) {
      return [
        {
          data: Object.keys(grade.restOfBatchGrades).map(assessmentType => grade.restOfBatchGrades[assessmentType]),
          label: `Week ${this.week}`
        }
      ]
    }
  }

  getQcStatusCountByType(qcNotes: QcNote[]): number[] {
    const scores = this.initScoresObject();
    if (this.week > 0 && qcNotes && qcNotes.length > 0) {
      const thisWeeksNotes = qcNotes.filter(note => note.week === this.week && note.technicalStatus !== 'Undefined');
      thisWeeksNotes.forEach(note => scores[note.technicalStatus]++);
      return Object.keys(scores).map(score => scores[score]);
    }
  }

  getBatchWeeks(): number[] {
    if (this.batch) {
      const weeks = [];
      for (let i = 1; i <= this.batch.weeks; i++) {
        weeks.push(i);
      }
      return weeks;
    }
    return [];
  }

  getIconClassForQcResult(technicalStatus: string): string {
    if (technicalStatus === undefined) {
      return `${this.baseClass} fa-question-circle`;
    }
    switch (technicalStatus) {
      case "Undefined":
        return `${this.baseClass} fa-question-circle`;
      case "Poor":
        return `${this.baseClass} fa-frown`;
      case "Average":
        return `${this.baseClass} fa-meh`;
      case "Good":
        return `${this.baseClass} fa-smile`;
      case "Superstar":
        return `${this.baseClass} fa-star`
    }
  }

  private initScoresObject(): any {
    return {
      "Poor": 0,
      "Average": 0,
      "Good": 0,
      "Superstar": 0
    }
  }
}
