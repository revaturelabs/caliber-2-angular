import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { OverallQCScoresComponent } from '../overall-qc-scores/overall-qc-scores.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput : ReportOutput;
  //@ViewChild(TabularTraineeAverageListComponent) cumulativeScoreComponents: TabularTraineeAverageListComponent;
  @ViewChild(OverallQCScoresComponent) overAllQCReport: OverallQCScoresComponent;
  constructor() { } 

  ngOnInit() {
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.reportOutput = reportOutput;
    console.log(this.reportOutput)
    console.log("The Reports Page has Received an Update Request for Data");
    //this.cumulativeScoreComponents.updateDataPull();
    this.overAllQCReport.update();
    console.log("The Cumulative Score component has been updated!");
  }
}