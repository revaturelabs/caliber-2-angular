import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessmentButtonComponent } from './create-assessment-button.component';

describe('CreateAssessmentButtonComponent', () => {
  let component: CreateAssessmentButtonComponent;
  let fixture: ComponentFixture<CreateAssessmentButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssessmentButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssessmentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
