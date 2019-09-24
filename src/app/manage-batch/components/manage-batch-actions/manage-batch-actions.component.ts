import {Component, Input, OnInit} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {BatchService} from "../../../services/subvertical/batch/batch.service";
import {Observable} from "rxjs";
import {ViewTraineesModalService} from "../../services/view-trainees-modal.service";
import {EditBatchModalService} from "../../services/edit-batch-modal.service";
import {Location} from "../../../domain/model/location.dto";
import {Trainer} from "../../../domain/model/trainer.dto";
import {ManageBatchService} from "../../../services/manage-batch.service";

@Component({
  selector: 'app-manage-batch-actions',
  templateUrl: './manage-batch-actions.component.html',
  styleUrls: ['./manage-batch-actions.component.css']
})
export class ManageBatchActionsComponent implements OnInit {

  @Input("batch") batch: Batch;
  count$: Observable<number>;
  skillType$: Observable<string[]>;
  locations$: Observable<Location[]>;
  trainers$: Observable<Trainer[]>;

  constructor(
    private manageBatchService: ManageBatchService,
    private viewTraineesModalService: ViewTraineesModalService,
    private editBatchModalService: EditBatchModalService
  ) { }

  ngOnInit() {
    this.count$ = this.manageBatchService.getTraineeCountByBatchId(this.batch.batchId);
    this.locations$ = this.manageBatchService.getAllLocations();
    this.skillType$ = this.manageBatchService.getAllSkillTypes();
    this.trainers$ = this.manageBatchService.getAllTrainers();
  }

  showTrainees() {
    this.viewTraineesModalService.openViewTraineesModal(this.batch);
  }

  showEditBatchModal() {
    this.editBatchModalService.showEditBatchModal(this.batch, this.skillType$, this.locations$, this.trainers$);
  }

}
