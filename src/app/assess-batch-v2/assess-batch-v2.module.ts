import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessBatchConatinerComponent } from './components/assess-batch-conatiner/assess-batch-conatiner.component';
import { AssessBatchV2RoutingModule } from './assess-batch-v2-routing.module';
import { BatchSelectToolbarComponent } from './components/batch-select-toolbar/batch-select-toolbar.component';
import { SharedDropdownMenuComponent } from './components/shared-dropdown-menu/shared-dropdown-menu.component';
import { CreateAssessmentButtonComponent } from './components/create-assessment-button/create-assessment-button.component';
import { ImportGradesButtonComponent } from './components/import-grades-button/import-grades-button.component';
import { FormatDirective } from './directives/format.directive';
import { AssessAssociateListComponent } from './components/assess-associate-list/assess-associate-list.component';

@NgModule({
  declarations: [AssessBatchConatinerComponent, BatchSelectToolbarComponent, SharedDropdownMenuComponent, CreateAssessmentButtonComponent, ImportGradesButtonComponent, FormatDirective, AssessAssociateListComponent],
  imports: [
    CommonModule,
    AssessBatchV2RoutingModule
  ]
})
export class AssessBatchV2Module { }
