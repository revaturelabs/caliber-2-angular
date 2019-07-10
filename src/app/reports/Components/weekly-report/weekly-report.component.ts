import { Component, OnInit, ViewChild } from '@angular/core';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import {Grade, Trainee} from 'src/app/Batch/type/trainee';
import { ReportService } from '../../Service/report.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.css']
})
export class WeeklyReportComponent implements OnInit {

  @ViewChild(BaseChartDirective) public chartname: BaseChartDirective;

  private grades: Grade[];
  private gradesByTrainee: Grade[];
  private assessments: Assessment[];
  private assessmentsByTrainee: Assessment[];
  private weekAverages: Map<string, number[]> ;
  private weekAveragesByTrainee: Map<string, number[]> ;
  public avgData;
  public avgDataByTrainee;
  public display: boolean;
  public overallByTrainee: boolean;

  public chartOptions;
  public chartData;
  public chartLabels;

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.display = false;
    this.overallByTrainee = false;
    this.weekAverages = new Map<string, number[]>();
    this.weekAveragesByTrainee = new Map<string, number[]>();
    this.avgData = [];
    this.avgDataByTrainee = [];
  }

  onChartClick(event) {
  }


  update() {
    this.display = false;
    const trainee = this.reportService.getTrainee();
    if (this.reportService.getWeek() !== 0 && trainee.traineeId !== -1) {
      this.overallByTrainee = true;
      this.weekAveragesByTrainee = new Map<string, number[]>();
      this.resetChart();
      this.updateDataForTraineeAndWeek(trainee);
    } else if (this.reportService.getWeek() === 0 && trainee.traineeId !== -1) {
      this.overallByTrainee = true;
      this.weekAveragesByTrainee = new Map<string, number[]>();
      this.resetChart();
      this.updateDataForTrainee(trainee);
    } else if (this.reportService.getWeek() === 0 && trainee.traineeId === -1) {
      this.overallByTrainee = false;
      this.resetChart();
      this.updateDataForAll();
    }
  }

  fillChartByTrainee() {

    this.chartOptions = {
      responsive: true
    };

    const keys = Array.from(this.weekAverages.keys());
    // fill line
    keys.forEach((key) => {
      let avg = 0;
      this.weekAverages.get(key).forEach((grade) => {
        avg += grade;
      });
      // add the rounded averages into an array
      this.avgData.push( Math.round( avg / this.weekAverages.get(key).length * 100) / 100);
    });

    const keysByTrainee = Array.from(this.weekAveragesByTrainee.keys());
    keysByTrainee.forEach((key) => {
      let avg = 0;
      this.weekAveragesByTrainee.get(key).forEach((grade) => {
        avg += grade;
      });
      this.avgDataByTrainee.push( Math.round(avg / this.weekAveragesByTrainee.get(key).length * 100) / 100);
    });

    // keys.map( (obj) => {
    //   obj = "Trainee" + obj;
    //   return obj;
    // });
    this.chartData = [
      {
        data: this.avgData,
        fill: false,
        borderColor: 'rgba(114,164,194,1)',
      },
      {
        data: this.avgDataByTrainee,
        fill: false,
        borderColor: 'rgba(255,191,37,1)',
      },
    ];

    // set x axis labels
    this.chartLabels = keys;
    console.log(keys);
    //this.chart.update();
  }

  fillChartByTraineeAndWeek() {

    this.chartOptions = {
      responsive: true
    };

    const keys = Array.from(this.weekAverages.keys());
    // fill line
    keys.forEach((key) => {
      if (+key <= this.reportService.getWeek()) {
        let avg = 0;
        this.weekAverages.get(key).forEach((grade) => {
          avg += grade;
        });
        // add the rounded averages into an array
        this.avgData.push( Math.round( avg / this.weekAverages.get(key).length * 100) / 100);
      }
    });

    const keysByTrainee = Array.from(this.weekAveragesByTrainee.keys());
    keysByTrainee.forEach((key) => {
      if (+key <= this.reportService.getWeek()) {
        let avg = 0;
        this.weekAveragesByTrainee.get(key).forEach((grade) => {
          avg += grade;
        });
        this.avgDataByTrainee.push( Math.round(avg / this.weekAveragesByTrainee.get(key).length * 100) / 100);
      }
    });

    // keys.map( (obj) => {
    //   obj = "Trainee" + obj;
    //   return obj;
    // });
    this.chartData = [
      {
        data: this.avgData,
        fill: false,
        borderColor: 'rgba(114,164,194,1)',
      },
      {
        data: this.avgDataByTrainee,
        fill: false,
        borderColor: 'rgba(255,191,37,1)',
      },
    ];

    // set x axis labels
    const xAxis = Array.from(this.weekAveragesByTrainee.keys());
    this.chartLabels = xAxis;
    console.log(xAxis);
    // setTimeout(() => {
    //   console.log("resizing");
    //       this.chartname.chart.resize();
    // });
  }

  fillChart() {

    this.chartOptions = {
      responsive: true
    };

    const keys = Array.from(this.weekAverages.keys());
    // fill line
    keys.forEach((key) => {
      let avg = 0;
      this.weekAverages.get(key).forEach((grade) => {
        avg += grade;
      });
      // add the rounded averages into an array
      this.avgData.push( Math.round( avg / this.weekAverages.get(key).length * 100) / 100);
    });

    // keys.map( (obj) => {
    //   obj = "Trainee" + obj;
    //   return obj;
    // });
    this.chartData = [
      {
        data: this.avgData,
        fill: false,
        borderColor: 'rgba(114,164,194,1)',
      },
    ];

    // set x axis labels
    this.chartLabels = keys;
    console.log(keys);
  }

  resetChart() {
    this.chartData = [];
    this.chartLabels = [];
    this.avgData = [];
    this.avgDataByTrainee = [];
    this.chartOptions = [];
  }

  updateDataForAll() {
    this.grades = this.reportService.getGradesOfBatchDataStore();
    this.assessments = this.reportService.getBatchAssessmentDataStore();
    if (this.grades.length > 0 && this.assessments.length > 0) {
      this.display = true;
      const gradeAverages = [];
      let tempAverage = 0;
      let tempCount = 0;

      // matches each assessment to a week and puts it into an array
      // matches each grade to an assessment and finds the average of all grades per assessment
      this.assessments.forEach((tempAssessment) => {
        this.grades.forEach((tempGrade) => {
          if (tempAssessment.assessmentId == tempGrade.assessmentId) {
            tempCount++;
            tempAverage += tempGrade.score;
          }
        });
        tempAverage /= tempCount;
        gradeAverages.push(tempAverage);
        tempAverage = 0;
        tempCount = 0;
      });

      for (let i = 0; i < this.assessments.length; i++) {
        const tempWeekNumber = this.assessments[i].weekNumber;
        const weekNumber = String(tempWeekNumber);

        if (this.weekAverages.has(weekNumber)) {
          const averages = this.weekAverages.get(weekNumber);
          averages.push(gradeAverages[i]);
          this.weekAverages.set(weekNumber, averages);
        } else {
          this.weekAverages.set(weekNumber, [gradeAverages[i]]);
        }
      }
      // generate the chart
      this.fillChart();
    } else {
      this.display = false;
    }
  }

  private updateDataForTrainee(trainee: Trainee) {
    this.gradesByTrainee = this.reportService.getGradeDataStore();
    this.assessmentsByTrainee = this.reportService.getAssessmentDataStore();
    // If there are no grades or assessments then set flag to display chart to false
    if (!(this.gradesByTrainee.length > 0 && this.assessmentsByTrainee.length > 0)) {
      this.display = false;
    } else {
      this.display = true;
      const gradeAverages = [];
      let tempAverage = 0;
      let tempCount = 0;

      // matches each assessment to a week and puts it into an array
      // matches each grade to an assessment and finds the average of all grades per assessment
      this.assessmentsByTrainee.forEach((tempAssessment) => {
        this.gradesByTrainee.forEach((tempGrade) => {
          if (tempAssessment.assessmentId == tempGrade.assessmentId) {
            if (trainee.traineeId == tempGrade.traineeId) {
              tempCount++;
              tempAverage += tempGrade.score;
            }

          }
        });
        tempAverage /= tempCount;
        gradeAverages.push(tempAverage);
        tempAverage = 0;
        tempCount = 0;
      });

      for (let i = 0; i < this.assessmentsByTrainee.length; i++) {
        const tempWeekNumber = this.assessmentsByTrainee[i].weekNumber;
        const weekNumber = String(tempWeekNumber);

        if (this.weekAveragesByTrainee.has(weekNumber)) {
          const averages = this.weekAveragesByTrainee.get(weekNumber);
          averages.push(gradeAverages[i]);
          this.weekAveragesByTrainee.set(weekNumber, averages);
        } else {
          this.weekAveragesByTrainee.set(weekNumber, [gradeAverages[i]]);
        }
      }
      // generate the chart
      this.fillChartByTrainee();
    }
  }
  private updateDataForTraineeAndWeek(trainee: Trainee) {
    this.gradesByTrainee = this.reportService.getGradesOfBatchDataStore();
    this.assessmentsByTrainee = this.reportService.getBatchAssessmentDataStore();
    // If there are no grades or assessments then set flag to display chart to false
    if (!(this.gradesByTrainee.length > 0 && this.assessmentsByTrainee.length > 0)) {
      this.display = false;
    } else {
      this.display = true;
      const gradeAverages = [];
      let tempAverage = 0;
      let tempCount = 0;

      // matches each assessment to a week and puts it into an array
      // matches each grade to an assessment and finds the average of all grades per assessment
      this.assessmentsByTrainee.forEach((tempAssessment) => {
        if (tempAssessment.weekNumber <= this.reportService.getWeek()) {
          this.gradesByTrainee.forEach((tempGrade) => {
          if (tempAssessment.assessmentId == tempGrade.assessmentId) {
             if (trainee.traineeId == tempGrade.traineeId) {
                tempCount++;
                tempAverage += tempGrade.score;
              }
            }
          });
        }
        tempAverage /= tempCount;
        gradeAverages.push(tempAverage);
        tempAverage = 0;
        tempCount = 0;
      });

      for (let i = 0; i < this.assessmentsByTrainee.length; i++) {
        const tempWeekNumber = this.assessmentsByTrainee[i].weekNumber;
        const weekNumber = String(tempWeekNumber);

        if (tempWeekNumber <= this.reportService.getWeek()){
          if (this.weekAveragesByTrainee.has(weekNumber)) {
            const averages = this.weekAveragesByTrainee.get(weekNumber);
            averages.push(gradeAverages[i]);
            this.weekAveragesByTrainee.set(weekNumber, averages);
          } else {
            this.weekAveragesByTrainee.set(weekNumber, [gradeAverages[i]]);
          }
        }
      }
      // generate the chart
      this.fillChartByTraineeAndWeek();
    }
  }
}
