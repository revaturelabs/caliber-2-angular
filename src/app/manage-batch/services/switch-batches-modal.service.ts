import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ManageBatchService} from "../../services/manage-batch.service";
import {Trainee} from "../../domain/model/trainee.dto";
import {Batch} from "../../domain/model/batch.dto";
import {SwitchBatchModalComponent} from "../components/switch-batch-modal/switch-batch-modal.component";
import {BehaviorSubject} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {BatchSwitchDto} from "../../domain/dto/batch-switch.dto";

@Injectable({
  providedIn: 'root'
})
export class SwitchBatchesModalService {

  private modalRef: BsModalRef;
  public lastTraineeToSwitchBatch$: BehaviorSubject<BatchSwitchDto> = new BehaviorSubject<BatchSwitchDto>(undefined);

  constructor(
    private modalService: BsModalService,
    private manageBatchService: ManageBatchService,
    private toastService: ToastService
  ) { }

  openSwitchBatchModal(trainee: Trainee, batches: Batch[]) {
    const initialState = { trainee, batches };
    this.modalRef = this.modalService.show(SwitchBatchModalComponent, { initialState, ignoreBackdropClick: true });

    this.modalRef.content.lastTraineeToSwitchBatches$.asObservable().subscribe(
      data => {
        if (data) {
          this.manageBatchService.switchBatchForTrainee(data.updatedTrainee).subscribe(
            swapped => {
              if (swapped) {
                this.lastTraineeToSwitchBatch$.next({oldBatch: data.oldBatch, updatedTrainee: swapped});
                this.toastService.success(`Swapped ${swapped.name} into ${swapped.batchId} successfully!`, "");
                this.modalRef.hide();
              }
            },
            () => this.toastService.error(`Failed to switch ${trainee.name} into ${data.batchId}`, "")
          )
        }
      }
    )
  }
}
