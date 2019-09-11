import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup } from "@angular/forms";
import {Grade, Trainee} from "../../../Batch/type/trainee";

@Component({
  selector: 'app-assessment-details-row',
  templateUrl: './assessment-details-row.component.html',
  styleUrls: ['./assessment-details-row.component.css']
})
export class AssessmentDetailsRowComponent implements OnInit, OnChanges {

  @Input("grades") grade: Grade;
  @Output("onGradeUpdate") onGradeUpdate: EventEmitter<Grade> = new EventEmitter<Grade>();
  gradeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (change.previousValue === undefined && change.currentValue !== undefined) {
        this.gradeForm = this.generateGradeForm();
      } else if (change.previousValue === undefined && change.currentValue === undefined) {
        // Handle case for when there is no grade
        this.gradeForm = this.generateGradeForm();
      }
    }
  }

  handleGradeUpdate() {
    const score = this.gradeForm.get("grade").value;
    // Only make request when we have to
    if (score !== this.grade.score) {
      this.grade.score = score;
      this.onGradeUpdate.emit(this.grade);
    }
  }


  private generateGradeForm(): FormGroup {
    if (this.grade !== undefined) {
      return this.fb.group({
        "grade": this.grade.score
      })
    } else {
      return this.fb.group({
        "grade": 0
      });
    }
  }
}
