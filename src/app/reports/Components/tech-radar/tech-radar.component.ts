import { Batch } from 'src/app/Batch/type/batch';
import { Category } from './../../../Assess-Batch/Models/Category';
import { Assessment } from './../../../Assess-Batch/Models/Assesment';
import { Trainee } from './../../../Batch/type/trainee';
import { Grade } from 'src/app/Batch/type/trainee';
import { Component, OnInit } from '@angular/core';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportService } from '../../Service/report.service';
import { forEach } from '@angular/router/src/utils/collection';

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
      pointBorderColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
      pointBackgroundColor: ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue',
                             'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
      pointHoverBackgroundColor: ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue',
                                 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
      pointHoverBorderColor: [''],
    },
  ];
  public radarChartType: ChartType = 'radar';

  constructor(private reportService: ReportService) {
   }

  ngOnInit() {
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
    const categoryCount: number[] = [];
    // An array which holds the sum of all scores to be found in each category. Index matches categoryDataStore index.
    const categoryTotal: number[] = [];

    let studentScores: any = {};

    // Garbage please delete.
    // studentScores.push({[this.gradeDataStore[4].traineeId]: this.gradeDataStore[4].score});
    // console.log('Printing studentScore test:');
    // console.log(studentScores[0]);
    // console.log('Logging this.gradeDataStore[4].score');
    // console.log(this.gradeDataStore[4].traineeId);
    // console.log('Checking if key in studentScores:');
    // console.log(this.gradeDataStore[4].traineeId in studentScores[0]);
    // console.log('Checking if index in studentScores:');
    // console.log(studentScores.indexOf(this.gradeDataStore[4].traineeId));


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

              // console.log('Logging stuff:');
              // console.log(this.gradeDataStore[j]);
              // console.log(studentScores);
              // console.log(this.gradeDataStore[j].traineeId in studentScores);

              if (!(this.gradeDataStore[j].traineeId in studentScores)) {
                studentScores[this.gradeDataStore[j].traineeId] = {};
              }

              // console.log('logging studentScores:');
              // console.log(studentScores[this.gradeDataStore[j].traineeId]);
              // console.log('This:');
              // console.log(this.categoryDataStore[i].skillCategory);
              // console.log('In this:');
              // console.log(studentScores[this.gradeDataStore[j].traineeId]);
              // console.log('T/F: ' + this.categoryDataStore[i].skillCategory in
              // studentScores[this.gradeDataStore[j].traineeId]);
              if (this.categoryDataStore[i].skillCategory in studentScores[this.gradeDataStore[j].traineeId]) {
                console.log('getting here');
                studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i].skillCategory]['totalScore'] += this.gradeDataStore[j].score;
                studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i].skillCategory]['count'] += 1;
              } else {
                studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i].skillCategory] = {
                  totalScore: this.gradeDataStore[j].score,
                  count: 1,
                };
                //studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i].skillCategory]['totalScore'] = this.gradeDataStore[j].score;
                // studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i].skillCategory]['count'] = 1;
              }
            }
          }
        }
      }
    }
    for (let i = 1; i < this.traineeDataStore.length; i++) {
      studentScores[this.traineeDataStore[i].traineeId]['name'] = this.traineeDataStore[i].name;
      studentScores[this.traineeDataStore[i].traineeId]['data'] = [];

      for (const x in studentScores[this.traineeDataStore[i].traineeId]) {
        if (x !== 'name' && x !== 'data') {
          studentScores[this.traineeDataStore[i].traineeId]['data'].
                push((studentScores[this.traineeDataStore[i].traineeId][x]['totalScore'] /
                      studentScores[this.traineeDataStore[i].traineeId][x]['count']).toFixed(2));
        }
      }
    }
    console.log('studentScores:');
    console.log(studentScores[this.traineeDataStore[4].traineeId]['data'][0]);
    // Calculate average score for the categories.
    const categoryAverages: number[] = [];
    const averageIndex: number[] = [];
    for (let i = 0; i < categoryCount.length; i++){
      if (categoryCount[i] !== 0) {
        categoryAverages.push(+(categoryTotal[i] / categoryCount[i]).toFixed(2));
        averageIndex.push(i);
      }
    }

    // Set the overall tech data to be shown on chart.
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
