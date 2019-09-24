import { Component, OnInit } from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap";
import {Location} from "../../../domain/model/location.dto";
import {Trainer} from "../../../domain/model/trainer.dto";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-edit-batch-modal',
  templateUrl: './edit-batch-modal.component.html',
  styleUrls: ['./edit-batch-modal.component.css']
})
export class EditBatchModalComponent implements OnInit {

  batch: Batch;
  locations: Observable<Location[]>;
  skillTypes: Observable<string []>;
  trainers: Observable<Trainer[]>;
  batchForm: FormGroup = this.generateForm();
  public readonly trainingTypes: string[] = ['Revature', 'Corporate', 'University', 'Other'];

  protected updatedBatchSubject$: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    if (this.batch) {
      this.batchForm.patchValue({
        "trainingName": this.batch.trainingName,
        "trainingType": this.batch.trainingType,
        "skillType": this.batch.skillType,
        "trainer": this.batch.trainer,
        "coTrainer": this.batch.coTrainer ? this.batch.coTrainer : '',
        "location": this.batch.locationId,
        "goodGrade": this.batch.goodGrade,
        "passingGrade": this.batch.passingGrade
      })
    }
  }

  private generateForm(): FormGroup {
    return this.fb.group({
      "trainingName": "",
      "trainingType": "",
      "skillType": "",
      "trainer": "",
      "coTrainer": "",
      "location": 0,
      "startDate": "",
      "endDate": "",
      "goodGrade": 0,
      "passingGrade": 0
    });
  }

  formatLocation(location: Location): string {
    if (location) {
      return `${location.name}, ${location.address}, ${location.city}, ${location.state} ${location.zipcode}`
    }
    return undefined;
  }

  handleBatchUpdate() {
    const updated: Batch = { ...this.batch, ...this.batchForm.getRawValue()};
    this.updatedBatchSubject$.next(updated);
  }
}
