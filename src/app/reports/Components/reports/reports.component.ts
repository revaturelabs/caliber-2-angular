
import { WeeklyQualityAuditComponent } from './../weekly-quality-audit/weekly-quality-audit.component';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { OverallQCScoresComponent } from '../overall-qc-scores/overall-qc-scores.component';
import { Trainee } from 'src/app/Batch/type/trainee';
import { ReportService } from '../../Service/report.service';
import { AssessmentBreakdownComponent } from '../assessment-breakdown/assessment-breakdown.component';
import { ReportTopChartController } from '../report-top-chart-controller/report-top-chart-controller.component';
import { WeeklyReportComponent } from '../weekly-report/weekly-report.component';
import { TechRadarComponent } from '../tech-radar/tech-radar.component';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput: ReportOutput = null;
  @ViewChild(TechRadarComponent) techRadarComponents: TechRadarComponent;
  @ViewChild(OverallQCScoresComponent) overAllQCReport: OverallQCScoresComponent;
  private weeklyQualityAuditComponent: WeeklyQualityAuditComponent;
  private reportTopChartController: ReportTopChartController;
  @ViewChild(ReportTopChartController) set setReportTopChartController(content: ReportTopChartController) {
    this.reportTopChartController = content;

    if (this.reportTopChartController !== undefined) {
      this.reportTopChartController.updateDataPull();
    }
    this.cd.detectChanges();
  }

  @ViewChild(WeeklyReportComponent) weeklyReportsComponent: WeeklyReportComponent;


  private assessmentBreakdownComponent: AssessmentBreakdownComponent;
  @ViewChild(AssessmentBreakdownComponent) set setAssessmentBreakdown(content: AssessmentBreakdownComponent) {
    this.assessmentBreakdownComponent = content;

    if (this.isWeekSelected && !this.isTraineeSelected) {
      this.assessmentBreakdownComponent.updateDataPull();
    }
    this.cd.detectChanges();
  }
  @ViewChild(WeeklyQualityAuditComponent) set setWeeklyQualityAudit(content: WeeklyQualityAuditComponent) {
    this.weeklyQualityAuditComponent = content;
      if (this.isWeekSelected && !this.isTraineeSelected){
        this.weeklyQualityAuditComponent.updateDataPull();
      }
      this.cd.detectChanges();
    }

  public isTraineeSelected: boolean = false;
  public isWeekSelected: boolean = false;

  constructor(private reportService: ReportService, private cd: ChangeDetectorRef) { }


  ngOnInit() {
  }

  showOverAllQC() {
    if (this.reportService.getTrainee() !== undefined && this.reportService.getTrainee() !== null) {
      return ((this.reportService.getWeek() === 0) && this.reportService.getTrainee().traineeId === -1);
    }
    return false;
  }

  updateReportOutput(reportOutput: ReportOutput) {
    this.isTraineeSelected = this.reportService.trainee.traineeId > 0;
    this.isWeekSelected = this.reportService.week > 0;
    this.reportOutput = reportOutput;

    if (this.weeklyQualityAuditComponent !== undefined && this.weeklyQualityAuditComponent !== null){
      this.weeklyQualityAuditComponent.updateDataPull();
    }
    if (this.overAllQCReport !== undefined && this.overAllQCReport !== null)
    {
      this.overAllQCReport.update(this.reportService.getQANoteDataStore());
    }
    if (this.reportTopChartController !== undefined && this.reportTopChartController !== null)
    {
      this.reportTopChartController.updateDataPull();
    }
    if (this.assessmentBreakdownComponent !== undefined && this.assessmentBreakdownComponent !== null){
      this.assessmentBreakdownComponent.updateDataPull();
    }
    if (this.weeklyReportsComponent != undefined)
    {
      this.weeklyReportsComponent.update();
    }
    if (this.techRadarComponents !== undefined && this.techRadarComponents !== null) {
      this.techRadarComponents.updateDataPull();
    }
  }
}
