import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { UserModule } from './User/user/user.module';
import { BatchModule } from '../app/Batch/batch/batch.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error-handling/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import * as $ from 'jquery';
import { CreateModalComponent } from './Assess-Batch/Modals/create-modal/create-modal.component';
import { FormModalComponent } from './Assess-Batch/Components/toolbar/form-modal/form-modal.component';
import { PillBoxComponent } from './pill-box/pill-box.component';
import { PillComponent } from './home/component/missing-grades-list/pill-box/pill/pill.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    CreateModalComponent,
    FormModalComponent,
    PillBoxComponent,
    PillComponent,

  ],
  imports: [
    BrowserModule,
    UserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    FormModalComponent
  ]
})
export class AppModule { }
