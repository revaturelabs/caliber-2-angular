import {Component, Input, OnInit} from '@angular/core';
import {TraineeModalService} from "../../services/trainee-modal.service";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-add-trainee-button',
  templateUrl: './add-trainee-button.component.html',
  styleUrls: ['./add-trainee-button.component.css']
})
export class AddTraineeButtonComponent implements OnInit {

  @Input('batch') batch: Batch;

  constructor(
    private traineeModalService: TraineeModalService
  ) { }

  ngOnInit() {
  }

  showCreateTraineeModal() {
    this.traineeModalService.openCreateTraineeModal(this.batch);
  }
}
