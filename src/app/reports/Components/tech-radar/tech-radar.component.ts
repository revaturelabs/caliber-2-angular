import { Batch } from 'src/app/Batch/type/batch';
import { Category } from './../../../Assess-Batch/Models/Category';
import { Assessment } from './../../../Assess-Batch/Models/Assesment';
import { Trainee } from './../../../Batch/type/trainee';
import { Grade } from 'src/app/Batch/type/trainee';
import { ReportOutput } from './../../Models/report-output';
import { Component, OnInit } from '@angular/core';
import { Chart, RadialChartOptions, ChartDataSets, ChartType, ChartColor } from 'chart.js';
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
  batchDataStore: Batch[];
  gradeAverages: number[] = [];
  labelsAndAverages: any[] = [];

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        stepSize: 20,
        max: 100,
        min: 0,
      }
    }
  };
  public radarChartLabels: Label[] = [];


  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40],
      // specified the first color, after this it is randomized
      label: 'default',
      backgroundColor: ['rgba(71, 163, 209, 0.3)'],
      borderColor: ['lightblue'],
      pointBorderColor:['lightblue'],
      pointBackgroundColor:['lightblue']},
    //{ data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
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
    console.log('Grade Data: ');
    console.log(this.gradeDataStore);
    console.log('Category Data: ');
    console.log(this.categoryDataStore);
    console.log('Trainee Data: ');
    console.log(this.traineeDataStore);
    console.log('Assessment Data: ');
    console.log(this.assessmentDataStore);

    console.log('Filling data arrays:');
    // Filling data arrays
    let categoryCount: number[] = [];
    let categoryTotal: number[] = [];
    for(let i = 0; i < this.categoryDataStore.length; i++){
      categoryCount.push(0);
      categoryTotal.push(0);
      for(let k = 0; k < this.assessmentDataStore.length; k++){
        // console.log("this.assessmentDataStore.assesmenttype = " + this.assessmentDataStore[k].assessmentCategory);
        // console.log("i = " + i);

        if(+this.assessmentDataStore[k].assessmentCategory === i){
          for(let j = 0; j < this.gradeDataStore.length; j++){
            // console.log("this.gradeDateStore = " + this.gradeDataStore[j].assessmentId)
            // console.log("this.assessmentDataStore = " + this.assessmentDataStore[i].assessmentId);

            if(this.gradeDataStore[j].assessmentId === this.assessmentDataStore[k].assessmentId){
              categoryTotal[i] += this.gradeDataStore[j].score;
              categoryCount[i] += 1;
              // console.log('Printing scores for category 1 and GradeID: ');
              // if(this.assessmentDataStore[i].assessmentCategory === 1) {
              //   console.log(this.gradeDataStore[j].score + ' GradeID: ' + this.gradeDataStore[j].gradeId);
              // }
            }
          }
        }  
      }
    }

    console.log('Category Count ' + categoryCount);
    console.log('Category Totals ' + categoryTotal);

    console.log('Filling average array');
    let categoryAverages: number[] = [];
    let averageIndex: number[] = [];
    for(let i = 0; i < categoryCount.length; i++){
      if(categoryCount[i] !== 0) {
        categoryAverages.push(+(categoryTotal[i] / categoryCount[i]).toFixed(2));
        averageIndex.push(i);
      }
    }

    console.log('Printing the category names for this batch:');
    for (let i = 0; i < averageIndex.length; i++) {
      console.log(this.categoryDataStore[averageIndex[i]].skillCategory);
      this.radarChartLabels[i] = this.categoryDataStore[averageIndex[i]].skillCategory;
      this.radarChartData[0].data[i] = categoryAverages[i];
    }
    console.log('Averages' + categoryAverages);
    console.log('Indices: ' + averageIndex);

    for (var i = 0; i < this.radarChartLabels.length; i++) {
      this.labelsAndAverages.push({
        label: this.radarChartLabels[i],
        data: this.radarChartData[0].data[i],
      });
    }
    this.radarChartData[0].label = this.reportService.getBatch().trainingName;
  }
}
