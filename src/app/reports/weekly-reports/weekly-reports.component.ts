import { Component, OnInit, ViewChild } from '@angular/core';
import { BarLineChartComponent } from '../Components/bar-line-chart/bar-line-chart.component';
import { ReportService } from '../Service/report.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { forEach } from '@angular/router/src/utils/collection';
import { Grade } from 'src/app/Batch/type/trainee';

@Component({
  selector: 'app-weekly-reports',
  templateUrl: './weekly-reports.component.html',
  styleUrls: ['./weekly-reports.component.css']
})
export class WeeklyReportsComponent implements OnInit {

  private grades : Grade[];
  private assessments: Assessment[];
  public weekAverages : Map<number,number[]> ;


  constructor(private reportService : ReportService) {
  }

  ngOnInit() {
    this.weekAverages = new Map<number, number[]>();
  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  
  update(){
    this.grades = this.reportService.getGradeDataStore();
    this.assessments = this.reportService.getAssessmentDataStore();
    let gradeAverages = [];
    let tempAverage = 0;
    let tempCount = 0;

    //matches each assessment to a week and puts it into an array
    //matches each grade to an assessment and finds the average of all grades per assessment
      this.assessments.forEach((tempAssessment)=>{
        this.grades.forEach((tempGrade)=>{
          if(tempAssessment.assessmentId == tempGrade.assessmentId){
            tempCount++;
            tempAverage+=tempGrade.score;
          }
        });
        tempAverage /= tempCount;
        gradeAverages.push(tempAverage);
        tempAverage = 0;
        tempCount = 0;
      });

      for(let i=0; i<this.assessments.length; i++){
        let weekNumber = this.assessments[i].weekNumber;
        if(this.weekAverages.has(weekNumber)){
          let averages = this.weekAverages.get(weekNumber);
          averages.push(gradeAverages[i]);
          this.weekAverages.set(weekNumber, averages);
        }
        else{
          this.weekAverages.set(weekNumber, [gradeAverages[i]]);
        }
      }
    console.log("---------------------------------------------------------------------")
    console.log(gradeAverages);
    console.log("---------------------------------------------------------------------")
    console.log(this.weekAverages);

  }
}
