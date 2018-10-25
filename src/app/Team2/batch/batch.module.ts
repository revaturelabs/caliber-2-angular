import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchViewComponent } from '../batch-view/batch-view.component';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BatchViewComponent,
    BatchModalComponent
  ],
  exports: [
    BatchViewComponent,
    BatchModalComponent
  ]
})
export class BatchModule { }
