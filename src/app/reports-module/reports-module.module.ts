import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { BarLineChartComponent } from '../reports/Components/bar-line-chart/bar-line-chart.component';
import { AssessmentBreakdownComponent } from '../reports/Components/assessment-breakdown/assessment-breakdown.component';
import { TabularTraineeAverageListComponent } from '../reports/Components/tabular-trainee-average-list/tabular-trainee-average-list.component';
 
@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
    BarLineChartComponent,
    AssessmentBreakdownComponent,
    TabularTraineeAverageListComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
