import { Category } from './../../../Assess-Batch/Models/Category';
import { Assessment } from './../../../Assess-Batch/Models/Assesment';
import { Trainee } from './../../../Batch/type/trainee';
import { Grade } from 'src/app/Batch/type/trainee';
import { ReportOutput } from './../../Models/report-output';
import { Component, OnInit } from '@angular/core';
import { Chart, RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportService } from '../../Service/report.service';


// This radar chart is made with ng2-charts, which provides directives to use chart.js more easily.
@Component({
  selector: 'app-tech-radar',
  templateUrl: './tech-radar.component.html',
  styleUrls: ['./tech-radar.component.css']
})
export class TechRadarComponent implements OnInit {
  gradeDataStore: Grade[];
  traineeDataStore: Trainee[];
  assessmentDataStore: Assessment[];
  categoryDataStore: Category[];
  gradeAverages: number[] = [];

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(private reportService: ReportService) {
   }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public updateDataPull(){
    this.gradeDataStore = this.reportService.getGradeDataStore();
    this.categoryDataStore = this.reportService.getCategoryDataStore();
    this.traineeDataStore = this.reportService.getTraineeDataStore();
    this.assessmentDataStore = this.reportService.getAssessmentDataStore();
    console.log('Printing data from updateDataPull() in tech-radar-component: ');
    console.log(this.gradeDataStore);
    console.log(this.categoryDataStore);
    console.log(this.traineeDataStore);
    console.log(this.assessmentDataStore);
  }
}