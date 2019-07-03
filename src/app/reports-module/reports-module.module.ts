import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { BarLineChartComponent } from '../reports/Components/bar-line-chart/bar-line-chart.component';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
<<<<<<< HEAD
import { IndividualQCResultsTableComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-table.component';
import { IndividualQcresultsRowComponent } from '../reports/Components/individual-qcresults-table/individual-qcresults-row/individual-qcresults-row.component';
=======
import { ReportTopChartController } from '../reports/Components/report-top-chart-controller/report-top-chart-controller.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CumulativeScoresComponent } from '../reports/Components/cumulative-scores/cumulative-scores.component';
>>>>>>> cfda34f3986e0875df9dee16a1ee2d30b4f3ee5d

@NgModule({
  declarations: [

    ReportsComponent,
    ToolbarComponent,
<<<<<<< HEAD
    IndividualQCResultsTableComponent,
    IndividualQcresultsRowComponent
=======
    ReportTopChartController,
    CumulativeScoresComponent,
    BarLineChartComponent,
>>>>>>> cfda34f3986e0875df9dee16a1ee2d30b4f3ee5d
  ],

  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ChartsModule,
    
  ],
  providers: [
    ReportService,
  ]
})
export class ReportsModule { }
