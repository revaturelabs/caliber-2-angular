import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { OverallQCScoresComponent } from '../overall-qc-scores/overall-qc-scores.component';
import { Trainee } from 'src/app/Batch/type/trainee';
import { ReportService } from '../../Service/report.service';
import { AssessmentBreakdownComponent } from '../assessment-breakdown/assessment-breakdown.component';
import { ReportTopChartController } from '../report-top-chart-controller/report-top-chart-controller.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput : ReportOutput = null;
  
  private reportTopChartController: ReportTopChartController;
  @ViewChild(ReportTopChartController) set setReportTopChartController(content: ReportTopChartController) {
    this.reportTopChartController = content;

    if (this.reportTopChartController != undefined)
    {
      this.reportTopChartController.updateDataPull();
    }
    this.cd.detectChanges();
  }


  private assessmentBreakdownComponent: AssessmentBreakdownComponent;
  @ViewChild(AssessmentBreakdownComponent) set setAssessmentBreakdown(content: AssessmentBreakdownComponent) {
    this.assessmentBreakdownComponent = content;

    if (this.isWeekSelected && !this.isTraineeSelected){
      this.assessmentBreakdownComponent.updateDataPull();
    }
    this.cd.detectChanges();
  }

  public isTraineeSelected: boolean = false;
  public isWeekSelected: boolean = false;

  constructor(private reportService : ReportService, private cd: ChangeDetectorRef) { } 
  //@ViewChild(TabularTraineeAverageListComponent) cumulativeScoreComponents: TabularTraineeAverageListComponent;
  @ViewChild(OverallQCScoresComponent) overAllQCReport: OverallQCScoresComponent;

  ngOnInit() {
  }

  showOverAllQC(){
    if (this.reportService.getTrainee != null) {
      return (this.reportService.getWeek() == 0) && this.reportService.getTrainee()['traineeId'] == -1; 
    }
    return false;
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.isTraineeSelected = this.reportService.trainee.traineeId > 0;
    this.isWeekSelected = this.reportService.week > 0;
    this.reportOutput = reportOutput;
    //console.log("=====================================\n== The Report is Updating Children ==\n");
    //console.log("Selected Trainee:"); // Adam needs these values for showing his component
    //console.log(this.reportOutput.selectedTrainee);
    //console.log("Selected Week:");// Let Jimmy know if you need other custom values on the reportOutput object
    //console.log(this.reportOutput.selectedWeek);
    //console.log("The Cumulative Score component has been updated!");
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
    // console.log("Get all Batch Assessments");
    // console.log(this.reportService.getBatchAssessmentDataStore());
    //this.reportTopChartController.updateDataPull();
    
    if (this.overAllQCReport != undefined)
    {
      this.overAllQCReport.update(this.reportService.getQANoteDataStore());
    }
    if (this.reportTopChartController != undefined)
    {
      this.reportTopChartController.updateDataPull();
    }
    if (this.assessmentBreakdownComponent != undefined){
      this.assessmentBreakdownComponent.updateDataPull();
    }
  }
}