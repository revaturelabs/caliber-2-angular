import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTraineesComponent } from './Components/view-trainees/view-trainees.component';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from './Pipes/trainee-toggle.pipe';
import {HttpClientModule} from '@angular/common/http';
import { AddTraineeComponent } from './Components/add-trainee/add-trainee.component';
import { UpdateTraineeComponent } from './Components/update-trainee/update-trainee.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [ViewTraineesComponent, TraineeTogglePipe, AddTraineeComponent, UpdateTraineeComponent],
  exports: [
    AddTraineeComponent,
    ViewTraineesComponent,
    UpdateTraineeComponent,
    TraineeTogglePipe
  ]
})
export class UserModule { }
