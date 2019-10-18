import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Batch} from "../../../domain/model/batch.dto";
import {SwitchBatchesModalService} from "../../services/switch-batches-modal.service";

@Component({
  selector: 'app-view-trainees-modal',
  templateUrl: './view-trainees-modal.component.html',
  styleUrls: ['./view-trainees-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTraineesModalComponent implements OnInit, OnDestroy {

  private traineeSub: Subscription;
  private trainees$: BehaviorSubject<Trainee[]> = new BehaviorSubject<Trainee[]>([]);
  _trainees$: Observable<Trainee[]>;
  batch: Batch;
  batches: Batch[];
  @Output('lastDeletedTrainee') lastDeletedTrainee: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  @Output('lastCreatedTrainee') lastCreatedTrainee: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  @Output("onShowBatchSwitch") onShowBatchSwitch: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  public onTraineeModalClose$: EventEmitter<Batch> = new EventEmitter<Batch>(true);

  showInactive: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private switchBatchModalService: SwitchBatchesModalService
  ) { }

  ngOnInit() {
    this._trainees$ = this.trainees$.asObservable();
  }

  ngOnDestroy(): void {
    this.traineeSub.unsubscribe();
  }

  setTrainees(trainees: Observable<Trainee[]>) {
    this.traineeSub = trainees.subscribe(data => this.trainees$.next(data));
  }


  handleTraineeDelete(trainee: Trainee) {
    this.lastDeletedTrainee.next(trainee);
  }

  handleTraineeCreate(trainee: Trainee) {
    this.lastCreatedTrainee.emit(trainee);
  }

  handleTraineeBatchSwitch(trainee: Trainee) {
    this.switchBatchModalService.openSwitchBatchModal(trainee, this.batches);
  }

  toggleInactiveTrainees() {
    this.showInactive = !this.showInactive;
  }

  close() {
    this.traineeSub.unsubscribe();
    this.onTraineeModalClose$.emit(this.batch);
    this.bsModalRef.hide();
  }

  format(input: string): string {
    if (input === 'null') {
      return ''
    }
    return input;
  }
}
