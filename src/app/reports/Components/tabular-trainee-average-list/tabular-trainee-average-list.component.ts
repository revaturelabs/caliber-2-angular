import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Service/report.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { ChartOptions, ChartDataSets, ChartType, ChartLegendLabelItem, NestedTickOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Trainee, Grade } from 'src/app/Batch/type/trainee';

@Component({
  selector: 'app-tabular-trainee-average-list',
  templateUrl: './tabular-trainee-average-list.component.html',
  styleUrls: ['./tabular-trainee-average-list.component.css']
})

export class TabularTraineeAverageListComponent implements OnInit {
  gradeDataStore :Grade[];
  traineeDataStore : Trainee[];
  assessmentDataStore : Assessment[];
  gradeAverages: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
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
  
  constructor(private reportService : ReportService) { }

  ngOnInit() {

  }

  updateDataPull(){
    console.log("Updating Cumulative Score:");
    this.gradeDataStore = this.reportService.getGradeDataStore();
    this.traineeDataStore = this.reportService.getTraineeDataStore();
    this.assessmentDataStore = this.reportService.getAssessmentDataStore();

    if(this.traineeDataStore.length>0 && this.traineeDataStore[0].traineeId == -1)
      this.traineeDataStore.shift();

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
    }

    console.log(gradeArray);
    this.insertionSort(gradeArray,students);
    this.barChartLabels = students;
    this.gradeAverages = gradeArray;
    this.barChartData= [
      { data: gradeArray, label: 'Average Score', borderWidth: borderWidth}
    ];
  }

  insertionSort(array1,array2) {
    for(var i = 0; i < array1.length; i++) {
      let temp = array1[i];
      let temp2 = array2[i];
      let j = i - 1;
      while (j >= 0 && array1[j] < temp) {
        array1[j + 1] = array1[j];
        array2[j + 1] = array2[j];
        j--;
      }
      array1[j + 1] = temp;
      array2[j + 1] = temp2;
    }
  }

}
