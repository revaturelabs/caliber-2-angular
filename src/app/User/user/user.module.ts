import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTraineesComponent } from './Components/view-trainees/view-trainees.component';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from './Pipes/trainee-toggle.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [ViewTraineesComponent, TraineeTogglePipe],
  exports: [
    ViewTraineesComponent,
    TraineeTogglePipe
  ]
})
export class UserModule { }
