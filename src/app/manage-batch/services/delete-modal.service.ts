import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Trainee} from "../../domain/model/trainee.dto";
import {DeleteModalComponent} from "../components/delete-trainee-modal/delete-modal.component";
import {ManageBatchService} from "../../services/manage-batch.service";
import {ToastService} from "../../services/toast.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Batch} from "../../domain/model/batch.dto";

@Injectable({
  providedIn: 'root'
})
export class DeleteModalService {

  private bsModalRef: BsModalRef;
  public lastDeletedTrainee$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);
  public lastDeletedBatch$: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);

  constructor(
    private bsModalService: BsModalService,
    private manageBatchService: ManageBatchService,
    private toastService: ToastService
  ) { }

  openDeleteTraineeModal(trainee: Trainee, batchName: string) {
    const initialState = { trainee, batchName };
    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {initialState, ignoreBackdropClick: true});

    this.bsModalRef.content.onTraineeDelete$.asObservable().subscribe(
      data => {
        console.table([trainee, data]);
        this.manageBatchService.deleteTrainee(data).subscribe(
          deleted => {
            this.lastDeletedTrainee$.next(trainee);
            this.bsModalRef.hide();
            this.toastService.success(`${trainee.name} removed successfully.`, "");
          },
          err => this.toastService.error(`Failed to remove ${trainee.name}`, err.error)
        )
      }
    )
  }

  openDeleteBatchModal(batch: Batch) {
    const initialState = { batch, trainee: undefined}
    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {initialState, ignoreBackdropClick: true});

    const lastBatch$: Observable<Batch> = this.bsModalRef.content.onBatchDelete$.asObservable();

    lastBatch$.subscribe(
      data => {
        if (data) {
          this.manageBatchService.deleteBatch(data.batchId).subscribe(
            () => {
              this.lastDeletedBatch$.next(batch);
              this.bsModalRef.hide();
              this.toastService.success(`${batch.trainingName} removed successfully`, "");
            },
              err => this.toastService.error(`Failed to remove ${batch.trainingName}`, err.error)
          )
        }
      }
    )
  }
}
