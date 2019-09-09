import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessBatchConatinerComponent } from './components/assess-batch-conatiner/assess-batch-conatiner.component';
import { AssessBatchV2RoutingModule } from './assess-batch-v2-routing.module';
import { BatchSelectToolbarComponent } from './components/batch-select-toolbar/batch-select-toolbar.component';
import { SharedDropdownMenuComponent } from './components/shared-dropdown-menu/shared-dropdown-menu.component';
import { CreateAssessmentButtonComponent } from './components/create-assessment-button/create-assessment-button.component';
import { ImportGradesButtonComponent } from './components/import-grades-button/import-grades-button.component';
import { AssessAssociateListComponent } from './components/assess-associate-list/assess-associate-list.component';
import { AssociateDetailsComponent } from './components/associate-details/associate-details.component';
import { AssociateNotesComponent } from './components/associate-notes/associate-notes.component';
import {ReactiveFormsModule} from "@angular/forms";
import { WeekSelectorComponent } from './components/week-selector/week-selector.component';
import { AssessmentDetailsColumnComponent } from './components/assessment-details-column/assessment-details-column.component';
import { AssessmentDetailsRowComponent } from './components/assessment-details-row/assessment-details-row.component';
import { BatchLevelFeedbackComponent } from './components/batch-level-feedback/batch-level-feedback.component';

@NgModule({
  declarations: [AssessBatchConatinerComponent, BatchSelectToolbarComponent, SharedDropdownMenuComponent, CreateAssessmentButtonComponent, ImportGradesButtonComponent, AssessAssociateListComponent, AssociateDetailsComponent, AssociateNotesComponent, WeekSelectorComponent, AssessmentDetailsColumnComponent, AssessmentDetailsRowComponent, BatchLevelFeedbackComponent],
  imports: [
    CommonModule,
    AssessBatchV2RoutingModule,
    ReactiveFormsModule
  ]
})
export class AssessBatchV2Module { }
