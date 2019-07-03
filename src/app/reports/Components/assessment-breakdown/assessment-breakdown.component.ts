import { AssessmentScore } from './../../Models/assessment-score';
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
  public tableHeader = [
    "Exam",
    "Project",
    "Verbal",
    "Other"
  ];
  public traineeRow = [
    "91.00",
    "84.89",
    "73.00",
    "91.43"
  ];
  public batchRow = [
    "91.92",
    "81.81",
    "58.92",
    "89.45"
  ];

  public getBatchAverage = false;

  public traineeSelected : boolean = false;

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
    this.traineeSelected = this.reportService.trainee.batchId > 0;
    
    console.log("Updating Assessment Breakdown Score:");
    this.gradeDataStore = this.reportService.getGradeDataStore();
    this.traineeDataStore = this.reportService.getTraineeDataStore();
    this.assessmentDataStore = this.reportService.getAssessmentDataStore();
    let currentTrainee = this.reportService.trainee;

    let gradeArray=[];
    let traineeAverageArray=[];
    let traineeDisplayData=[];
    let batchAverageArray=[];
    let batchDisplayData=[];
    let students=[];
    let borderWidth=[];

    this.traineeDataStore.forEach((element)=>{
      gradeArray.push(0);
      students.push(element.name);
      borderWidth.push(2);
    });

    // The assessmentMap correlates a assessments id to the actual assessment
    let assessmentMap = new Map<number, Assessment> ()

    this.assessmentDataStore.forEach((assessment) => {
      assessmentMap.set(assessment.assessmentId, assessment);
    });

    batchAverageArray = this.getAverageGradeObject(assessmentMap, this.gradeDataStore);
    console.log("Batch Averages");
    console.log(batchAverageArray);
    

    console.log(this.gradeDataStore);
    console.log(this.assessmentDataStore);
    for (let i = 0; i < this.assessmentDataStore.length; i++)
    {
      let assessment = this.assessmentDataStore[i];
      let index = this.gradeDataStore.findIndex((currentGrade)=>{
        return currentTrainee.traineeId == currentGrade.traineeId
      });
      let grade = this.gradeDataStore[index];

      console.log("Assessment RAW SCORE: " + assessment.rawScore);
      // assessmentArray.push(assessment.rawScore);
      // gradeArray.push(grade.score);

    }
    
  
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
    // this.barChartLabels = students;
    this.gradeAverages = gradeArray;
    this.barChartLabels = [];
    this.tableHeader = [];
    this.traineeRow = [];
    this.batchRow = [];
    let scoreString : string;
    let assessmentTypeString : string;

    batchAverageArray.forEach((assessmentScore: AssessmentScore) => {
      //This rounds the assessment score to the first two decimals.
      scoreString = ""+Math.round(assessmentScore.score*100)/100;

      //This turns the assessment type to title case.
      assessmentTypeString = assessmentScore.assessmentType.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });

      batchDisplayData.push(scoreString);
      this.barChartLabels.push(assessmentTypeString);
      this.tableHeader.push(assessmentTypeString);
      this.batchRow.push(scoreString);
    });

    let traineeData = {data: traineeDisplayData, label: 'Trainee', borderWidth: borderWidth};
    let batchData = {data: batchDisplayData, label: 'Batch', borderWidth: borderWidth};

    this.barChartData= [];
    if (this.traineeSelected)
      this.barChartData.push(traineeData);
    
    this.barChartData.push(batchData);
  }

  private getAverageGradeObject(assessmentMap: Map<number, Assessment>, allGrades: Grade[]) : AssessmentScore[] {
    let currentAssessment: Assessment;
    let sortedGrades = {};
    let currentGradeType = "";
    allGrades.forEach((grade) => {
      currentAssessment = assessmentMap.get(grade.assessmentId)
      currentGradeType = currentAssessment.assessmentType.toUpperCase();
      if (!sortedGrades[currentGradeType]){
        sortedGrades[currentGradeType] = [];
      }
      sortedGrades[currentGradeType].push(grade);
    });
    console.log("Sorted Grades");
    console.log(sortedGrades);

    let averageObject = {};
    Object.keys(sortedGrades).forEach(type => {
      let i = 0;
      sortedGrades[type].forEach((grade: Grade) => {
        if (!averageObject[type]){
          averageObject[type] = 0;
        }
        averageObject[type] += grade.score;
        i++;
      });
      averageObject[type] /= i;
      console.log(type)
      console.log(averageObject[type]);
    });
    
    let assessmentAverage = [];
    Object.keys(averageObject).forEach((type) => {
      assessmentAverage.push(new AssessmentScore(type, averageObject[type]));
    });
    console.log(assessmentAverage);
    
    // This sorts the elements by alphabetically order and forces other to be at the end.
    assessmentAverage.sort((assessment1 : AssessmentScore, assessment2 : AssessmentScore) => {
      if (assessment1.assessmentType === 'OTHER') {
        return 1;
      }
      else if (assessment2.assessmentType === 'OTHER') {
        return -1;
      }
      return assessment1.assessmentType < assessment2.assessmentType ? -1 : assessment1.assessmentType > assessment2.assessmentType ? 1: 0;
    })
    return assessmentAverage;
  }

}
