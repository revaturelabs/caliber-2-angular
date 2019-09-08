import {Component, Input, OnInit} from '@angular/core';
import {Category, traineeAssessment} from "../../../User/user/types/trainee";
import {AssessBatchColumn} from "../../../app.dto";

@Component({
  selector: 'app-assessment-details-column',
  templateUrl: './assessment-details-column.component.html',
  styleUrls: ['./assessment-details-column.component.css']
})
export class AssessmentDetailsColumnComponent implements OnInit {

  @Input("columnData") column: AssessBatchColumn;
  @Input("totalPoints") totalPoints: number;

  constructor() { }

  ngOnInit() {

  }

}
