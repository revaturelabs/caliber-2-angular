import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallQCScoresComponent } from './overall-qc-scores.component';

describe('OverallQCScoresComponent', () => {
  let component: OverallQCScoresComponent;
  let fixture: ComponentFixture<OverallQCScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallQCScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallQCScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
