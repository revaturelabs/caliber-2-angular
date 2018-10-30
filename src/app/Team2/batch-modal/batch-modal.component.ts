import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Batch } from '../type/batch';
import { Trainer } from '../type/trainer';

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
    private batchservice: BatchService,
    private formBuilder: FormBuilder) {
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
    this.batchservice.postBatch(new Batch(1, this.trainingName, this.trainingType,
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
    if ( this.trainingName === null) {
      return false;
    }
    if ( this.trainingType === null) {
      return false;
    }
    if ( this.skillType === null) {
      return false;
    }
    if ( this.location === null) {
      return false;
    }
    if ( this.trainer === null) {
      return false;
    }
    if ( this.startDate === undefined) {
      return false;
    } else if ( this.endDate === undefined) {
      return false;
    }
    if ( this.goodGradeThreshold === undefined || this.goodGradeThreshold < 0) {
      return false;
    }
    if (this.borderlineGradeThreshold === undefined || this.borderlineGradeThreshold < 0) {
      return false;
    }
    return true;
  }


  checkDates(): void {
    if (!this.checkInputs()) {
      this.submitted = true;
      return;
    }
    if (this.startDate < this.endDate) {
      console.log('this is fine');
      this.createBatch();
    } else {
      console.log('this is not fine');
    }
  }

}
