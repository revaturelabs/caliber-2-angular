import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {BatchModalService} from "../../services/batch-modal.service";
import {Location} from "../../../domain/model/location.dto";
import {Trainer} from "../../../domain/model/trainer.dto";
import {ManageBatchService} from "../../../services/manage-batch.service";
import {Trainee} from "../../../domain/model/trainee.dto";
import {DeleteModalService} from "../../services/delete-modal.service";
import {TraineeModalService} from "../../services/trainee-modal.service";
import {SwitchBatchesModalService} from "../../services/switch-batches-modal.service";
import {BatchSwitchDto} from "../../../domain/dto/batch-switch.dto";

@Component({
  selector: 'app-manage-batch-actions',
  templateUrl: './manage-batch-actions.component.html',
  styleUrls: ['./manage-batch-actions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageBatchActionsComponent implements OnInit {

  @Input("batch") batch: Batch;
  @Output("onShowTrainees") onShowTrainees: EventEmitter<Batch> = new EventEmitter<Batch>();
  private lastCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  count$: Observable<number> = this.lastCount$.asObservable();
  skillType$: Observable<string[]>;
  locations$: Observable<Location[]>;
  trainers$: Observable<Trainer[]>;
  private onTraineeDelete$: Observable<Trainee>;
  private onTraineeCreate$: Observable<Trainee>;
  private onBatchSwitch$: Observable<BatchSwitchDto>;
  private countSubscription$: Subscription;

  constructor(
    private manageBatchService: ManageBatchService,
    private editBatchModalService: BatchModalService,
    private traineeModalService: TraineeModalService,
    private deleteTraineeModalService: DeleteModalService,
    private switchBatchModalService: SwitchBatchesModalService,
  ) {
    this.onTraineeDelete$ = this.deleteTraineeModalService.lastDeletedTrainee$.asObservable();
    this.onTraineeCreate$ = this.traineeModalService.lastCreatedTrainee$.asObservable();
    this.onBatchSwitch$ = this.switchBatchModalService.lastTraineeToSwitchBatch$.asObservable();
  }

  ngOnInit() {
    this.countSubscription$ = this.manageBatchService.getTraineeCountByBatchId(this.batch.batchId).subscribe(
      data => this.lastCount$.next(data)
    );
    this.locations$ = this.manageBatchService.getAllLocations();
    this.skillType$ = this.manageBatchService.getAllSkillTypes();
    this.trainers$ = this.manageBatchService.getAllTrainers();

    this.onTraineeDelete$.subscribe(
      data => {
        if (data && this.batch.batchId === data.batchId) {
          this.updateTraineeCountInBatch(data.batchId);
        }
      }
    );

    this.onTraineeCreate$.subscribe(
      data => {
        if (data && this.batch.batchId === data.batchId) {
          this.updateTraineeCountInBatch(data.batchId);
        }
      }
    );

    this.onBatchSwitch$.subscribe(
      data => {
        if (data && data.oldBatch && data.updatedTrainee && data.updatedTrainee.batchId) {
          if (data.oldBatch === this.batch.batchId) {
            this.updateTraineeCountInBatch(this.batch.batchId);
          } else if (data.updatedTrainee.batchId === this.batch.batchId) {
            this.updateTraineeCountInBatch(this.batch.batchId);
          }
        }
      }
    )
  }



  showTrainees() {
    this.onShowTrainees.emit(this.batch);
  }

  showRemoveBatch() {
    this.deleteTraineeModalService.openDeleteBatchModal(this.batch);
  }

  showEditBatchModal() {
    this.editBatchModalService.showEditBatchModal(this.batch, this.skillType$, this.locations$, this.trainers$);
  }

  private updateTraineeCountInBatch(batchId: number) {
    this.countSubscription$.unsubscribe();
    this.countSubscription$ = this.manageBatchService.getTraineeCountByBatchId(batchId).subscribe(
      data => {
        this.lastCount$.next(data);
      }
    );
  }
}
