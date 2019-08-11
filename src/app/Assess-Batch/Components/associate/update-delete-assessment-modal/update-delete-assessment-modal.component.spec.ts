import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssessmentService } from 'src/app/Assess-Batch/Services/assessment.service';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { AssociateComponent } from 'src/app/Assess-Batch/Components/associate/associate.component';
import { Grade } from 'src/app/User/user/types/trainee';

describe('UpdateDeleteAssessmentModalComponent', () => {
  let component: UpdateDeleteAssessmentModalComponent;
  let fixture: ComponentFixture<UpdateDeleteAssessmentModalComponent>;
  let assessmentService: AssessmentService;
  let assessBatchGrade: AssessBatchGradeService;
  let assessments: Assessment[];
  let associateComponent: AssociateComponent;
  let grades:Grade[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDeleteAssessmentModalComponent],
      imports: [
        FormsModule, HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteAssessmentModalComponent);
    component = fixture.componentInstance;
    assessmentService = fixture.debugElement.injector.get(AssessmentService);
    assessBatchGrade = fixture.debugElement.injector.get(AssessBatchGradeService);

    assessments = [
      new Assessment(1, 20, "Exam", "HTML", 1, 1, 1),
      new Assessment(2, 10, "Verbal", "SQL", 1, 1, 2)
    ]
    
    component.currentAssessment = assessments[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check reset gives default values', () => {
    component.resetForm();
    expect(component.selectedType === "default").toBeTruthy();
    expect(component.selectedCategory === "default").toBeTruthy();
    expect(component.score === component.currentAssessment.rawScore).toBeTruthy();
  })

  it('should check if assessment will edit', () => {
    component.editAssessment(5, "type", 1);
    expect(component.currentAssessment.rawScore === 5).toBeTruthy();
    expect(component.currentAssessment.assessmentType === "type").toBeTruthy();
    expect(component.currentAssessment.assessmentCategory === 1).toBeTruthy();
  })

  it('should refresh page', () => {
    // spyOn(component.assessBatchGradeService, "storeAssessments").and.callFake(function(args){});
    // spyOn(component.assessBatchGradeService.assessments, "emit").and.callFake(function(args){});
    // spyOn(component.assessBatchGradeService, "storeGrades").and.callFake(function(args){});
    // spyOn(component.assessBatchGradeService.grades, "emit").and.callFake(function(args){});
    component.assessmentSerivce.assessment = new Assessment(1, 20, "Exam", "HTML", 1, 1, 1);
    component.refreshPage();
    // expect(component.assessBatchGradeService.assessments.emit).toHaveBeenCalled();
    // expect(component.assessBatchGradeService.grades.emit).toHaveBeenCalled();
  })

});
