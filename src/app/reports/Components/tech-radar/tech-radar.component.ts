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

  /* The following arrays are used for the configuration and data storage
     of the radar chart and must be given to the <canvas> element. */
  public radarChartOptions: RadialChartOptions = {
    // tooltips: {
    //   callbacks: {
    //     title: (items, data) => data.datasets[items[0].datasetIndex].data[items[0].index].myProperty1,
    //     label: (item, data) => data.datasets[item.datasetIndex].data[item.index].myProperty2
    //   }
    // },
    tooltips: {
      mode: 'index'
    },
    responsive: true,
    legend: {
      display: true,
    },
    scale: {
      ticks: {
        beginAtZero: false,
        stepSize: 10,
        max: 100,
        suggestedMin: 40,
      }
    }
  };
  public radarChartLabels: Label[] = [];
  public radarChartData: ChartDataSets[] = [
    { data: [],
      // Specifies the first color, after this it is "randomized"
      label: 'default',
      backgroundColor: ['rgba(71, 163, 209, 0.3)'],
      borderColor: ['rgba(71, 163, 209, 0.6)'],
      pointBorderColor:['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
      pointBackgroundColor: ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue',
                             'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
      pointHoverBackgroundColor:['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue',
                                 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
      pointHoverBorderColor:[''],
    },
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

  // This method is called by the toolbar each time data is pulled.
  // It manages the data being presented in the radar chart.
  public updateDataPull() {
    // Getting new data.
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

    console.log('Resetting chart and table');
    this.radarChartData[0].data = [];
    this.radarChartLabels = [];
    this.labelsAndAverages = [];

    console.log('Filling data arrays:');
    /* Filling data */

    // An array representing the categories of evaluation. The index matches the category's index found in categoryDataStore.
    // The values represent the number evaluations of those subjects to be found in gradeDataStore.
    let categoryCount: number[] = [];
    // An array which holds the sum of all scores to be found in each category. Index matches categoryDataStore index.
    let categoryTotal: number[] = [];

    // Looping through each category (Java, SQL, etc.) of evaluation.
    // These categories represent a single week's primary subject, even if that week's curriculum consists of multiple subjects
    for (let i = 0; i < this.categoryDataStore.length; i++) {
      categoryCount.push(0);
      categoryTotal.push(0);

      // Looping through each assessment
      for (let k = 0; k < this.assessmentDataStore.length; k++) {

        // If an assessment is on the category we are checking for, then want to get its scores.
        if (+this.assessmentDataStore[k].assessmentCategory === i) {

          // Loop through grades to find scores matching tied to the assessment's ID.
          for (let j = 0; j < this.gradeDataStore.length; j++) {
            // console.log("this.gradeDateStore = " + this.gradeDataStore[j].assessmentId)
            // console.log("this.assessmentDataStore = " + this.assessmentDataStore[i].assessmentId);

            // If a match is found, add the score and increment our count.
            if (this.gradeDataStore[j].assessmentId === this.assessmentDataStore[k].assessmentId) {
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
    const categoryAverages: number[] = [];
    const averageIndex: number[] = [];
    for(let i = 0; i < categoryCount.length; i++){
      if(categoryCount[i] !== 0) {
        categoryAverages.push(+(categoryTotal[i] / categoryCount[i]).toFixed(2));
        averageIndex.push(i);
      }
    }

    console.log('Printing the category names for this batch:');
    for (let i = 0; i < averageIndex.length; i++) {
      console.log(this.categoryDataStore[averageIndex[i] - 1].skillCategory);
      this.radarChartLabels[i] = this.categoryDataStore[averageIndex[i] - 1].skillCategory;
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
    this.radarChartData[0].label = '';
    this.radarChartData[0].label = this.reportService.getBatch().trainingName;
    console.log(this.radarChartData[0].label);
    console.log('Printing getWeek(): ');
    console.log(this.reportService.getWeek());

    /* This block of code was used to validate that scores and
       grades were matching
    */
    // let dataValidation: number[] = [];
    // let ValidationTotal: number = 0;
    // for (let i = 0; i < this.assessmentDataStore.length; i++) {
    //   if(this.assessmentDataStore[i].assessmentCategory == 1) {
    //     console.log(this.assessmentDataStore[i].assessmentId);
    //     dataValidation.push(this.assessmentDataStore[i].assessmentId);
    //     for(let j = 0; j<this.gradeDataStore.length; j++){
    //       if(this.assessmentDataStore[i].assessmentId == this.gradeDataStore[j].assessmentId){
    //         console.log(this.gradeDataStore[j].score);
    //         ValidationTotal += this.gradeDataStore[j].score;
    //         //console.log(ValidationTotal);
    //       }
    //     }
    //   }
    // }
  }


}
