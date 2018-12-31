import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchViewComponent } from '../batch-view/batch-view.component';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from 'src/app/User/user/user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule
    ],
  declarations: [
    BatchViewComponent,
    BatchModalComponent
  ],
  exports: [
    BatchViewComponent,
    BatchModalComponent
  ],
  bootstrap: [
    BatchViewComponent
  ]
})
export class BatchModule { }
