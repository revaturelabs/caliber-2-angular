import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../../Assess-Batch/Services/category.service";
import {Observable} from "rxjs";
import {Assessment} from "../../../Assess-Batch/Models/Assesment";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AssessmentDialogService} from "../../../shared/services/assessment-dialog.service";
import {Category} from "../../../Assess-Batch/Models/Category";

@Component({
  selector: 'app-create-assessment-button',
  templateUrl: './create-assessment-button.component.html',
  styleUrls: ['./create-assessment-button.component.css']
})
export class CreateAssessmentButtonComponent implements OnInit {

  @Input("week") private week: number;
  @Input("batchId") private batchId: number;

  @Output("onAssessmentCreate") onAssessmentCreate: EventEmitter<Assessment> = new EventEmitter<Assessment>(true);

  categories$: Observable<Category[]>;
  modal: BsModalRef;

  constructor(
    private categoryService: CategoryService,
    private assessmentDialogService: AssessmentDialogService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  showCreateAssessmentDialog() {
    this.categories$.subscribe(
      data => {
        this.assessmentDialogService.openAssessmentDialog(undefined, this.week, this.batchId, data);
      }
    )
  }

  handleCreateAssessment(assessment: Assessment) {
    this.onAssessmentCreate.emit(assessment);
  }
}
