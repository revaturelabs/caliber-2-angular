import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Service/report.service';
import { ChartOptions, ChartDataSets, ChartType, ChartLegendLabelItem, NestedTickOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import {Grade} from "../../../domain/model/grade.dto";
import {Trainee} from "../../../domain/model/trainee.dto";

@Component({
  selector: 'app-cumulative-scores',
  templateUrl: './cumulative-scores.component.html',
  styleUrls: ['./cumulative-scores.component.css']
})

export class CumulativeScoresComponent implements OnInit {
  gradeDataStore :Grade[]; // Data store to pull grade scores from
  traineeDataStore : Trainee[]; // Data store to pull trainee names from
  // assessmentDataStore : Assessment[]; // Data Store to get total number of assignments from
  gradeAverages: number[] = [];
  gradeTotalAverage: number;

  public barChartOptions: ChartOptions = {
    tooltips: {
      mode: 'label', //Note: setting mode to label displays all existing labels in a dataset at once. Without this, individual data points will display their own label independently.
      callbacks: {
        //Callback function could go here, to say, dynamically generate a label.
      }
    },
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
    }];
    // public readonly defaultBorderColor2 = 'rgba(252, 180, 20, 1)';

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A'}
  ];

  constructor(private reportService : ReportService) { }

  ngOnInit() {

  }

  updateDataPull(){
    this.gradeDataStore = this.reportService.getGradeDataStore();
    if (this.gradeDataStore == undefined || this.gradeDataStore.length)
    {
      this.reportService.getAllGrades().subscribe((allGrades : Grade[])=>{
        this.gradeDataStore = allGrades;
        this.gradeTotalAverage = this.reportService.getAverageGradeScore();
        this.traineeDataStore = this.reportService.getTraineeDataStore();
        this.createChart();
      });
    }
    else
    {
      this.gradeTotalAverage = this.reportService.getAverageGradeScore();
      this.traineeDataStore = this.reportService.getTraineeDataStore();

      this.createChart();
    }
    // this.assessmentDataStore = this.reportService.getAssessmentDataStore();


  }
  createChart(){
    if(this.traineeDataStore.length>0 && this.traineeDataStore[0].traineeId == -1){
      this.traineeDataStore.shift();
    }

    let gradeArray=[];
    let gradeCt=[];
    let students=[];
    let borderWidth=[];
    let benchMark=[];

    this.constructGradeStudentBorderAndBenchmarkArray(gradeArray, gradeCt,
      students, borderWidth, benchMark,this.traineeDataStore, this.gradeDataStore);

    this.arrayDivideAnd2Decimal(gradeArray, gradeCt);

    this.insertionSort(gradeArray,students);
    this.barChartLabels = students;
    this.gradeAverages = gradeArray;

    this.barChartData= [
      { data: gradeArray, label: 'Batch Scores', borderWidth: borderWidth, },
      { data: benchMark, label: 'Benchmark', type:'line', fill:'false', pointRadius:0, backgroundColor: 'rgba(252, 180, 20, 1)', borderColor: 'rgba(252, 180, 20, 1)', pointBackgroundColor: 'rgba(252, 180, 20, 1)', pointBorderColor: 'rgba(252, 180, 20, 1)', pointHoverBackgroundColor: 'rgba(252, 180, 20, 1)', pointHoverBorderColor: 'rgba(252, 180, 20, 1)'},
    ];
  }

  insertionSort(array1, array2) {
    for(let i = 0; i < array1.length; i++) {
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

  arrayDivideAnd2Decimal(array : number[], divisor : number[]){
    for(let i=0; i<array.length;i++){
      if(divisor[i] ==0)
        divisor[i] = 1;
      array[i] = array[i]/divisor[i];
      array[i] = Math.round(array[i] * 100) / 100;
    }
  }

  constructGradeStudentBorderAndBenchmarkArray(gradeArray, gradeCt, students, borderWidth, benchMark, traineeDataStore, gradeDataStore){
    traineeDataStore.forEach((element)=>{
      gradeArray.push(0);
      gradeCt.push(0);
      students.push(element.name);
      borderWidth.push(2);
      benchMark.push(this.gradeTotalAverage);
    });

    gradeDataStore.forEach((element)=>{
      let index = traineeDataStore.findIndex((trainee)=>{
        return trainee.traineeId == element.traineeId
      });
      gradeArray[index] += element.score
      gradeCt[index] += 1;
      // this.barChartLabels =[]
    });
  }
}
