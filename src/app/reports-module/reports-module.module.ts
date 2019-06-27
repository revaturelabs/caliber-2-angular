import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { BarChartComponent } from '../reports/Components/bar-chart/bar-chart.component';
import { AssessmentBreakdownComponent } from '../reports/Components/assessment-breakdown/assessment-breakdown.component';
 
@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
    BarChartComponent,
    AssessmentBreakdownComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
