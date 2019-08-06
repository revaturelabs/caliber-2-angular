import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTraineesComponent } from './Components/view-trainees/view-trainees.component';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from './Pipes/trainee-toggle.pipe';
import {HttpClientModule} from '@angular/common/http';
import { AddTraineeComponent } from './Components/add-trainee/add-trainee.component';
import { UpdateTraineeComponent } from './Components/update-trainee/update-trainee.component';
import { DeleteTraineeComponent } from './Components/delete-trainee/delete-trainee.component';
import { SwitchBatchComponent } from './Components/switch-batch/switch-batch.component';
import { ViewTrainersComponent } from './Components/view-trainers/view-trainers.component';
import { UserRoutingModule } from './user-routing.module';

import { AddTrainerComponent } from './Components/add-trainer/add-trainer.component';
import { EditTrainerComponent } from './Components/edit-trainer/edit-trainer.component';
import { AddTrainerComponent } from './Components/add-trainer/add-trainer.component';
import { DisableTrainerComponent } from './Components/disable-trainer/disable-trainer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    HttpClientModule
  ],
  declarations: [
    ViewTraineesComponent,
    SwitchBatchComponent,
    TraineeTogglePipe,
    AddTraineeComponent,
    DeleteTraineeComponent,
    UpdateTraineeComponent,
    ViewTrainersComponent,
    AddTrainerComponent,
    EditTrainerComponent,
    AddTrainerComponent,
    DisableTrainerComponent

  ],
  exports: [
    AddTraineeComponent,
    ViewTraineesComponent,
    UpdateTraineeComponent,
    TraineeTogglePipe,
    DeleteTraineeComponent,
    SwitchBatchComponent
  ]
})
export class UserModule { }
