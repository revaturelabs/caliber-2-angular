import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Batch} from "../../domain/model/batch.dto";
import {EditBatchModalComponent} from "../components/edit-batch-modal/edit-batch-modal.component";
import {Location} from "../../domain/model/location.dto";
import {Trainer} from "../../domain/model/trainer.dto";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditBatchModalService {

  private modalRef: BsModalRef;
  private lastUpdatedBatch$: Observable<Batch>;
  public updatedBatchSubject: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);

  constructor(
    private bsModalService: BsModalService
  ) { }

  showEditBatchModal(batch: Batch, skillTypes: Observable<string[]>, locations: Observable<Location[]>, trainers: Observable<Trainer[]>) {
    const initialState = {
      batch: batch,
      skillTypes: skillTypes,
      locations: locations,
      trainers: trainers
    };
    this.modalRef = this.bsModalService.show(EditBatchModalComponent, {initialState, ignoreBackdropClick: true});
    this.lastUpdatedBatch$ = this.modalRef.content.updatedBatchSubject$.asObservable();

    combineLatest(this.lastUpdatedBatch$).subscribe(
      ([batch]) => {
        if (batch) {
          this.updatedBatchSubject.next(batch);
        }
      }
    )
  }
}
