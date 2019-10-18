import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trainee} from "../../../domain/model/trainee.dto";
import {TraineeModalService} from "../../services/trainee-modal.service";
import {Observable} from "rxjs";
import {DeleteModalService} from "../../services/delete-modal.service";

@Component({
  selector: 'app-trainee-actions',
  templateUrl: './trainee-actions.component.html',
  styleUrls: ['./trainee-actions.component.css']
})
export class TraineeActionsComponent implements OnInit {

  @Input("trainee") trainee: Trainee;
  @Input('batchName') batchName: string;
  @Output("onTraineeDelete") deleteTraineeEmitter$: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  @Output('onTraineeCreate') createdTraineeEmitter$: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  @Output('onShowSwitchBatch') switchBatchEmitter$: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  private lastCreatedTrainee$: Observable<Trainee>;

  constructor(
    private traineeModalService: TraineeModalService,
    private deleteTraineeModalService: DeleteModalService
  ) {
    this.lastCreatedTrainee$ = this.traineeModalService.lastCreatedTrainee$.asObservable();
  }

  ngOnInit() {
    this.lastCreatedTrainee$.subscribe(
      data => {
        if (data) {
          this.createdTraineeEmitter$.emit(data);
        }
      }
    )
  }

  edit() {
    this.traineeModalService.openEditTraineeModal(this.trainee);
    this.traineeModalService.lastUpdatedTrainee$.asObservable().subscribe(
      data => {
        if (data) {
          this.deleteTraineeEmitter$.emit(data);
        }
      }
    )
  }

  delete() {
    this.deleteTraineeModalService.openDeleteTraineeModal(this.trainee, this.batchName);
    this.deleteTraineeModalService.lastDeletedTrainee$.asObservable().subscribe(
      data => {
        if (data) {
          this.deleteTraineeEmitter$.emit(data);
        }
      }
    )
  }

  switch() {
    this.switchBatchEmitter$.emit(this.trainee);
  }
}
