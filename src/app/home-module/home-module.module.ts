import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.service';
import { HomeComponent } from '../home/component/home/home.component';
import { HomeToolbarComponent } from '../home/component/home-toolbar/home-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LastQualityAuditGraphComponent } from '../home/component/last-quality-audit-graph/last-quality-audit-graph.component';
import { LastQualityAuditTableComponent } from '../home/component/last-quality-audit-table/last-quality-audit-table.component';
import { LastQualityAuditComponent } from '../home/component/last-quality-audit/last-quality-audit.component';
import { LocationService } from '../home/service/location.service';
import { AssessBatchService } from '../Assess-Batch/Services/assess-batch.service';
import { QanoteService } from '../home/service/qanote.service';
import { HomeService } from '../home/service/home.service';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    ChartsModule,
  ],
  declarations: [
    HomeComponent,
    LastQualityAuditComponent,
    LastQualityAuditGraphComponent,
    LastQualityAuditTableComponent,
    HomeToolbarComponent,
  ],
  providers: [
    LocationService,
    AssessBatchService,
    QanoteService,
    HomeService,
  ]
})
export class HomeModule { }
