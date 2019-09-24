import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBatchContainerComponent } from './components/manage-batch-container/manage-batch-container.component';
import {ManageBatchRoutingModule} from "./manage-batch-routing.module";
import {SharedModule} from "../shared/shared.module";
import { ManageBatchToolbarComponent } from './components/manage-batch-toolbar/manage-batch-toolbar.component';
import { CreateBatchButtonComponent } from './components/create-batch-button/create-batch-button.component';
import { ImportBatchButtonComponent } from './components/import-batch-button/import-batch-button.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { ManageBatchActionsComponent } from './components/manage-batch-actions/manage-batch-actions.component';
import { EditBatchModalComponent } from './components/edit-batch-modal/edit-batch-modal.component';
import { ViewTraineesModalComponent } from './components/view-trainees-modal/view-trainees-modal.component';
import {ImportGradesDialogService} from "../shared/services/import-grades-dialog.service";
import {ViewTraineesModalService} from "./services/view-trainees-modal.service";
import {EditBatchModalService} from "./services/edit-batch-modal.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ManageBatchContainerComponent,
    ManageBatchToolbarComponent,
    CreateBatchButtonComponent,
    ImportBatchButtonComponent,
    BatchListComponent,
    ManageBatchActionsComponent,
    EditBatchModalComponent,
    ViewTraineesModalComponent,
  ],
  imports: [
    CommonModule,
    ManageBatchRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    ViewTraineesModalService,
    EditBatchModalService
  ],
  entryComponents: [
    ViewTraineesModalComponent,
    EditBatchModalComponent
  ]
})
export class ManageBatchModule { }
