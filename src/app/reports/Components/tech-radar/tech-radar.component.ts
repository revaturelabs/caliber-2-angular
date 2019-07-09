import { Batch } from 'src/app/Batch/type/batch';
import { Category } from './../../../Assess-Batch/Models/Category';
import { Assessment } from './../../../Assess-Batch/Models/Assesment';
import { Trainee } from './../../../Batch/type/trainee';
import { Grade } from 'src/app/Batch/type/trainee';
import { Component, OnInit } from '@angular/core';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
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
  studentScores: any = {};
  // ng2-charts is capable to automatically providing colors, but we were unable to use that functionality
  colorsArray: any[] = [   'rgba(255, 0, 0, 0.6)',
                           'rgba(0, 255, 0, 0.6)',
                           'rgba(0, 0, 255, 0.6)',
                           'rgba(255, 255, 0, 0.6)',
                           'rgba(255, 0, 255, 0.6)',
                           'rgba(0, 255, 255, 0.6)',
                           'rgba(255, 128, 0, 0.6)',
                           'rgba(0, 255, 191, 0.6)',
                           'rgba(191, 0, 255, 0.6)',
                           'rgba(0, 0, 0, 0.6)',
                          ];

  /* The following arrays are used for the configuration and data storage
     of the radar chart and must be given to the <canvas> element. */
  public radarChartOptions: RadialChartOptions = {
    // Sets auto resizing of graph, true by default.
    responsive: true,
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
      backgroundColor: ['rgba(71, 163, 209, 0.2)'],
      borderColor: ['rgba(71, 163, 209, 0.6)'],
      pointBackgroundColor: [''],
      pointHoverBackgroundColor: [''],
      pointHoverBorderColor: ['']
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

    // Resetting chart
    this.radarChartData[0].data = [];
    this.radarChartData.splice(1);
    this.labelsAndAverages.splice(0);

    /* Filling data */
    // An array representing the categories of evaluation. The index matches the category's index found in categoryDataStore.
    // The values represent the number evaluations of those subjects to be found in gradeDataStore.
    const categoryCount: number[] = [];
    // An array which holds the sum of all scores to be found in each category. Index matches categoryDataStore index.
    const categoryTotal: number[] = [];

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

              if (!(this.gradeDataStore[j].traineeId in this.studentScores)) {
                this.studentScores[this.gradeDataStore[j].traineeId] = {};
              }

              if (this.categoryDataStore[i - 1].skillCategory in this.studentScores[this.gradeDataStore[j].traineeId]) {
                this.studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i - 1].skillCategory]['totalScore'] += this.gradeDataStore[j].score;
                this.studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i - 1].skillCategory]['count'] += 1;
              } else {
                this.studentScores[this.gradeDataStore[j].traineeId][this.categoryDataStore[i - 1].skillCategory] = {
                  totalScore: this.gradeDataStore[j].score,
                  count: 1,
                };
              }
            }
          }
        }
      }
    }
    console.log('Logging some stuff:');
    console.log(this.traineeDataStore);
    for (let i = 1; i < this.traineeDataStore.length; i++) {

      this.studentScores[this.traineeDataStore[i].traineeId]['name'] = this.traineeDataStore[i].name;
      this.studentScores[this.traineeDataStore[i].traineeId]['data'] = [];

      for (const x in this.studentScores[this.traineeDataStore[i].traineeId]) {
        if (x !== 'name' && x !== 'data') {
          this.studentScores[this.traineeDataStore[i].traineeId]['data'].
                push((this.studentScores[this.traineeDataStore[i].traineeId][x]['totalScore'] /
                      this.studentScores[this.traineeDataStore[i].traineeId][x]['count']).toFixed(2));
        }
      }
    }

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

    // Shows data for a specific trainee when one is selected
    if (this.reportService.getTrainee().traineeId !== -1) {
      this.radarChartData.push({
        data: this.studentScores[this.reportService.getTrainee().traineeId]['data'],
        label: this.studentScores[this.reportService.getTrainee().traineeId]['name'],
        backgroundColor: ['rgba(0, 0, 0, 0)'],
        borderColor: this.colorsArray[0],
      });
    }

    // Reset checkboxes on page change
    let elements = document.getElementsByClassName('checkboxCustomClass');
    for (let i = 0 ; i < elements.length ; i++) {
      (elements[i] as HTMLInputElement).checked = false;
    }
  }

  // Handles the updating of chart from modal checkboxes
  checkboxUpdate(values: any) {
    if (values.currentTarget.checked === true) {
      this.radarChartData.push({
        data: this.studentScores[values.currentTarget.name]['data'],
        label: this.studentScores[values.currentTarget.name]['name'],
        backgroundColor: ['rgba(0, 0, 0, 0)'],
        borderColor: this.colorsArray[this.radarChartData.length - 1],
      });
    } else {
      for (let i = 1; i < this.radarChartData.length; i ++){
        if (this.radarChartData[i].label === this.studentScores[values.currentTarget.name]['name']) {
          this.radarChartData.splice(i, 1);
          break;
        }
      }
    }
  }
}
