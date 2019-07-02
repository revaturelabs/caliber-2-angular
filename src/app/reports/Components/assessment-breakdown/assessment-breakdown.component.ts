import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BarLineChartComponent } from '../bar-line-chart/bar-line-chart.component';
import { ReportService } from '../../Service/report.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Trainee, Grade } from 'src/app/Batch/type/trainee';

@Component({
  selector: 'app-assessment-breakdown',
  templateUrl: './assessment-breakdown.component.html',
  styleUrls: ['./assessment-breakdown.component.css']
})
export class AssessmentBreakdownComponent implements OnInit {
  public tableCol1 = "Project";
  public tableCol2 = "Exam"
  public tableCol3 = "Verbal"
  public tableCol4 = "Other"
  public traineeProject = "91.00";
  public traineeExam = "84.89";
  public traineeOther = "73.00";
  public traineeVerbal = "91.43";
  public batchProject = "91.92";
  public batchExam = "81.81";
  public batchOther = "58.92";
  public batchVerbal = "89.45";

  public getBatchAverage = false;


  gradeDataStore :Grade[];
  traineeDataStore : Trainee[];
  assessmentDataStore : Assessment[];
  gradeAverages: number[] = [];

  constructor(private reportService : ReportService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public onDownloadClick(e: any) : void {

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'Average'
      },
        ticks: {
          max : 100,
          min : 40,
          stepSize: 20,
          padding: 0,
          backdropPaddingX: 0,
          display: true,
          
        }
      }]
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Array<any> = [
    { 
      backgroundColor: 'rgba(114, 164, 194, .5)',
      borderColor: 'rgba(114, 164, 194, 1)',
      pointBackgroundColor: 'rgba(252, 180, 20, .6)',
      pointBorderColor: 'rgba(252, 180, 20, 1)',
      pointHoverBackgroundColor: 'rgba(252, 180, 20, .6)',
      pointHoverBorderColor: 'rgba(252, 180, 20, 1)',
    }]

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A'}
  ];

  updateDataPull(){
    console.log("Updating Assessment Breakdown Score:");
    this.gradeDataStore = this.reportService.getGradeDataStore();
    this.traineeDataStore = this.reportService.getTraineeDataStore();
    this.assessmentDataStore = this.reportService.getAssessmentDataStore();

    let gradeArray=[];
    let students=[];
    let borderWidth=[];
    this.traineeDataStore.forEach((element)=>{
      gradeArray.push(0);
      students.push(element.name);
      borderWidth.push(2);
    });

    this.gradeDataStore.forEach((element)=>{
      
      let index = this.traineeDataStore.findIndex((trainee)=>{
        return trainee.traineeId == element.traineeId
      });
      gradeArray[index] += element.score
      // this.barChartLabels =[]
      
    });

    let i:number =0;
    for(i=0; i<gradeArray.length;i++){
      gradeArray[i] = gradeArray[i]/this.assessmentDataStore.length;
      gradeArray[i] = Math.round(gradeArray[i] * 100) / 100

    }

    console.log(gradeArray);
    ////////////// place grade.toFixed(2) loop here
    /////////// (maybe the issue was that it has to happen after sorting?)
    this.barChartLabels = students;
    this.gradeAverages = gradeArray;
    
    this.barChartData= [
      { data: gradeArray, label: 'Trainee', borderWidth: borderWidth},
      { data: gradeArray, label: 'Batch', borderWidth: borderWidth}
    ];
  }


}
