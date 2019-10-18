import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsContainerComponent} from './components/reports-container/reports-container.component';
import {ReportsV2RoutingModule} from "./reports-v2-routing.module";
import {ReportsToolbarComponent} from './components/reports-toolbar/reports-toolbar.component';
import {SharedModule} from "../shared/shared.module";
import {CompareAssessmentScoresComponent} from './components/compare-assessment-scores/compare-assessment-scores.component';
import {ChartsModule} from "ng2-charts";
import {QcScoresComponent} from './components/qc-scores/qc-scores.component';
import { WeeklyProgressComponent } from './components/weekly-progress/weekly-progress.component';
import { TechnicalStatusComponent } from './components/technical-status/technical-status.component';

@NgModule({
  declarations: [
    ReportsContainerComponent,
    ReportsToolbarComponent,
    CompareAssessmentScoresComponent,
    QcScoresComponent,
    WeeklyProgressComponent,
    TechnicalStatusComponent,
  ],
  imports: [
    CommonModule,
    ReportsV2RoutingModule,
    SharedModule,
    ChartsModule
  ]
})
export class ReportsV2Module { }
