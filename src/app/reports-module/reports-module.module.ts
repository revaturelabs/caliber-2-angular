import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
<<<<<<< HEAD
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
 
=======
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';

>>>>>>> b674cf021c683f6b25ee0e63e95f749d7fe76da5
@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
<<<<<<< HEAD
=======
    
  ],
  providers: [
    ReportService,
>>>>>>> b674cf021c683f6b25ee0e63e95f749d7fe76da5
  ]
})
export class ReportsModule { }
