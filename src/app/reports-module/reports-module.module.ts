import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { TabularTraineeAverageListComponent } from '../reports/Components/tabular-trainee-average-list/tabular-trainee-average-list.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
    TabularTraineeAverageListComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ChartsModule,
    
  ],
  providers: [
    ReportService,
  ]
})
export class ReportsModule { }
