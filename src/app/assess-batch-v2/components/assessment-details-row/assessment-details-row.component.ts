import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Grade} from "../../../domain/model/grade.dto";
import {AssessBatchService} from "../../../services/assess-batch.service";
import {Assessment} from "../../../domain/model/assessment.dto";

@Component({
  selector: 'app-assessment-details-row',
  templateUrl: './assessment-details-row.component.html',
  styleUrls: ['./assessment-details-row.component.css']
})
export class AssessmentDetailsRowComponent implements OnInit, OnChanges {

  @Input("grade") grade: Grade;
  @Input("assessment") assessment: Assessment;
  @Input("traineeId") traineeId: number;
  @Output("onGradeUpdate") onGradeUpdate: EventEmitter<Grade> = new EventEmitter<Grade>(true);
  @Output("onGradeCreate") onGradeCreate: EventEmitter<Grade> = new EventEmitter<Grade>(true);
  gradeForm: FormGroup;
  isGradeInputValid: boolean = true;
  gradeValidationMessage: string;

  constructor(
    private fb: FormBuilder,
    private assessBatchService: AssessBatchService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      // Set value of form to be updated grade score
      if (prop === 'grade') {
        this.gradeForm = this.generateGradeForm();
      }
    }
  }

  triggerRecalculations() {
    console.log('Should recalculate averages');
  }

  handleGradeUpdate() {
    const score: number = this.gradeForm.get("grade").value;
    // Handle lower bound
    if (score < 0) {
      this.isGradeInputValid = false;
      this.gradeValidationMessage = "Must be positive";
      this.onGradeUpdate.emit(this.grade);
      return;
    }
    // Handle upper bound
    else if (score > this.assessment.rawScore) {
      this.isGradeInputValid = false;
      this.gradeValidationMessage = `Must be less than ${this.assessment.rawScore}`;
      this.onGradeUpdate.emit(this.grade);
      return;
    }

    this.isGradeInputValid = true;
    this.gradeValidationMessage = undefined;
    let grade: Grade;

    if (this.grade) {
      grade = this.grade;
      grade.score = score;
    } else {
      grade = { score: score, assessmentId: this.assessment.assessmentId, traineeId: this.traineeId, dateReceived: new Date().getTime()}
    }

    this.assessBatchService.upsertGrade(grade).subscribe(
      data => {
        if (data) {
          this.grade = data;
          this.onGradeUpdate.emit(data);
          this.isGradeInputValid = true;
          this.gradeValidationMessage = undefined;
          this.gradeForm = this.generateGradeForm();
        }
      }
    )
  }


  private generateGradeForm(): FormGroup {
    if (this.grade !== undefined) {
      return this.fb.group({
        "grade": this.grade.score
      })
    } else {
      return this.fb.group({
        "grade": [0, [Validators.required, Validators.min(0)]]
      });
    }
  }
}
