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
    if(this.reportService.getTrainee()!= undefined){
      return (this.reportService.getWeek() == 0 && this.reportService.getTrainee()['traineeId'] == -1); 
    }
    return false;
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.reportOutput = reportOutput;
    //console.logg("Selected Trainee:"); // Adam needs these values for showing his component
    //console.logg(this.reportOutput.selectedTrainee);
    //console.logg("Selected Week:");// Let Jimmy know if you need other custom values on the reportOutput object
    //console.logg(this.reportOutput.selectedWeek);
    //console.logg("The Reports Page has Received an Update Request for Data");
    //this.cumulativeScoreComponents.updateDataPull();
    //console.logg("The Cumulative Score component has been updated!");


    //console.logg("Testing Report Service Data");
    //console.logg("Get Selected Batch");
    //console.logg(this.reportService.getBatch());
    //console.logg("Get All Trainees in Batch");
    //console.logg(this.reportService.getTraineeDataStore());
    //console.logg("Get All Categories in System");
    //console.logg(this.reportService.getCategoryDataStore());
    //console.logg("Get all QANotes in Batch");
    //console.logg(this.reportService.getQANoteDataStore());
    //console.logg("Get all Assessments in Batch");
    //console.logg(this.reportService.getAssessmentDataStore());
    //console.logg("Get all Grades in Batch/week");
    //console.logg(this.reportService.getGradeDataStore());
    if(this.overAllQCReport != undefined){
      this.overAllQCReport.update(this.reportService.getQANoteDataStore());
    }
    this.cumulativeScoreComponents.updateDataPull();
  }
}