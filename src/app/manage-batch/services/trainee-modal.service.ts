import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Trainee} from "../../domain/model/trainee.dto";
import {TraineeModalComponent} from "../components/trainee-modal/trainee-modal.component";
import {BehaviorSubject} from "rxjs";
import {ManageBatchService} from "../../services/manage-batch.service";
import {ToastService} from "../../services/toast.service";
import {Batch} from "../../domain/model/batch.dto";

@Injectable({
  providedIn: 'root'
})
export class TraineeModalService {

  private modalRef: BsModalRef;
  public lastUpdatedTrainee$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);
  public lastCreatedTrainee$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);

  constructor(
    private bsModalService: BsModalService,
    private manageBatchService: ManageBatchService,
    private toastService: ToastService
  ) { }

  openEditTraineeModal(trainee: Trainee) {
    const initialState = {
      trainee,
      shouldCreate: false
    };
    this.modalRef = this.bsModalService.show(TraineeModalComponent, {initialState, ignoreBackdropClick: true});
    this.modalRef.content.onTraineeUpdate.asObservable().subscribe(
      data => {
        if (data) {
          this.manageBatchService.updateTrainee(data).subscribe(
            trainee => {
              this.lastUpdatedTrainee$.next(trainee);
              this.toastService.success(`Successfully updated ${trainee.name}`, "");
              this.modalRef.hide();
            }
          )
        }
      }, err => {
        this.toastService.error(`Failed to update trainee`, err.error);
      }
    );

  }

  openCreateTraineeModal(batch: Batch) {
    const initialState = { batch, shouldCreate: true };
    this.modalRef = this.bsModalService.show(TraineeModalComponent, { initialState, ignoreBackdropClick: true });

    this.modalRef.content.onTraineeCreate.asObservable().subscribe(
      data => {
        if (data) {
          this.manageBatchService.createTrainee(data).subscribe(
            trainee => {
              if (data) {
                this.lastCreatedTrainee$.next(data);
                this.toastService.success(`Successfully created ${trainee.name}`, "");
                this.modalRef.hide();
              }
            },
            err => this.toastService.error(`Failed to create ${data.name}`, err.error)
          )
        }
      }
    )
  }
}
