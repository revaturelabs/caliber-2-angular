import { ReportsRoutingModule } from './reports-routing.service';
import { ReportsComponent } from './../reports/reports.component';
import { BatchOverallTechnologyCapabilityComponent } from './../reports/Components/batch-overall-technology-capability/batch-overall-technology-capability.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechRadarComponent } from '../reports/Components/tech-radar/tech-radar.component';
import { ChartsModule } from 'ng2-charts';
import { ReportService } from '../reports/Service/report.service';

@NgModule({
  declarations: [
    ReportsComponent,
    BatchOverallTechnologyCapabilityComponent,
    TechRadarComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ChartsModule
  ],
  providers: [
    ReportService,
  ]
})
export class ReportsModule { }
