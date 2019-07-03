import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import {  OverallQCScoresComponent } from '../reports/Components/overall-qc-scores/overall-qc-scores.component'
import { BarLineChartComponent } from '../reports/Components/bar-line-chart/bar-line-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ReportsComponent,
    OverallQCScoresComponent,
    BarLineChartComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgbModule
  ],
  providers: [
    ReportService,
    OverallQCScoresComponent,
  ],
  exports: [
    OverallQCScoresComponent,
  ],
  bootstrap: [
    OverallQCScoresComponent
  ],
})
export class ReportsModule { }
