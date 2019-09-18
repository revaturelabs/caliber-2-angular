import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchLevelFeedbackComponent } from './batch-level-feedback.component';

describe('BatchLevelFeedbackComponent', () => {
  let component: BatchLevelFeedbackComponent;
  let fixture: ComponentFixture<BatchLevelFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchLevelFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchLevelFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
