import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {Observable} from "rxjs";
import {SpiderGraphDto} from "../../../domain/dto/spider-graph.dto";
import {ReportsService} from "../../../services/reports.service";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Label} from "ng2-charts";
import {Trainee} from "../../../domain/model/trainee.dto";

@Component({
  selector: 'app-weekly-progress',
  templateUrl: './weekly-progress.component.html',
  styleUrls: ['./weekly-progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyProgressComponent implements OnInit {

  @Input('trainee') trainee: Trainee;
  @Input('batch') batch: Batch;
  allBatchGrades$: Observable<SpiderGraphDto[]> = this.reportsService.getSpiderGraphData();

  readonly chartType: string = 'line';
  readonly chartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: "label",
      callbacks: {
        label: function (tooltipItems, data) {
          const percent = Number.parseFloat(tooltipItems.yLabel.toString()) / 100;
          return 'Score: ' + percent.toLocaleString("en-US", { style: 'percent', maximumFractionDigits: 2});
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

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
  }

  getChartLabels(data: SpiderGraphDto[]): Label[] {
    if (data && data.length > 0) {
      const sorted = data.sort((a, b) => a.week - b.week);
      return sorted.map(dto => dto.assessmentType);
    }
  }

  getTraineeChartLabels(data: SpiderGraphDto[], traineeId: number): Label[] {
    if (data && data.length > 0) {
      const sorted = data.filter(dto => dto.traineeId === traineeId).sort((a, b) => a.week - b.week);
      return sorted.map(dto => dto.assessmentType);
    }
  }

  getChartDatasets(data: SpiderGraphDto[]): ChartDataSets[] {
    if (data && data.length > 0) {
      const sorted = data.sort((a, b) => a.week - b.week);

      return [
        {
          data: sorted.map(dto => dto.score),
          label: `${this.batch.skillType}`,
          backgroundColor: 'rgba(114, 164, 194, .5)',
          borderColor: 'rgba(114, 164, 194, 1)',
          pointBackgroundColor: 'rgba(114, 164, 194, 1)',
          pointHoverRadius: 0,
          pointHitRadius: 0
        }
      ]
    }
  }

  getTraineeChartDatasets(data: SpiderGraphDto[], traineeId: number): ChartDataSets[] {
    if (data && data.length > 0) {
      const sorted = data.sort((a, b) => a.week - b.week);
      const traineeGrades = sorted.filter(dto => dto.traineeId === traineeId);
      const batchGrades = sorted.filter(dto => dto.traineeId !== traineeId);
      return [
        {
          data: batchGrades.map(dto => dto.score),
          label: `${this.batch.skillType}`,
          backgroundColor: 'rgba(114, 164, 194, .5)',
          borderColor: 'rgba(114, 164, 194, 1)',
          pointBackgroundColor: 'rgba(114, 164, 194, 1)',
          pointHoverRadius: 0,
          pointHitRadius: 0
        },
        {
          data: traineeGrades.map(dto => dto.score),
          label: `${this.trainee.name}`,
          backgroundColor: 'yellow',
          pointHoverRadius: 0,
          pointHitRadius: 0
        }
      ]
    }
  }

  getBatchWeeks(batch: Batch): number[] {
    if (batch && batch.weeks > 0) {
      const weeks = [];
      for (let i = 1; i <= batch.weeks; i++) {
        weeks.push(i);
      }
      return weeks;
    }
  }

  getAverageGrade(week: number, data: SpiderGraphDto[]): number {
    if (week > 0 && data && data.length > 0) {
      const grades = data.filter(dto => dto.week === week);
      return grades.reduce((acc, grade) => acc + grade.score, 0) / grades.length;
    }
  }
}
