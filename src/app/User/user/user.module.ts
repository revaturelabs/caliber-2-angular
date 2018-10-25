import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewtraineesComponent } from './Components/viewtrainees/viewtrainees.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ViewtraineesComponent],
  exports: [
    ViewtraineesComponent
  ]
})
export class UserModule { }
