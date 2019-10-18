import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {BsModalRef} from "ngx-bootstrap";
import {Trainee} from "../../../domain/model/trainee.dto";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TraineeFlag} from "../../../domain/model/trainee-flag.dto";
import {BatchSwitchDto} from "../../../domain/dto/batch-switch.dto";

@Component({
  selector: 'app-switch-batch-modal',
  templateUrl: './switch-batch-modal.component.html',
  styleUrls: ['./switch-batch-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchBatchModalComponent implements OnInit {

  batches: Batch[];
  trainee: Trainee;
  hideConfirmation: boolean = true;
  selectedBatchToSwitch: Batch;
  private lastBatchId: number = -1;
  public lastTraineeToSwitchBatches$: BehaviorSubject<BatchSwitchDto> = new BehaviorSubject<BatchSwitchDto>(undefined);

  form: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.generateForm();
  }

  beginSwitch() {
    this.hideConfirmation = false;
    const selectedBatchId: number = Number.parseInt(this.form.get('selectedBatchToSwitch').value);
    this.selectedBatchToSwitch = this.batches.find(batch => batch.batchId === selectedBatchId);
    if (this.lastBatchId === -1) {
      this.lastBatchId = this.trainee.batchId;
    }
   }

  cancel() {
    this.hideConfirmation = true;
    this.lastBatchId = -1;
  }

  handleBatchSwitch() {
    if (this.trainee && this.trainee.flagStatus === null) {
      this.trainee.flagStatus = TraineeFlag.NONE;
    }
    const data: BatchSwitchDto = { oldBatch: this.lastBatchId, updatedTrainee: {...this.trainee, batchId: this.selectedBatchToSwitch.batchId }}
    this.lastTraineeToSwitchBatches$.next(data);
    this.lastBatchId = -1;
  }

  printFormerTrainingName(batchId: number): Batch {
    const found = this.batches.find(batch => batch.batchId === batchId);
    if (found) {
      return found;
    }
    return undefined;
  }

  getBatchFromId(batchId: number): Batch {
    return this.batches.find(batch => batch.batchId === batchId);
  }

  private generateForm(): FormGroup {
    return this.fb.group({
      "selectedBatchToSwitch": [-1, Validators.required]
    });
  }
}
