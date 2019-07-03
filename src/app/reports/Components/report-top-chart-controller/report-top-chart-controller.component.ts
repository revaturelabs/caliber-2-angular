import { Component, OnInit, ViewChild } from '@angular/core';
import { CumulativeScoresComponent } from '../cumulative-scores/cumulative-scores.component';

@Component({
  selector: 'app-report-top-chart-controller',
  templateUrl: './report-top-chart-controller.component.html',
  styleUrls: ['./report-top-chart-controller.component.css']
})
export class ReportTopChartController implements OnInit {
  @ViewChild(CumulativeScoresComponent) child : CumulativeScoresComponent;
  constructor() { }

  ngOnInit() {
  }

  updateDataPull(){
    this.child.updateDataPull();
  }
}