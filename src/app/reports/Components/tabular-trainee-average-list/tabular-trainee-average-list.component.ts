import { Component, OnInit, Input } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';

@Component({
  selector: 'app-tabular-trainee-average-list',
  templateUrl: './tabular-trainee-average-list.component.html',
  styleUrls: ['./tabular-trainee-average-list.component.css']
})
export class TabularTraineeAverageListComponent implements OnInit {
@Input() reportOutput: ReportOutput;
  constructor() { }

  ngOnInit() {
  }
}
