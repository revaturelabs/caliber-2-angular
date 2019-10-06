import {Component, EventEmitter, OnInit} from '@angular/core';
import {Trainee} from "../../../domain/model/trainee.dto";
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TraineeFlag} from "../../../domain/model/trainee-flag.dto";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-edit-trainee-modal',
  templateUrl: './trainee-modal.component.html',
  styleUrls: ['./trainee-modal.component.css']
})
export class TraineeModalComponent implements OnInit {

  trainee: Trainee;
  shouldCreate: boolean;
  batch: Batch;
  onTraineeUpdate: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  onTraineeCreate: EventEmitter<Trainee> = new EventEmitter<Trainee>(true);
  traineeForm: FormGroup = this.generateForm();
  readonly statuses: string[] = ["Signed", "Selected", "Training", "Marketing", "Confirmed", "Employed", "Dropped", "Project", "Staging"]

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.trainee) {
      const name = this.trainee.name.split(", ");
      this.traineeForm.patchValue({
        "firstName": name[1],
        "lastName": name[0],
        "email": this.trainee.email,
        "trainingStatus": this.trainee.trainingStatus,
        "phoneNumber": this.trainee.phoneNumber,
        "skypeId": this.trainee.skypeId,
        "profileUrl": this.trainee.profileUrl,
        "recruiterName": this.trainee.recruiterName,
        "college": this.trainee.college,
        "degree": this.trainee.degree,
        "major": this.trainee.major,
        "techScreenerName": this.trainee.techScreenerName,
        "projectCompletion": this.trainee.projectCompletion
      })
    }
  }

  generateForm(): FormGroup {
    return this.fb.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "email": ["", [Validators.required, Validators.email]],
      "trainingStatus": ["", Validators.required],
      "phoneNumber": ["", Validators.required],
      "skypeId": ["", Validators.required],
      "profileUrl": ["", ],
      "recruiterName": ["", ],
      "college": ["", Validators.required],
      "degree": ["", Validators.required],
      "major": ["", Validators.required],
      "techScreenerName": [""],
      "projectCompletion": [""]
    })
  }

  handleTraineeUpdate() {
    const name: string = `${this.traineeForm.get("lastName").value}, ${this.traineeForm.get("firstName").value}`;
    const flagStatus: TraineeFlag = this.trainee.flagStatus ? this.trainee.flagStatus : TraineeFlag.NONE;
    const trainee: Trainee = { ...this.trainee, ...this.traineeForm.getRawValue(), name, flagStatus };
    this.onTraineeUpdate.emit(trainee);
  }

  handleTraineeCreate() {
    const name: string = `${this.traineeForm.get("lastName").value}, ${this.traineeForm.get("firstName").value}`;
    const trainee: Trainee = { ...this.traineeForm.getRawValue(), name, batchId: this.batch.batchId };
    this.onTraineeCreate.emit(trainee);
  }
}
