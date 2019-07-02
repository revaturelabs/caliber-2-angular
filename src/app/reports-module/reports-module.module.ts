import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { BarLineChartComponent } from '../reports/Components/bar-line-chart/bar-line-chart.component';
import { AssessmentBreakdownComponent } from './../reports/Components/assessment-breakdown/assessment-breakdown.component';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ReportsComponent, 
    BarLineChartComponent,
    AssessmentBreakdownComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    
  ],
  providers: [
    ReportService,
  ]
})
export class ReportsModule { }
