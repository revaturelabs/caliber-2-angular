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
  public validHeader = [
    true,
    true,
    true, 
    true
  ]

  // Setting default values for headers, emptied when data is loaded
  public tableHeader = [
    "Exam",
    "Project",
    "Verbal",
    "Other"
  ];

  // Setting default values for trainee, emptied when data is loaded
  public traineeRow = [
    "91.00",
    "84.89",
    "73.00",
    "91.43"
  ];

  // Setting default values for batch, emptied when data is loaded
  public batchRow = [
    "91.92",
    "81.81",
    "58.92",
    "89.45"
  ];

  public traineeBackgroundColor = 'rgba(114, 164, 194, .5)';
  public traineeBorderColor = 'rgba(114, 164, 194, 1)';

  public batchBackgroundColor = 'rgba(252, 180, 20, .6)';
  public batchBorderColor = 'rgba(252, 180, 20, 1)';

  public hoverBatchBackgroundColor = '';

  public getBatchAverage = false;

  public traineeSelected : boolean = false;

  public barBorderWidth = 2;

  traineeGrades: Grade[];
  gradeDataStore :Grade[];
  assessmentDataStore : Assessment[];
  gradeAverages: number[] = [];

  constructor(private reportService : ReportService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public onDownloadClick(e: any) : void {

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    
    tooltips: {
      mode: 'label'
    },
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
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A'}
  ];


  updateDataPull(){
    this.traineeSelected = this.reportService.trainee.batchId > 0;
    
    this.assessmentDataStore = this.reportService.getBatchAssessmentDataStore();
    if (this.assessmentDataStore == undefined || this.assessmentDataStore.length === 0)
    {
      this.reportService.getAllBatchAssessments().subscribe((assessments : Assessment[])=>{
        this.assessmentDataStore = assessments;
        
        this.gradeDataStore = this.reportService.getGradeDataStore();
        this.traineeGrades = this.reportService.getGradesOfTraineeDataStore();
        this.createChart();
      });
    }
    else
    {
      this.gradeDataStore = this.reportService.getGradeDataStore();
      this.traineeGrades = this.gradeDataStore.filter((grade)=>{ return grade.traineeId === this.reportService.trainee.traineeId });
      this.createChart();
    }
    
  }

  createChart() : void {
    let gradeArray=[];
    let traineeAverageArray=[]; 
    let traineeDisplayData=[];
    let batchAverageArray=[];
    let batchDisplayData=[];
    let borderWidth=[];

    // The assessmentMap correlates a assessments id to the actual assessment
    let assessmentMap = new Map<number, Assessment> ()

    this.assessmentDataStore.forEach((assessment) => {
      assessmentMap.set(assessment.assessmentId, assessment);
    });

    traineeAverageArray = this.getAverageGradeObject(assessmentMap, this.traineeGrades);
    batchAverageArray = this.getAverageGradeObject(assessmentMap, this.gradeDataStore);

    this.gradeAverages = gradeArray;
    this.barChartLabels = [];
    this.tableHeader = [];
    this.traineeRow = [];
    this.batchRow = [];
    this.validHeader = [];
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
      this.tableHeader.push(assessmentTypeString.trim());
      this.batchRow.push(scoreString);
      borderWidth.push(this.barBorderWidth);
    });
    
    if (this.traineeSelected === true) {
      traineeAverageArray.forEach((assessmentScore: AssessmentScore) => {
        //This rounds the assessment score to the first two decimals.
        if (assessmentScore.score < 0)
          scoreString = "";
        else
          scoreString = ""+Math.round(assessmentScore.score*100)/100;
        
          this.validHeader.push(scoreString ? true : false);
      
        //This turns the assessment type to title case.
        assessmentTypeString = assessmentScore.assessmentType.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });
        
        traineeDisplayData.push(scoreString);
        this.traineeRow.push(scoreString);

        borderWidth.push(this.barBorderWidth);
      });
    }

    let traineeData = {
      data: traineeDisplayData, 
      label: 'Trainee', 
      borderWidth: borderWidth
    };
    let batchData = {
      data: batchDisplayData, 
      label: 'Batch', 
      borderWidth: borderWidth
    };

    this.applyTraineeColor(traineeData);

    this.barChartData= [];
    if (this.traineeSelected)
    {
      this.applyBatchColor(batchData);
      this.barChartData.push(traineeData);
    }
    else
    {
      this.applyTraineeColor(batchData);
    }
    
    this.barChartData.push(batchData);
  }

  private applyTraineeColor(obj : Object) : void {
    obj["backgroundColor"] = this.traineeBackgroundColor;
    obj["borderColor"] = this.traineeBorderColor;
    obj["hoverBackgroundColor"] = 'rgba(114, 164, 194, .57)';
    obj["hoverBorderColor"] = 'rgba(114, 164, 194, 1)';
  }

  private applyBatchColor(obj : Object) : void {
    obj["backgroundColor"] = this.batchBackgroundColor;
    obj["borderColor"] = this.batchBorderColor;
    obj["hoverBackgroundColor"] = 'rgba(252, 180, 20, .67)';
    obj["hoverBorderColor"] = 'rgba(252, 180, 20, 1)';
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
    });
    
    let assessmentAverage = [];
    Object.keys(averageObject).forEach((type) => {
      assessmentAverage.push(new AssessmentScore(type, averageObject[type]));
    });
    
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
