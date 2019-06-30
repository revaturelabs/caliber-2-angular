import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportOutput } from './Models/report-output';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput : ReportOutput;
  // @ViewChild(TabularTraineeAverageListComponent) cumulativeScoreComponents: TabularTraineeAverageListComponent;
  constructor() { } 

  ngOnInit() {
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.reportOutput = reportOutput;
    console.log("The Reports Page has Received an Update Request for Data");
    // this.cumulativeScoreComponents.updateDataPull();
    console.log("The Cumulative Score component has been updated!");
  }
}