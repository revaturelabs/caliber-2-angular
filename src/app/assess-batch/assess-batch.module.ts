import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssessBatchConatinerComponent} from './components/assess-batch-conatiner/assess-batch-conatiner.component';
import {AssessBatchRoutingModule} from './assess-batch-routing.module';
import {CreateAssessmentButtonComponent} from './components/create-assessment-button/create-assessment-button.component';
import {ImportGradesButtonComponent} from './components/import-grades-button/import-grades-button.component';
import {AssessAssociateListComponent} from './components/assess-associate-list/assess-associate-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssessmentDetailsColumnComponent} from './components/assessment-details-column/assessment-details-column.component';
import {AssessmentDetailsRowComponent} from './components/assessment-details-row/assessment-details-row.component';
import {MockSaveComponent} from "./components/mock-save/mock-save.component";
import {SharedModule} from "../shared/shared.module";
import {BrandedIconModule} from "../branded-icon/branded-icon.module";

@NgModule({
  declarations: [
    AssessBatchConatinerComponent,
    CreateAssessmentButtonComponent,
    ImportGradesButtonComponent,
    AssessAssociateListComponent,
    AssessmentDetailsColumnComponent,
    AssessmentDetailsRowComponent,
    MockSaveComponent,
  ],
  imports: [
    CommonModule,
    AssessBatchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BrandedIconModule
  ],
  exports: [MockSaveComponent]
})
export class AssessBatchModule {
}
