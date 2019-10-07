import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Trainee} from "../../../domain/model/trainee.dto";
import {BsModalRef} from "ngx-bootstrap";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-delete-trainee-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  trainee: Trainee;
  batch: Batch;
  isForBatch: boolean = false;
  batchName: string;
  onTraineeDelete$: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  onBatchDelete$: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  name: string;
  hideConfirmation: boolean = true;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    if (this.trainee) {
      const temp: string[] = this.trainee.name.split(", ");
      this.name = `${temp[1]} ${temp[0]}`
    } else if (this.batch) {
      this.isForBatch = true;
    }
  }

  beginDelete() {
    this.hideConfirmation = false;
  }

  cancel() {
    this.hideConfirmation = true;
  }

  handleTraineeDelete() {
    this.onTraineeDelete$.next(this.trainee);
  }


  handleBatchDelete() {
    this.onBatchDelete$.emit(this.batch);
  }

}
