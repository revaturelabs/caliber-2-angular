import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageBatchContainerComponent} from './components/manage-batch-container/manage-batch-container.component';
import {ManageBatchRoutingModule} from "./manage-batch-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ManageBatchToolbarComponent} from './components/manage-batch-toolbar/manage-batch-toolbar.component';
import {CreateBatchButtonComponent} from './components/create-batch-button/create-batch-button.component';
import {ImportBatchButtonComponent} from './components/import-batch-button/import-batch-button.component';
import {BatchListComponent} from './components/batch-list/batch-list.component';
import {ManageBatchActionsComponent} from './components/manage-batch-actions/manage-batch-actions.component';
import {BatchModalComponent} from './components/batch-modal/batch-modal.component';
import {BatchModalService} from "./services/batch-modal.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CoTrainerPipe} from "./pipes/cotrainer.pipe";
import {TraineeActionsComponent} from './components/trainee-actions/trainee-actions.component';
import {ViewTraineesModalComponent} from './components/view-trainees-modal/view-trainees-modal.component';
import {ViewTraineesModalService} from "./services/view-trainees-modal.service";
import {TraineeModalComponent} from './components/trainee-modal/trainee-modal.component';
import {TraineeModalService} from "./services/trainee-modal.service";
import {DeleteModalComponent} from './components/delete-trainee-modal/delete-modal.component';
import {SwitchBatchModalComponent} from './components/switch-batch-modal/switch-batch-modal.component';
import {DeleteModalService} from "./services/delete-modal.service";
import {UserModule} from "../User/user/user.module";
import {AddTraineeButtonComponent} from './components/add-trainee-button/add-trainee-button.component';
import {SwitchBatchesModalService} from "./services/switch-batches-modal.service";
import {SwitchBatchPipe} from "./pipes/switch-batch.pipe";

@NgModule({
  declarations: [
    ManageBatchContainerComponent,
    ManageBatchToolbarComponent,
    CreateBatchButtonComponent,
    ImportBatchButtonComponent,
    BatchListComponent,
    ManageBatchActionsComponent,
    BatchModalComponent,
    CoTrainerPipe,
    SwitchBatchPipe,
    TraineeActionsComponent,
    ViewTraineesModalComponent,
    TraineeModalComponent,
    DeleteModalComponent,
    SwitchBatchModalComponent,
    AddTraineeButtonComponent,
  ],
  imports: [
    CommonModule,
    ManageBatchRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    UserModule,
  ],
  providers: [
    BatchModalService,
    ViewTraineesModalService,
    TraineeModalService,
    DeleteModalService,
    SwitchBatchesModalService
  ],
  entryComponents: [
    BatchModalComponent,
    ViewTraineesModalComponent,
    TraineeModalComponent,
    DeleteModalComponent,
    SwitchBatchModalComponent
  ]
})
export class ManageBatchModule { }
