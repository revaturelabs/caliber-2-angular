import { ReportsComponent } from './../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechRadarComponent } from '../reports/Components/tech-radar/tech-radar.component';
import {  OverallQCScoresComponent } from '../reports/Components/overall-qc-scores/overall-qc-scores.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AssessmentBreakdownComponent } from './../reports/Components/assessment-breakdown/assessment-breakdown.component';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { IndividualQCResultsTableComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-table.component';
import { IndividualQcresultsRowComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-row/individual-qcresults-row.component';
import { ReportTopChartController } from '../reports/Components/report-top-chart-controller/report-top-chart-controller.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CumulativeScoresComponent } from '../reports/Components/cumulative-scores/cumulative-scores.component';
import { HttpClient } from '@angular/common/http';
import { WeeklyReportComponent } from '../reports/Components/weekly-report/weekly-report.component';
import { WeeklyQualityAuditComponent } from '../reports/Components/weekly-quality-audit/weekly-quality-audit.component';

@NgModule({
  declarations: [
    ReportsComponent,
    TechRadarComponent,
    AssessmentBreakdownComponent,
    OverallQCScoresComponent,
    ToolbarComponent,
    IndividualQCResultsTableComponent,
    IndividualQcresultsRowComponent,
    ReportTopChartController,
    CumulativeScoresComponent,
    WeeklyReportComponent,
    WeeklyQualityAuditComponent,
  ],

  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [
    ReportService,
    OverallQCScoresComponent,
    HttpClient
  ],
  exports: [
    OverallQCScoresComponent,
  ],
  bootstrap: [
    OverallQCScoresComponent
  ],
})
export class ReportsModule { }
