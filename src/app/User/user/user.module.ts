import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewtraineesComponent } from './Components/view-trainees/view-trainees.component';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from './Pipes/trainee-toggle.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ViewtraineesComponent, TraineeTogglePipe],
  exports: [
    ViewtraineesComponent
  ]
})
export class UserModule { }
