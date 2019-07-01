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
import { ToolbarComponent } from './reports/Components/toolbar/toolbar.component';
import { IndividualQCResultsTableComponent } from './reports/Components/individual-qcresults-table/individual-qcresults-table.component';
import { MatTableModule } from '@angular/material';
import { IndividualQcresultsRowComponent } from './individual-qcresults-row/individual-qcresults-row.component';
// import { MaterialModule } from './material.module';
//import { UpdateDeleteAssessmentModalComponent } from './Assess-Batch/Components/toolbar/update-delete-assessment-modal/update-delete-assessment-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    CreateModalComponent,
    FormModalComponent,
    IndividualQCResultsTableComponent,
    IndividualQcresultsRowComponent,
   // UpdateDeleteAssessmentModalComponent,
    
  ],
  imports: [
    BrowserModule,
    UserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent]
 
})
export class AppModule { }
