import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Batch} from "../../domain/model/batch.dto";
import {BatchModalComponent} from "../components/batch-modal/batch-modal.component";
import {Location} from "../../domain/model/location.dto";
import {Trainer} from "../../domain/model/trainer.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {DeleteModalService} from "./delete-modal.service";

@Injectable({
  providedIn: 'root'
})
export class BatchModalService {

  private modalRef: BsModalRef;
  private lastUpdatedBatch$: Observable<Batch>;
  private lastCreatedBatch$: Observable<Batch>;
  public updatedBatchSubject: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);
  public createdBatchSubject: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);

  constructor(
    private bsModalService: BsModalService,
    private deleteModalService: DeleteModalService
  ) { }

  showEditBatchModal(batch: Batch, skillTypes$: Observable<string[]>, locations$: Observable<Location[]>, trainers$: Observable<Trainer[]>) {
    const initialState = {
      batch: batch,
      skillTypes$,
      locations$,
      trainers$,
      shouldCreate: false
    };
    this.modalRef = this.bsModalService.show(BatchModalComponent, {initialState, ignoreBackdropClick: true});
    this.lastUpdatedBatch$ = this.modalRef.content.updatedBatchSubject$.asObservable();

    this.lastUpdatedBatch$.subscribe(
      (batch) => {
        if (batch) {
          this.updatedBatchSubject.next(batch);
        }
      }
    )
  }

  showCreateBatchModal(skillTypes$: Observable<string[]>, locations$: Observable<Location[]>, trainers$: Observable<Trainer[]>) {
    const initialState = {
      skillTypes$,
      locations$,
      trainers$,
      shouldCreate: true,
      batch: undefined
    };
    this.modalRef = this.bsModalService.show(BatchModalComponent, { initialState, ignoreBackdropClick: true });

    this.lastCreatedBatch$ = this.modalRef.content.createdBatchSubject$.asObservable();

    this.lastCreatedBatch$.subscribe(
      (batch) => {
        if (batch) {
          this.createdBatchSubject.next(batch);
        }
      }
    )
  }

  getLastDeletedBatch(): Observable<Batch> {
    return this.deleteModalService.lastDeletedBatch$.asObservable();
  }
}
