import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.service';
import { HomeComponent } from './../home/component/home/home.component';
import { HomeToolbarComponent } from '../home/component/home-toolbar/home-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LastQualityAuditGraphComponent } from '../home/component/last-quality-audit-graph/last-quality-audit-graph.component';
import { LastQualityAuditTableComponent } from '../home/component/last-quality-audit-table/last-quality-audit-table.component';
import { LastQualityAuditComponent } from '../home/component/last-quality-audit/last-quality-audit.component';
import { MissingGradesListComponent } from '../home/component/missing-grades-list/missing-grades-list.component';
import { LocationService } from '../home/service/location.service';
import { AssessBatchService } from '../services/subvertical/assessment/assess-batch.service';
import { QanoteService } from '../home/service/qanote.service';
import { HomeService } from '../home/service/home.service';
// import { ChartsModule } from 'ng2-charts';
import { TraineeService } from '../services/subvertical/assessment/trainee.service';
import {ChartsModule} from 'ng2-charts';
import { PillComponent } from '../home/component/pills/pill/pill.component';
import { PillBoxComponent } from '../home/component/pills/pill-box/pill-box.component';

import { DropdownButtonComponent } from '../home/component/pills/dropdown-button/dropdown-button.component';


@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    ChartsModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    LastQualityAuditComponent,
    LastQualityAuditGraphComponent,
    LastQualityAuditTableComponent,
    HomeToolbarComponent,
    LastQualityAuditComponent,
    MissingGradesListComponent,
    PillBoxComponent,
    PillComponent,
    DropdownButtonComponent
  ],
  providers: [
    LocationService,
    AssessBatchService,
    QanoteService,
    HomeService,
    TraineeService
  ]
})
export class HomeModule { }
