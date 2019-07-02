import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BarLineChartComponent } from '../bar-line-chart/bar-line-chart.component';
import { ReportService } from '../../Service/report.service';

@Component({
  selector: 'app-assessment-breakdown',
  templateUrl: './assessment-breakdown.component.html',
  styleUrls: ['./assessment-breakdown.component.css']
})
export class AssessmentBreakdownComponent implements OnInit {
  public tableCol1 = "Project";
  public tableCol2 = "Exam"
  public tableCol3 = "Verbal"
  public tableCol4 = "Other"
  public traineeProject = "91.00";
  public traineeExam = "84.89";
  public traineeOther = "73.00";
  public traineeVerbal = "91.43";
  public batchProject = "91.92";
  public batchExam = "81.81";
  public batchOther = "58.92";
  public batchVerbal = "89.45";

  @ViewChild(BarLineChartComponent) chart : BarLineChartComponent;


  constructor(private reportsService : ReportService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(){

    this.chart.initializeChart();
    this.chart.addDataset("Category 1");
    this.chart.addDataPoint(75, "Test Data", 0);
    this.cd.detectChanges();
  }

  public onDownloadClick(e: any) : void {

  }
}
