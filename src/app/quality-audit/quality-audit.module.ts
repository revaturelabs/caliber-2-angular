import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityAuditContainerComponent } from './components/quality-audit-container/quality-audit-container.component';
import {QualityAuditRoutingModule} from "./quality-audit-routing.module";
import {SharedModule} from "../shared/shared.module";
import { QualityAuditListComponent } from './components/quality-audit-list/quality-audit-list.component';
import { CategoriesThisWeekComponent } from './components/categories-this-week/categories-this-week.component';
import { QcFeedbackComponent } from './components/qc-feedback/qc-feedback.component';

@NgModule({
  declarations: [QualityAuditContainerComponent, QualityAuditListComponent, CategoriesThisWeekComponent, QcFeedbackComponent],
  imports: [
    CommonModule,
    QualityAuditRoutingModule,
    SharedModule
  ]
})
export class QualityAuditModule { }
