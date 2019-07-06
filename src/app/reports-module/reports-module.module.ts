import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import {  OverallQCScoresComponent } from '../reports/Components/overall-qc-scores/overall-qc-scores.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BarLineChartComponent } from '../reports/Components/bar-line-chart/bar-line-chart.component';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { IndividualQCResultsTableComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-table.component';
import { IndividualQcresultsRowComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-row/individual-qcresults-row.component';
import { ReportTopChartController } from '../reports/Components/report-top-chart-controller/report-top-chart-controller.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CumulativeScoresComponent } from '../reports/Components/cumulative-scores/cumulative-scores.component';

@NgModule({
  declarations: [

    ReportsComponent,
    OverallQCScoresComponent,
    BarLineChartComponent,
    ToolbarComponent,
    IndividualQCResultsTableComponent,
    IndividualQcresultsRowComponent,
    ReportTopChartController,
    CumulativeScoresComponent,
    BarLineChartComponent,
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
  ],
  exports: [
    OverallQCScoresComponent,
  ],
  bootstrap: [
    OverallQCScoresComponent
  ],
})
export class ReportsModule { }
