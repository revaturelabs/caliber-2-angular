import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { BarLineChartComponent } from '../reports/Components/bar-line-chart/bar-line-chart.component';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { WeeklyReportsComponent } from '../reports/weekly-reports/weekly-reports.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportsComponent, 
    BarLineChartComponent,
    ToolbarComponent,
    WeeklyReportsComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ChartsModule,
    
  ],
  providers: [
    ReportService,
  ]
})
export class ReportsModule { }
