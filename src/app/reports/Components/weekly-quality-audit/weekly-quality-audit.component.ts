import { Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Assessment } from './../../../Assess-Batch/Models/Assesment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReportService } from '../../Service/report.service';
import { QANote } from '../../Models/qanote';

@Component({
  selector: 'app-weekly-quality-audit',
  templateUrl: './weekly-quality-audit.component.html',
  styleUrls: ['./weekly-quality-audit.component.css']
})
export class WeeklyQualityAuditComponent implements OnInit {

  public readonly superstarBackgroundColor = 'rgba(57, 63, 239, 1)';
  public readonly goodBackgroundColor = 'rgba(24, 173, 24, 1)';
  public readonly averageBackgroundColor = 'rgba(249, 233, 0, 1)';
  public readonly poorBackgroundColor = 'rgba(234, 40, 37, 1)';
  public readonly blackBackgroundColor = 'rgba(0, 0, 0, 1)';

  public readonly superstarHoverColor = 'rgba(57, 63, 239, .7)';
  public readonly goodHoverColor = 'rgba(24, 173, 24, .7)';
  public readonly averageHoverColor = 'rgba(249, 233, 0, .7)';
  public readonly poorHoverColor = 'rgba(234, 40, 37, .7)';
  public readonly blackHoverColor = 'rgba(0, 0, 0, .7)';

  public doughnutColors = [
    {
      hoverBackgroundColor: [
        this.superstarHoverColor,
        this.goodHoverColor,
        this.averageHoverColor,
        this.poorHoverColor
      ],
      backgroundColor: [
        this.superstarBackgroundColor,
        this.goodBackgroundColor,
        this.averageBackgroundColor,
        this.poorBackgroundColor
      ]
    }
  ]

  public tableHeader = [
    "Superstar",
    "Good",
    "Average",
    "Poor"
  ];
  public auditValueRow = [
    "4",
    "3",
    "1",
    "1"
  ];

  public weekSelected : boolean = false;

  public pieChartOption: any = {
    legend: {
      display: true,
      labels: {
        boxWidth: 11,
        fontColor: 'grey'
      }
  }
  }

  private qaNotes : QANote[];

  constructor(private reportService : ReportService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public onDownloadClick(e: any) : void {

  }

  public doughnutChartLabels: Label[] = ['Superstar', 'Good', 'Average', 'Poor'];

  public doughnutChartData: MultiDataSet = [
    [4, 3, 1, 1],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  updateDataPull(){
    this.weekSelected = this.reportService.week > 0;
    this.qaNotes = this.reportService.getQANoteDataStore();
    this.createChart();
    // this.assessmentDataStore = this.reportService.getBatchAssessmentDataStore();
    // if (this.assessmentDataStore == undefined || this.assessmentDataStore.length === 0)
    // {
    //   this.reportService.getAllBatchAssessments().subscribe((assessments : Assessment[])=>{
    //     this.assessmentDataStore = assessments;

    //     this.gradeDataStore = this.reportService.getGradeDataStore();
    //     this.traineeGrades = this.reportService.getGradesOfTraineeDataStore();
    //     this.createChart();
    //   });
    // }
    // else
    // {
    //   this.gradeDataStore = this.reportService.getGradeDataStore();
    //   this.traineeGrades = this.gradeDataStore.filter((grade)=>{ return grade.traineeId === this.reportService.trainee.traineeId });
    //   this.createChart();
    // }

  }

  createChart() {
    this.tableHeader = [];
    this.auditValueRow = [];
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    this.doughnutColors[0]["hoverBackgroundColor"]=[];
    this.doughnutColors[0]["backgroundColor"]=[];

    let qcStatusCurrent : string;
    let qcStatusObject = {};

    //Adding the default categories:
    qcStatusObject["SUPERSTAR"] = 0;
    qcStatusObject["GOOD"] = 0;
    qcStatusObject["AVERAGE"] = 0;
    qcStatusObject["POOR"] = 0;

    this.qaNotes.forEach((qaNote)=>{
      qcStatusCurrent = qaNote.qcStatus.toUpperCase();
      //qaNote.qcStatus
      if (qcStatusObject[qcStatusCurrent] == undefined) {
        qcStatusObject[qcStatusCurrent] = 1;
      }
      else {
        qcStatusObject[qcStatusCurrent] += 1;
      }

    });

    let titleCaseType : string;
    Object.keys(qcStatusObject).forEach((status) => {
      titleCaseType = this.toTitleCase(status);
      if (status !== 'UNDEFINED'){
        this.tableHeader.push(titleCaseType);
        this.doughnutChartLabels.push(titleCaseType);
        this.auditValueRow.push(qcStatusObject[status]);
        this.doughnutChartData.push(qcStatusObject[status]);
        this.doughnutColors[0]["hoverBackgroundColor"].push(this.getHoverColorByQCStatus(status));
        this.doughnutColors[0]["backgroundColor"].push(this.getColorByQCStatus(status));
      }
    });
  }

  getColorByQCStatus(status : string) : string {
    switch (status)
    {
      case "SUPERSTAR": return this.superstarBackgroundColor;
      case "GOOD": return this.goodBackgroundColor;
      case "AVERAGE": return this.averageBackgroundColor;
      case "POOR": return this.poorBackgroundColor;
      default: return this.blackBackgroundColor;
    }
  }

  getHoverColorByQCStatus(status : string) : string {
    switch (status)
    {
      case "SUPERSTAR": return this.superstarHoverColor;
      case "GOOD": return this.goodHoverColor;
      case "AVERAGE": return this.averageHoverColor;
      case "POOR": return this.poorHoverColor;
      default: return this.blackHoverColor;
    }
  }

  toTitleCase(val : string) : string {
    //This turns the assessment type to title case.
    return val.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }
}

