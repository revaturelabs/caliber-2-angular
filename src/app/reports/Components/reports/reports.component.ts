import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { Trainee } from 'src/app/Batch/type/trainee';

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
    console.log("Selected Trainee:"); // Adam needs these values for showing his component
    console.log(this.reportOutput.selectedTrainee);
    console.log("Selected Week:");// Let Jimmy know if you need other custom values on the reportOutput object
    console.log(this.reportOutput.selectedWeek);
    console.log("The Reports Page has Received an Update Request for Data");
    // this.cumulativeScoreComponents.updateDataPull();
    console.log("The Cumulative Score component has been updated!");
  }
}