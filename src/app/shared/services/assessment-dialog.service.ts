import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Assessment} from "../../Assess-Batch/Models/Assesment";
import {AssessmentDialogComponent} from "../components/assessment-dialog/assessment-dialog.component";
import {Category} from "../../Assess-Batch/Models/Category";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {AssessmentService} from "../../Assess-Batch/Services/assessment.service";
import {AssessmentAction, AssessmentChangeDto} from "../../domain/dto/assessment-change.dto";

@Injectable()
export class AssessmentDialogService {

  private modalRef: BsModalRef;
  private createAssessment$: Observable<Assessment>;
  private updateAssessment$: Observable<Assessment>;
  private deleteAssessment$: Observable<Assessment>;

  public lastAlteredAssessment: BehaviorSubject<AssessmentChangeDto> = new BehaviorSubject<AssessmentChangeDto>(undefined);

  constructor(
    private modalService: BsModalService,
    private assessmentService: AssessmentService
  ) { }

  openAssessmentDialog(assessment: Assessment, week: number, batchId: number, categories: Category[]) {
    const initialState = {
      assessment: assessment,
      week: week,
      batchId: batchId,
      categories: categories
    };
    this.modalRef = this.modalService.show(AssessmentDialogComponent, {initialState, ignoreBackdropClick: true});
    this.createAssessment$ = this.modalRef.content.createAssessmentSubject.asObservable();
    this.updateAssessment$ = this.modalRef.content.updateAssessmentSubject.asObservable();
    this.deleteAssessment$ = this.modalRef.content.deleteAssessmentSubject.asObservable();

    combineLatest(this.createAssessment$, this.updateAssessment$, this.deleteAssessment$).subscribe(
      ([created, updated, deleted]) => {
        if (created) {
          this.assessmentService.createAssessment(created).subscribe(
            data => {
              this.lastAlteredAssessment.next({action: AssessmentAction.CREATE, assessment: data})
            }
          )
        } else if (updated) {
          this.assessmentService.updateAssessment(updated).subscribe(
            data => {
              this.lastAlteredAssessment.next({action: AssessmentAction.UPDATE, assessment: data})
            }
          )
        } else if (deleted) {
          this.assessmentService.deleteAssessment(deleted).subscribe(
            data => {
              this.lastAlteredAssessment.next({action: AssessmentAction.DELETE, assessment: data})
            }
          )
        }
      }
    )
  }
}
