import { Component, OnInit, ViewChild } from '@angular/core';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { Grade } from 'src/app/Batch/type/trainee';
import { ReportService } from '../../Service/report.service';

@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.css']
})
export class WeeklyReportComponent implements OnInit {

  private grades : Grade[];
  private assessments: Assessment[];
  private weekAverages : Map<string,number[]> ;
  public avgData: number[];

  public chartOptions;
  public chartData;
  public chartLabels;


  constructor(private reportService : ReportService) {
  }

  ngOnInit() {
    this.weekAverages = new Map<string, number[]>();  
    this.avgData = [];

  }

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
        let tempWeekNumber = this.assessments[i].weekNumber;
        let weekNumber = String(tempWeekNumber);

        if(this.weekAverages.has(weekNumber)){
          let averages = this.weekAverages.get(weekNumber);
          averages.push(gradeAverages[i]);
          this.weekAverages.set(weekNumber, averages);
        }
        else{
          this.weekAverages.set(weekNumber, [gradeAverages[i]]);
        }
      }
      //generate the chart
      this.generateChart();   
  }

  generateChart(){
    this.chartOptions = {

    };


    let keys = Array.from(this.weekAverages.keys());
    

    //fill line
    keys.forEach((key)=>{
      let avg = 0;
      this.weekAverages.get(key).forEach((grade)=>{
        avg += grade;
      });
      //add the rounded averages into an array
      this.avgData.push( Math.round( avg/this.weekAverages.get(key).length *100) /100);
    });

    this.chartData = [
      { 
        data: this.avgData, 
        fill: false, 
        borderColor: 'rgba(114,164,194,1)',
      },
    ];
    
    //set x axis labels
    this.chartLabels = keys;
  }
}
