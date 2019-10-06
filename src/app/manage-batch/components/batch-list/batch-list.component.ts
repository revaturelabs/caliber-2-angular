import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {BatchModalService} from "../../services/batch-modal.service";
import {Observable, of} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {ManageBatchService} from "../../../services/manage-batch.service";
import {ToastService} from "../../../services/toast.service";
import {ViewTraineesModalService} from "../../services/view-trainees-modal.service";
import {TraineeModalService} from "../../services/trainee-modal.service";
import {DeleteModalService} from "../../services/delete-modal.service";
import {SwitchBatchesModalService} from "../../services/switch-batches-modal.service";
import {BatchSwitchDto} from "../../../domain/dto/batch-switch.dto";

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BatchListComponent implements OnInit {

  @Input("batches") batches: Batch[];
  lastUpdatedBatch$: Observable<Batch>;
  selectedBatch: Batch = this.batches ? this.batches[0] : undefined;

  constructor(
    private editBatchModalService: BatchModalService,
    private manageBatchService: ManageBatchService,
    private toastService: ToastService,
    private viewTraineesModalService: ViewTraineesModalService,
    private traineeModalService: TraineeModalService,
    private deleteModalService: DeleteModalService,
    private batchModalService: BatchModalService,
    private switchBatchModalService: SwitchBatchesModalService
  ) { }

  ngOnInit() {
    this.lastUpdatedBatch$ = this.editBatchModalService.updatedBatchSubject.asObservable();

    this.lastUpdatedBatch$.pipe(distinctUntilChanged()).subscribe(
      (batch) => {
        if (batch) {
          this.manageBatchService.updateBatch(batch).subscribe(
            data => {
              this.toastService.success(`${data.trainingName} updated successfully!`, "");
              this.replaceBatchInCachedList(data);
            }, err => {
              this.toastService.error(`Failed to update ${batch.trainingName}`, "")
            }
          )
        }
      }
    );

    this.deleteModalService.lastDeletedBatch$.subscribe(
      data => {
        if (this.batches) {
          // this.batches = this.batches.filter(batch => batch.batchId === data.batchId);
          for (let i = 0; i < this.batches.length; i++) {
            if (this.batches[i].batchId === data.batchId) {
              this.batches = this.batches.splice(i, 1);
            }
          }
        }
      }
    );


    this.batchModalService.createdBatchSubject.asObservable().subscribe(
      data => {
        if (data) {
          this.manageBatchService.updateBatch(data).subscribe(
            batch => {
              this.batches.unshift(batch);
              this.toastService.success(`${batch.trainingName} created successfully!`, "");
            },
            err => this.toastService.error(`Failed to create ${data.trainingName}`, "")
          )
        }
      }
    );

  }

  showTrainees(batch: Batch) {
    this.manageBatchService.getTraineesByBatchId(batch.batchId).subscribe(
      trainees => this.viewTraineesModalService.openViewTraineesModal(batch, this.batches, of(trainees))
    );
    this.traineeModalService.lastUpdatedTrainee$.asObservable().subscribe(
      (trainee) => {
        if (trainee) {
          this.viewTraineesModalService.updateViewTraineesModal(this.manageBatchService.getTraineesByBatchId(batch.batchId));
        }
      }
    );


    this.deleteModalService.lastDeletedTrainee$.asObservable().subscribe(
      data => {
        if (data) {
          if (data.batchId === batch.batchId) {
            this.viewTraineesModalService.updateViewTraineesModal(this.manageBatchService.getTraineesByBatchId(batch.batchId));
          }
        }
      }
    );

    this.traineeModalService.lastCreatedTrainee$.subscribe(
      createdTrainee => {
        if (createdTrainee) {
          this.viewTraineesModalService.updateViewTraineesModal(this.manageBatchService.getTraineesByBatchId(batch.batchId));
        }
      }
    );

    this.switchBatchModalService.lastTraineeToSwitchBatch$.asObservable().subscribe(
      data => {
        if (data) {
          this.viewTraineesModalService.updateViewTraineesModal(this.manageBatchService.getTraineesByBatchId(data.oldBatch));
          this.putReplacedBatchesInList(data);
        }
      }
    )
  }



  private putReplacedBatchesInList(data: BatchSwitchDto): void {
    this.manageBatchService.getBatchByBatchId(data.oldBatch).subscribe(data => this.replaceBatchInCachedList(data));
    this.manageBatchService.getBatchByBatchId(data.updatedTrainee.batchId).subscribe(data => this.replaceBatchInCachedList(data));
  }

  private replaceBatchInCachedList(batch: Batch): void {
    if (this.batches && this.batches.length) {
      for (let i = 0; i < this.batches.length; i++) {
        if (this.batches[i].batchId === batch.batchId) {
          this.batches[i] = batch;
          break;
        }
      }
    }
  }
}
