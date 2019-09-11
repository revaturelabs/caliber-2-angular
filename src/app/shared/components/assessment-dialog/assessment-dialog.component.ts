import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../Assess-Batch/Models/Category";
import {Assessment} from "../../../Assess-Batch/Models/Assesment";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-assessment-dialog',
  templateUrl: './assessment-dialog.component.html',
  styleUrls: ['./assessment-dialog.component.css']
})
export class AssessmentDialogComponent implements OnInit {

  week: number;
  batchId: number;
  categories: Category[];
  assessment: Assessment;
  assessmentTypes = [
    {name : 'Verbal',},
    {name: 'Exam',},
    {name :'Project',},
    {name : 'Other'}
  ];

  protected createAssessmentSubject: BehaviorSubject<Assessment> = new BehaviorSubject<Assessment>(undefined);
  protected updateAssessmentSubject: BehaviorSubject<Assessment> = new BehaviorSubject<Assessment>(undefined);
  protected deleteAssessmentSubject: BehaviorSubject<Assessment> = new BehaviorSubject<Assessment>(undefined);

  assessmentForm: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.assessmentForm = this.generateAssessmentForm();
    if (this.assessment) {
      this.assessmentForm.patchValue({
        selectedCategory: this.assessment.assessmentCategory,
        maxPoints: this.assessment.rawScore,
        assessmentType: this.assessment.assessmentType
      })
    }
  }

  getCategoryForAssessment(assessment: Assessment): string {
    if (assessment && this.categories.length > 0) {
      const found = this.categories.find(category => category.categoryId === assessment.assessmentCategory);
      if (found) {
        return found.skillCategory;
      }
    }
  }

  hasCategoryBeenSelected(): boolean {
    return Boolean(this.assessmentForm.get("selectedCategory").value);
  }

  hasAssessmentTypeBeenSelected(): boolean {
    return Boolean(this.assessmentForm.get("assessmentType").value);
  }

  handleCreateAssessment() {
    const selectedCategory: number = this.assessmentForm.get("selectedCategory").value;
    const maxPoints: number = this.assessmentForm.get("maxPoints").value;
    const assessmentType: string = this.assessmentForm.get("assessmentType").value;
    const newAssessment: Assessment = {
      assessmentCategory: selectedCategory,
      assessmentType: assessmentType,
      rawScore: maxPoints,
      batchId: this.batchId,
      weekNumber: this.week,
      assessmentTitle: ''
    };
    this.createAssessmentSubject.next(newAssessment);
    this.bsModalRef.hide();
  }

  handleUpdateAssessment() {
    const selectedCategory: number = this.assessmentForm.get("selectedCategory").value;
    const maxPoints: number = this.assessmentForm.get("maxPoints").value;
    const assessmentType: string = this.assessmentForm.get("assessmentType").value;

    // Don't update if fields havent changed
    if (selectedCategory === this.assessment.assessmentCategory && assessmentType === this.assessment.assessmentType && maxPoints === this.assessment.rawScore) {
      this.bsModalRef.hide();
      return;
    }
    this.assessment.assessmentCategory = selectedCategory;
    this.assessment.rawScore = maxPoints;
    this.assessment.assessmentType = assessmentType;
    this.updateAssessmentSubject.next(this.assessment);
    this.bsModalRef.hide();
  }

  handleDeleteAssessment() {
    this.deleteAssessmentSubject.next(this.assessment);
    this.bsModalRef.hide();
  }

  private generateAssessmentForm(): FormGroup {
    return this.fb.group({
      "selectedCategory": ["", Validators.required],
      "maxPoints": [0, [Validators.min(1), Validators.required]],
      "assessmentType": ["", Validators.required]
    })
  };

  private findCategoryById(category: number): Category {
    if (category && this.categories.length > 0) {
      const found = this.categories.find(cat => cat.categoryId === category);
      if (found) {
        return found;
      }
    }
  }

}
