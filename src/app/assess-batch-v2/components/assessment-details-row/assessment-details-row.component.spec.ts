import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsRowComponent } from './assessment-details-row.component';

describe('AssessmentDetailsRowComponent', () => {
  let component: AssessmentDetailsRowComponent;
  let fixture: ComponentFixture<AssessmentDetailsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentDetailsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDetailsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
