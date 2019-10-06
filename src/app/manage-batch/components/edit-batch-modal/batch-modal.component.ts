import { Component, OnInit } from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BsDaterangepickerConfig, BsModalRef} from "ngx-bootstrap";
import {Location} from "../../../domain/model/location.dto";
import {Trainer} from "../../../domain/model/trainer.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {DatepickerDateCustomClasses} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit {

  batch: Batch;
  locations$: Observable<Location[]>;
  skillTypes$: Observable<string []>;
  trainers$: Observable<Trainer[]>;
  shouldCreate: boolean;
  batchForm: FormGroup = this.generateForm();
  public readonly trainingTypes: string[] = ['Revature', 'Corporate', 'University', 'Other'];
  private locationMap: Map<number, Location> = new Map<number, Location>();

  protected updatedBatchSubject$: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);
  protected createdBatchSubject$: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(undefined);

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
        "locationId": this.batch.locationId,
        "goodGrade": this.batch.goodGrade,
        "passingGrade": this.batch.passingGrade,
        "startDate": this.formatDate(this.batch.startDate),
        "endDate": this.formatDate(this.batch.endDate)
      });
    } else if (this.shouldCreate) {
      const today: Date = new Date();
      const inTenWeeks: Date = new Date();
      inTenWeeks.setDate(today.getDate() + (10 * 7));
      this.batchForm.patchValue({
        "goodGrade": 70,
        "passingGrade": 65,
        "startDate": this.formatDate(today.valueOf()),
        "endDate": this.formatDate(inTenWeeks.valueOf())
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
      "locationId": 0,
      "startDate": new Date(),
      "endDate": "",
      "goodGrade": 0,
      "passingGrade": 0
    });
  }

  formatLocation(location: Location): string {
    if (location) {
      this.locationMap.set(location.id, location);
      return `${location.name}, ${location.address}, ${location.city}, ${location.state} ${location.zipcode}`
    }
    return undefined;
  }

  handleBatchUpdate() {
    const updated: Batch = {
      ...this.batch,
      ...this.batchForm.getRawValue(),
      startDate: this.parseDate(this.batchForm.get("startDate").value),
      endDate: this.parseDate(this.batchForm.get("endDate").value),
      coTrainer: this.batchForm.get("coTrainer").value === 'null' ? null : this.batchForm.get("coTrainer").value,
      location: this.formatLocation(this.locationMap.get(Number.parseInt(this.batchForm.get("locationId").value)))
    };
    this.updatedBatchSubject$.next(updated);
    this.bsModalRef.hide();
  }

  handleBatchCreate() {
    const created: Batch = { ...this.batchForm.getRawValue(), location: this.formatLocation(this.locationMap.get(Number.parseInt(this.batchForm.get("locationId").value))) }
    this.createdBatchSubject$.next(created);
    this.bsModalRef.hide();
  }

  formatDate(unix: any): string {
    if (unix) {
      const date: Date = new Date(unix);
      return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`;
    } else {
      const date: Date = new Date();
      return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`;
    }
  }

  private pad(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  private parseDate(date: string): Date {
    const parts: string[] = date.split("-");
    return new Date(Number.parseInt(parts[0]), Number.parseInt(parts[1]) - 1, Number.parseInt(parts[2]));
  }
}
