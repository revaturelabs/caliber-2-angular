import { Component, OnInit, Input } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { Grade } from 'src/app/User/user/types/trainee';

@Component({
  selector: 'app-tabular-trainee-average-list',
  templateUrl: './tabular-trainee-average-list.component.html',
  styleUrls: ['./tabular-trainee-average-list.component.css']
})
export class TabularTraineeAverageListComponent implements OnInit {
@Input() reportOutput: ReportOutput = new ReportOutput();

  constructor() { }

  ngOnInit() {
    let newGrade = new Grade();
    newGrade.score=0;
    newGrade.traineeId=-1;
    newGrade.assessmentId=-1;

    this.reportOutput.gradesDataStore = [newGrade];
  }
}
