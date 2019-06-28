import { Component, OnInit } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput : ReportOutput;
  constructor() { } 

  ngOnInit() {
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.reportOutput = reportOutput;
    console.log("I got it! " + this.reportOutput.calculateAssessmentsAverage);
  }
}
