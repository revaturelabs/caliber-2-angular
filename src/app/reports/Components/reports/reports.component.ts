import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { Trainee } from 'src/app/Batch/type/trainee';
import { ReportService } from '../../Service/report.service';
import { ReportTopChartController } from '../report-top-chart-controller/report-top-chart-controller.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput : ReportOutput;
  @ViewChild(ReportTopChartController) cumulativeScoreComponents: ReportTopChartController;
  constructor(private reportService : ReportService) { } 

  ngOnInit() {
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.reportOutput = reportOutput;
    //console.log("=====================================\n== The Report is Updating Children ==\n");
    //console.log("Selected Trainee:"); // Adam needs these values for showing his component
    //console.log(this.reportOutput.selectedTrainee);
    //console.log("Selected Week:");// Let Jimmy know if you need other custom values on the reportOutput object
    //console.log(this.reportOutput.selectedWeek);

    this.cumulativeScoreComponents.updateDataPull();//console.log("The Cumulative Score component has been updated!");
    //console.log("Testing Report Service Data");
    //console.log("Get Selected Batch");
    //console.log(this.reportService.getBatch());
    //console.log("Get All Trainees in Batch");
    //console.log(this.reportService.getTraineeDataStore());
    //console.log("Get All Categories in System");
    //console.log(this.reportService.getCategoryDataStore());
    //console.log("Get all QANotes in Batch");
    //console.log(this.reportService.getQANoteDataStore());
    //console.log("Get all Assessments in Batch");
    //console.log(this.reportService.getAssessmentDataStore());
    //console.log("Get all Grades by Batch/week");
    //console.log(this.reportService.getGradeDataStore());
    //console.log("Get all Grades of Trainee");
    //console.log(this.reportService.getGradesOfTraineeDataStore());
    //console.log("Show Average Total Grade");
    //console.log(this.reportService.getAverageGradeScore());
  }
}