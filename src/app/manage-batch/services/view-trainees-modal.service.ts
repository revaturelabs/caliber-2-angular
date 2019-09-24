import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {TraineeService} from "../../services/subvertical/user/trainee.service";
import {ViewTraineesModalComponent} from "../components/view-trainees-modal/view-trainees-modal.component";
import {Batch} from "../../domain/model/batch.dto";

@Injectable()
export class ViewTraineesModalService {

  private modalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private traineeService: TraineeService
  ) { }

  openViewTraineesModal(batch: Batch) {
    const initialState = {
      trainees$: this.traineeService.getTraineesByBatchId(batch.batchId),
      title: batch.trainingName,
      trainer: batch.trainer
    };

    this.modalRef = this.bsModalService.show(ViewTraineesModalComponent, {initialState, ignoreBackdropClick: true})
  }
}
