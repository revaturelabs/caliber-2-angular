import {Component, Input, OnInit} from '@angular/core';
import {AssessBatchColumn} from "../../../app.dto";
import {Category} from "../../../Assess-Batch/Models/Category";
import {AssessmentDialogService} from "../../../shared/services/assessment-dialog.service";

@Component({
  selector: 'app-assessment-details-column',
  templateUrl: './assessment-details-column.component.html',
  styleUrls: ['./assessment-details-column.component.css']
})
export class AssessmentDetailsColumnComponent implements OnInit {

  @Input("batchId") batchId: number;
  @Input("week") week: number;
  @Input("column") column: AssessBatchColumn;
  @Input("totalPoints") totalPoints: number;
  @Input("categories") categories: Category[];


  constructor(
    private assessmentDialogService: AssessmentDialogService
  ) {}

  ngOnInit() {
  }

  showUpdateAssessmentDialog() {
    this.assessmentDialogService.openAssessmentDialog(this.column.assessment, this.week, this.batchId, this.categories);
  }
}
