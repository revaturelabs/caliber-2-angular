import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcScoresComponent } from './qc-scores.component';

describe('QcScoresComponent', () => {
  let component: QcScoresComponent;
  let fixture: ComponentFixture<QcScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
