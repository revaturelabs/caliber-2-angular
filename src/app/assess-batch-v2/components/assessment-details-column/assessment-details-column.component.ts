import {Component, Input, OnInit} from '@angular/core';
import {AssessmentDialogService} from "../../../shared/services/assessment-dialog.service";
import {AssessBatchColumn} from "../../../domain/dto/assess-batch-column.dto";
import {Category} from "../../../domain/model/category.dto";

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
