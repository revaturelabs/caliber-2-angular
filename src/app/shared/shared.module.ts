import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal";
import { AssessmentDialogComponent } from './components/assessment-dialog/assessment-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AssessmentResultSpinnerComponent } from './components/assessment-result-spinner/assessment-result-spinner.component';
import { AssociateFlagDialogComponent } from './components/associate-flag-dialog/associate-flag-dialog.component';
import { FlagComponent } from './components/flag/flag.component';
import { ImportGradesDialogComponent } from './components/import-grades-dialog/import-grades-dialog.component';

@NgModule({
  declarations: [AssessmentDialogComponent, AssessmentResultSpinnerComponent, AssociateFlagDialogComponent, FlagComponent, ImportGradesDialogComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    ModalModule,
    AssessmentResultSpinnerComponent,
    FlagComponent,
  ],
  entryComponents: [
    AssessmentDialogComponent,
    AssociateFlagDialogComponent,
    ImportGradesDialogComponent
  ]
})
export class SharedModule { }
