import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentResultSpinnerComponent } from './assessment-result-spinner.component';

describe('AssessmentResultSpinnerComponent', () => {
  let component: AssessmentResultSpinnerComponent;
  let fixture: ComponentFixture<AssessmentResultSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentResultSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentResultSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
