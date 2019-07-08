import { Batch } from 'src/app/Batch/type/batch';
import { Category } from './../../../Assess-Batch/Models/Category';
import { Assessment } from './../../../Assess-Batch/Models/Assesment';
import { Trainee } from './../../../Batch/type/trainee';
import { Grade } from 'src/app/Batch/type/trainee';
import { Component, OnInit } from '@angular/core';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
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
  labelsAndAverages: any[] = [];

  /* The following arrays are used for the configuration and data storage
     of the radar chart and must be given to the <canvas> element. */
  public radarChartOptions: RadialChartOptions = {
    // This tooltips block controls the hover tooltip for data points on the graph. This should be the default
    // functionality of chart.js, but an issue in version 2.8.0 causes it to not display the value properly.
    tooltips: {
      callbacks: {
        label: function(tooltipItems, data) {
            return 'Score: ' + tooltipItems.yLabel;
        },
      },
    },
    // Controls the graph scaling and step size.
    scale: {
      ticks: {
        beginAtZero: false,
        stepSize: 10,
        max: 100,
        suggestedMin: 40,
      }
    }
  };
  // This array represents the labels 
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
  ];
  public radarChartType: ChartType = 'radar';

  constructor(private reportService: ReportService) {
   }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  // This method is called by the toolbar component each time data is pulled.
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

    // Resetting chart
    this.radarChartData[0].data = [];
    this.radarChartLabels = [];
    this.labelsAndAverages = [];

    /* Filling data */
    // An array representing the categories of evaluation. The index matches the category's index found in categoryDataStore.
    // The values represent the number evaluations of those subjects to be found in gradeDataStore.
    let categoryCount: number[] = [];
    // An array which holds the sum of all scores to be found in each category. Index matches categoryDataStore index.
    let categoryTotal: number[] = [];

    let studentScores: any[] = [];

    // Looping through each category (Java, SQL, etc.) of evaluation.
    // These categories represent a single week's primary subject, even if that week's curriculum consists of multiple subjects.
    for (let i = 0; i < this.categoryDataStore.length; i++) {
      categoryCount.push(0);
      categoryTotal.push(0);

      // Looping through each assessment
      for (let k = 0; k < this.assessmentDataStore.length; k++) {

        // If an assessment is on the category we are checking for, then want to get its scores.
        if (+this.assessmentDataStore[k].assessmentCategory === i) {

          // Loop through grades to find scores matching tied to the assessment's ID.
          for (let j = 0; j < this.gradeDataStore.length; j++) {

            // If a match is found, add the score and increment our count.
            if (this.gradeDataStore[j].assessmentId === this.assessmentDataStore[k].assessmentId) {
              categoryTotal[i] += this.gradeDataStore[j].score;
              categoryCount[i] += 1;

              if (studentScores.keys.traineeId !== undefined) {
                studentScores[j][this.gradeDataStore[j].traineeId] += this.gradeDataStore[j].score;
              } else {
              studentScores.push({[this.gradeDataStore[j].traineeId]: this.gradeDataStore[j].score});
              }
            }
          }
        }
      }
    }
    console.log('studentScores:');
    console.log(studentScores);
    // Calculate average score for the categories.
    const categoryAverages: number[] = [];
    const averageIndex: number[] = [];
    for (let i = 0; i < categoryCount.length; i++){
      if (categoryCount[i] !== 0) {
        categoryAverages.push(+(categoryTotal[i] / categoryCount[i]).toFixed(2));
        averageIndex.push(i);
      }
    }

    // Set the data being shown on chart.
    for (let i = 0; i < averageIndex.length; i++) {
      this.radarChartLabels[i] = this.categoryDataStore[averageIndex[i] - 1].skillCategory;
      this.radarChartData[0].data[i] = categoryAverages[i];
    }

    // Set the values being printed on the chart's table.
    for (let i = 0; i < this.radarChartLabels.length; i++) {
      this.labelsAndAverages.push({
        label: this.radarChartLabels[i],
        data: this.radarChartData[0].data[i],
      });
    }

    // Set the chart's title.
    this.radarChartData[0].label = this.reportService.getBatch().trainingName;
  }
}
