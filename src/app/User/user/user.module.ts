import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTraineesComponent } from './Components/view-trainees/view-trainees.component';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from './Pipes/trainee-toggle.pipe';
import {HttpClientModule} from '@angular/common/http';
import { AddTraineeComponent } from './Components/add-trainee/add-trainee.component';
import { DeleteTraineeComponent } from './Components/delete-trainee/delete-trainee.component';
import { SwitchBatchComponent } from './Components/switch-batch/switch-batch.component';
import { SwitchBatchPipe } from './Pipes/switch-batch.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [ViewTraineesComponent, TraineeTogglePipe, SwitchBatchComponent, AddTraineeComponent, DeleteTraineeComponent, SwitchBatchPipe],
  exports: [
    AddTraineeComponent,
    ViewTraineesComponent,
    SwitchBatchComponent,
    TraineeTogglePipe
  ]
})
export class UserModule { }
