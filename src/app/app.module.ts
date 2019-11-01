import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';
import {UserModule} from './User/user/user.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {ErrorComponent} from './error-handling/error/error.component';
import {AppRoutingModule} from './app-routing.module';
import {CreateModalComponent} from './Assess-Batch/Modals/create-modal/create-modal.component';
import {FormModalComponent} from './Assess-Batch/Components/toolbar/form-modal/form-modal.component';
import {AssessBatchService} from "./services/assess-batch.service";
import {QaService} from "./services/qa.service";
import {CategoryService} from "./services/subvertical/category/category.service";
import {QaNotesService} from "./services/subvertical/quality-audit/qa-notes.service";
import {QaCategoryService} from "./services/subvertical/quality-audit/qa-category.service";
import {AssessmentService} from "./services/subvertical/assessment/assessment.service";
import {AssessmentGradeService} from "./services/subvertical/assessment/assessment-grade.service";
import {AssessmentNotesService} from "./services/subvertical/assessment/assessment-notes.service";
import {ChronoService} from "./services/subvertical/util/chrono.service";
import {TraineeService} from "./services/subvertical/user/trainee.service";
import {BatchService} from "./services/subvertical/batch/batch.service";
import {ReportService} from "./services/report.service";
import {ManageBatchService} from "./services/manage-batch.service";
import {LocationService} from "./services/subvertical/location/location.service";
import {SkilltypeService} from "./services/subvertical/skilltype/skilltype.service";
import {TrainerService} from "./services/subvertical/user/trainer.service";
import {HomeService} from "./services/home.service";
import {ToastService} from './services/toast.service';
import {ReportsService} from "./services/reports.service";
import {AuthModule} from "./auth/auth.module";
import {ProgressBarComponent} from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    CreateModalComponent,
    FormModalComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ // Global Toast Config Options
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      maxOpened: 5
    }),
    AuthModule,
  ],
  providers: [
    AssessBatchService,
    AssessmentService,
    AssessmentGradeService,
    AssessmentNotesService,
    CategoryService,
    QaService,
    SkilltypeService,
    QaNotesService,
    QaCategoryService,
    ChronoService,
    TraineeService,
    TrainerService,
    BatchService,
    ReportService,
    ManageBatchService,
    LocationService,
    HomeService,
    ReportsService,
    ToastService,
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    FormModalComponent
  ]
})
export class AppModule { }
