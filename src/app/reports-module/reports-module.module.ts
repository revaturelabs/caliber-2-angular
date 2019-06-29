import { BatchOverallTechnologyCapabilityComponent } from './../reports/Components/batch-overall-technology-capability/batch-overall-technology-capability.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { TechRadarComponent } from '../reports/Components/tech-radar/tech-radar.component';
import { ChartsModule } from 'ng2-charts';

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
  ]
})
export class ReportsModule { }
