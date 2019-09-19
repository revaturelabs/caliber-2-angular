import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcFeedbackComponent } from './qc-feedback.component';

describe('QcFeedbackComponent', () => {
  let component: QcFeedbackComponent;
  let fixture: ComponentFixture<QcFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
