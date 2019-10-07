import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Batch} from "../../domain/model/batch.dto";
import {Observable} from "rxjs";
import {Trainee} from "../../domain/model/trainee.dto";
import {ViewTraineesModalComponent} from "../components/view-trainees-modal/view-trainees-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ViewTraineesModalService {

  private modalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  openViewTraineesModal(batch: Batch, batches: Batch[], trainees$: Observable<Trainee[]>) {
    const initialState = {
      batch,
      batches,
    };
    this.modalRef = this.bsModalService.show(ViewTraineesModalComponent, {initialState, ignoreBackdropClick: true, class: 'modal-lg modal-widest'});
    this.updateViewTraineesModal(trainees$);
    this.modalRef.content.onTraineeModalClose$.asObservable().subscribe(
      data => {
        if (data) {
          this.modalRef.hide();
        }
      }
    )
  }

  updateViewTraineesModal(trainees$: Observable<Trainee[]>) {
    this.modalRef.content.setTrainees(trainees$);
  }

}
