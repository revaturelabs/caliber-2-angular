import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchViewComponent } from '../batch-view/batch-view.component';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
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
