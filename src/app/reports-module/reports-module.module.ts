import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import { IndividualQCResultsTableComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-table.component';
import { IndividualQcresultsRowComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-row/individual-qcresults-row.component';

@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
    IndividualQCResultsTableComponent,
    IndividualQcresultsRowComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    
  ],
  providers: [
    ReportService,
  ]
})
export class ReportsModule { }
