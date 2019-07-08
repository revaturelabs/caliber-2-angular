import { AssessmentBreakdownComponent } from './../assessment-breakdown/assessment-breakdown.component';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CumulativeScoresComponent } from '../cumulative-scores/cumulative-scores.component';
import { ReportService } from '../../Service/report.service';

@Component({
  selector: 'app-report-top-chart-controller',
  templateUrl: './report-top-chart-controller.component.html',
  styleUrls: ['./report-top-chart-controller.component.css']
})
export class ReportTopChartController implements OnInit {
  private assessmentBreakdownComponent: AssessmentBreakdownComponent;

  @ViewChild(AssessmentBreakdownComponent) set setAssessmentBreakdown(content: AssessmentBreakdownComponent) {
      this.assessmentBreakdownComponent = content;

      if (this.isTraineeSelected ){
        this.assessmentBreakdownComponent.updateDataPull();
      }
      this.cd.detectChanges();
  }

  
  private cumulativeScoresComponent: CumulativeScoresComponent;

  @ViewChild(CumulativeScoresComponent) set setCumulativeScores(content: CumulativeScoresComponent) {
      this.cumulativeScoresComponent = content;

      if (this.cumulativeScoresComponent != undefined) {
        this.cumulativeScoresComponent.updateDataPull();
      }
      this.cd.detectChanges();
  }

  public isTraineeSelected: boolean = false;

  constructor(private reportService: ReportService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  updateDataPull() {
    this.isTraineeSelected = this.reportService.trainee.traineeId > 0;
    if (this.cumulativeScoresComponent != undefined) {
      this.cumulativeScoresComponent.updateDataPull();
    }
    
    if (this.assessmentBreakdownComponent != undefined){
      this.assessmentBreakdownComponent.updateDataPull();
    }
  }
}