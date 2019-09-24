import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AssociateFlagDialogComponent} from "../components/associate-flag-dialog/associate-flag-dialog.component";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Trainee} from "../../domain/model/trainee.dto";
import {AssessmentService} from "../../services/subvertical/assessment/assessment.service";


@Injectable()
export class CommentDialogService {

  private modalRef: BsModalRef;
  private comment$: Observable<Trainee>;

  public lastAlteredComment$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);

  constructor(
    private modalService: BsModalService,
    private assessmentService: AssessmentService
  ) { }

  openCommentDialog(trainee: Trainee) {
    const initialState = {trainee: trainee};
    this.modalRef = this.modalService.show(AssociateFlagDialogComponent, {initialState, ignoreBackdropClick: true});
    this.comment$ = this.modalRef.content.createComment$.asObservable();

    combineLatest(this.comment$).subscribe(([created]) => {
      if (created) {
        this.assessmentService.upsertComment(created).subscribe(
          (data: Trainee) => {
            this.lastAlteredComment$.next(data);
          }
        )
      }
    })
  }
}
