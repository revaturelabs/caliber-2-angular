import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {ReportsService} from "../../../services/reports.service";
import {Observable} from "rxjs";
import {SpiderGraphDto} from "../../../domain/dto/spider-graph.dto";
import {Label} from "ng2-charts";
import {ChartDataSets, RadialChartOptions} from "chart.js";
import {Trainee} from "../../../domain/model/trainee.dto";

@Component({
  selector: 'app-technical-status',
  templateUrl: './technical-status.component.html',
  styleUrls: ['./technical-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalStatusComponent implements OnInit {

  @Input('batch') batch: Batch;
  @Input('trainee') trainee: Trainee;
  allBatchGrades$: Observable<SpiderGraphDto[]> = this.reportsService.getSpiderGraphData();

  readonly radarChartOptions: RadialChartOptions = {
    // Sets auto resizing of graph, true by default.
    responsive: true,
    // This tooltips block controls the hover tooltip for data points on the graph. This should be the default
    // functionality of chart.js, but an issue in version 2.8.0 causes it to not display the value properly.
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function(tooltipItems, data) {
          const percent = Number.parseFloat(tooltipItems.yLabel.toString()) / 100;
          return 'Score: ' + percent.toLocaleString("en-US", { style: 'percent', maximumFractionDigits: 2});
        },
      },
    },
    // Controls the graph scaling and step size.
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 10,
        max: 100,
        suggestedMin: 40,
      },
    },
  };

  readonly chartType: string = 'radar';

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    if (this.batch && this.batch.batchId) {
      this.reportsService.setSpiderGraphData(this.batch.batchId);
    }
  }

  getChartLabels(data: SpiderGraphDto[]): Label[] {
    if (data && data.length > 0) {
      return data.map(dto => dto.assessmentType);
    }
  }

  getChartDatasets(data: SpiderGraphDto[]): ChartDataSets[] {
    if (data && data.length > 0) {
      const grades = data.map(dto => dto.score);
      return [
        {
          data: grades,
          label: `${this.batch.skillType}`,
          backgroundColor: 'rgba(114, 164, 194, .5)',
          borderColor: 'rgba(114, 164, 194, 1)',
          pointBackgroundColor: 'rgba(114, 164, 194, 1)',
          pointHoverRadius: 0,
          pointHitRadius: 0
        }
      ];
    }
  }

  getTraineeTableData(data: SpiderGraphDto[], traineeId: number, assessmentType: string): number {
    if (data && data.length > 0) {
      return data.find(dto => dto.traineeId === traineeId && dto.assessmentType === assessmentType).score;
    }
  }

  getTraineeLabels(data: SpiderGraphDto[], traineeId: number) {
    if (data && data.length > 0) {
      return data.filter(dto => dto.traineeId === traineeId).map(dto => dto.assessmentType);
    }
  }

  getBatchAverageTableData(data: SpiderGraphDto[], traineeId: number, assessmentType: string): number {
    if (data && data.length > 0) {
      const batchGrades = data.filter(dto => dto.traineeId === -1 && dto.assessmentType === assessmentType);
      return batchGrades.reduce((acc, dto) => acc + dto.score, 0) / batchGrades.length;
    }
  }


  getChartDatasetsWithTrainee(data: SpiderGraphDto[], traineeId: number): ChartDataSets[] {
    if (data && data.length > 0) {
      const scores: Map<string, number[]> = new Map<string, number[]>();
      data.filter(dto => dto.traineeId !== traineeId).map(dto => {
        if (scores.has(dto.assessmentType)) {
          scores.get(dto.assessmentType).push(dto.score);
        } else {
          scores.set(dto.assessmentType, [dto.score]);
        }
      });
      const allBatchGrade: number[] = Array.from(scores.keys()).map(assessmentType => {
        const tempScores = scores.get(assessmentType);
        return tempScores.reduce((acc, score) => acc + score, 0) / tempScores.length;
      });
      const traineeScores = data.filter(dto => dto.traineeId === traineeId).map(dto => dto.score);
      return [
        {
          data: allBatchGrade,
          label: `${this.batch.skillType}`,
          backgroundColor: 'rgba(114, 164, 194, .5)',
          borderColor: 'rgba(114, 164, 194, 1)',
          pointBackgroundColor: 'rgba(114, 164, 194, 1)',
          pointHoverRadius: 0,
          pointHitRadius: 0
        },
        {
          data: traineeScores,
          label: `${this.trainee.name}`,
          backgroundColor: "yellow",
          pointHoverRadius: 0,
          pointHitRadius: 0
        }
      ];
    }
  }
}
