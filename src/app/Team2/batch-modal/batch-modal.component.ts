import { Component, OnInit, Output } from '@angular/core';
import { BatchService } from '../batch.service';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Batch } from '../type/batch';
import { Trainer } from '../type/trainer';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit {

  batchFormName: '';
  trainingName: string = null;
  trainingType: string = null;
  trainingTypes: string[];
  skillType: string = null;
  skillTypes: string[];
  location: string = null;
  // needs to be a location type
  locationOptions: string[];
  trainer: string = null;
  // needs to be a user type
  trainers: string[];
  coTrainer: string = null;
  startDate: Date;
  endDate: Date;
  goodGradeThreshold: number;
  borderlineGradeThreshold: number;
  batchForm: FormGroup;
  submitted: Boolean = false;

  constructor(
    private batchservice: BatchService) {
    this.trainers = ['Patrick Walsh', 'Dan Pickles', 'Ravi Singh'];
    this.locationOptions = ['Virginia', 'Texas', 'Florida'];
    this.skillTypes = ['Java', 'Spark', '.NET', 'PEGA'];
    this.trainingTypes = ['Revature', 'Corporate', 'University', 'Other'];
  }

  ngOnInit() {
    // this.batchForm = this.formBuilder.group({
    //   trainingName: ['', [Validators.requiredTrue, Validators.minLength(3)]]
    // });
    console.log('generated');
    // generate all the skilltypes
    // this.batchservice.getAllSkillTypes().subscribe( results => {
    //   console.log(results);
    //   this.skillTypes = results;
    // });
    // console.log(this.skillTypes);
  }

  createBatch(): void {
    console.log(new Batch(this.trainingName, this.trainingType,
        this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
        this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold));

    this.batchservice.postBatch(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold)).subscribe(result => {
        console.log('created');
      });
  }

  setMinGrade(): void {
    this.borderlineGradeThreshold = this.goodGradeThreshold;
  }

  lowerMinGrade(): void {
    if (this.borderlineGradeThreshold > this.goodGradeThreshold) {
      this.borderlineGradeThreshold = this.goodGradeThreshold;
    }
  }

  checkInputs(): Boolean {
    if (this.trainingName === null || this.trainingName === '') {
      console.log('1');
      return false;
    }
    if (this.trainingType === null) {
      console.log('2');
      return false;
    }
    if (this.skillType === null) {
      console.log(3);
      return false;
    }
    if (this.location === null) {
      console.log(4);
      return false;
    }
    if (this.trainer === null) {
      console.log(5);
      return false;
    }
    if (this.startDate === undefined) {
      console.log(6);
      return false;
    } else if (this.endDate === undefined) {
      console.log(7);
      return false;
    }
    if (this.goodGradeThreshold === undefined || this.goodGradeThreshold < 0) {
      console.log(8);
      return false;
    }
    if (this.borderlineGradeThreshold === undefined || this.borderlineGradeThreshold < 0) {
      console.log(9);
      return false;
    }
    console.log(10);
    return true;
  }


  checkDates(id: string): void {
    // if (!this.checkInputs()) {
    //   this.submitted = true;
    //   return;
    // }
    if (this.startDate < this.endDate) {
      console.log('this is fine');
      this.createBatch();
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true});
      elem.dispatchEvent(evt);
    } else {
      console.log('this is not fine');
    }
  }

  setTrainingType(option: string) {
    this.trainingType = option;
  }

  setSkillType(option: string) {
    this.skillType = option;
  }

  setLocation(option: string) {
    this.location = option;
  }

  setTrainer(option: string) {
    this.trainer = option;
  }
}
