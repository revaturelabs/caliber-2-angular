import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareAssessmentScoresComponent } from './compare-assessment-scores.component';

describe('BatchCumulativeScoresComponent', () => {
  let component: CompareAssessmentScoresComponent;
  let fixture: ComponentFixture<CompareAssessmentScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareAssessmentScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareAssessmentScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
