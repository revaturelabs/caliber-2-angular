import { Injectable } from '@angular/core';
import {SharedModule} from "../shared.module";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AssociateFlagDialogComponent} from "../components/associate-flag-dialog/associate-flag-dialog.component";
import {AssessBatchService} from "../../Assess-Batch/Services/assess-batch.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Trainee} from "../../Batch/type/trainee";


@Injectable({
  providedIn: SharedModule
})
export class CommentDialogService {

  private modalRef: BsModalRef;
  private comment$: Observable<Trainee>;

  public lastAlteredComment$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);

  constructor(
    private modalService: BsModalService,
    private assessBatchService: AssessBatchService
  ) { }

  openCommentDialog(trainee: Trainee) {
    const initialState = {trainee: trainee};
    this.modalRef = this.modalService.show(AssociateFlagDialogComponent, {initialState});
    this.comment$ = this.modalRef.content.createComment$.asObservable();

    combineLatest(this.comment$).subscribe(([created]) => {
      if (created) {
        this.assessBatchService.postComment(created).subscribe(
          (data: Trainee) => {
            this.lastAlteredComment$.next(data);
          }
        )
      }
    })
  }
}
