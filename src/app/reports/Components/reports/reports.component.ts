import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { OverallQCScoresComponent } from '../overall-qc-scores/overall-qc-scores.component';
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
  //@ViewChild(TabularTraineeAverageListComponent) cumulativeScoreComponents: TabularTraineeAverageListComponent;
  @ViewChild(OverallQCScoresComponent) overAllQCReport: OverallQCScoresComponent;
  // @ViewChild(TabularTraineeAverageListComponent) cumulativeScoreComponents: TabularTraineeAverageListComponent;
  @ViewChild(ReportTopChartController) cumulativeScoreComponents: ReportTopChartController;
  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  showOverAllQC(){
    return (this.reportService.getWeek() == 0) && this.reportService.getTrainee()['traineeId'] == -1; 
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.reportOutput = reportOutput;
    console.log("Selected Trainee:"); // Adam needs these values for showing his component
    console.log(this.reportOutput.selectedTrainee);
    console.log("Selected Week:");// Let Jimmy know if you need other custom values on the reportOutput object
    console.log(this.reportOutput.selectedWeek);
    console.log("The Reports Page has Received an Update Request for Data");
    //this.cumulativeScoreComponents.updateDataPull();
    console.log("The Cumulative Score component has been updated!");


    console.log("Testing Report Service Data");
    console.log("Get Selected Batch");
    console.log(this.reportService.getBatch());
    console.log("Get All Trainees in Batch");
    console.log(this.reportService.getTraineeDataStore());
    console.log("Get All Categories in System");
    console.log(this.reportService.getCategoryDataStore());
    console.log("Get all QANotes in Batch");
    console.log(this.reportService.getQANoteDataStore());
    console.log("Get all Assessments in Batch");
    console.log(this.reportService.getAssessmentDataStore());
    console.log("Get all Grades in Batch/week");
    console.log(this.reportService.getGradeDataStore());
    this.overAllQCReport.update(this.reportService.getQANoteDataStore());
    this.cumulativeScoreComponents.updateDataPull();
  }
}