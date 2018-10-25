import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewtraineesComponent } from './Components/viewtrainees/viewtrainees.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewtraineesComponent],
  exports: [
    ViewtraineesComponent
  ]
})
export class UserModule { }
