import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsColumnComponent } from './assessment-details-column.component';

describe('AssessmentDetailsColumnComponent', () => {
  let component: AssessmentDetailsColumnComponent;
  let fixture: ComponentFixture<AssessmentDetailsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentDetailsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDetailsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
