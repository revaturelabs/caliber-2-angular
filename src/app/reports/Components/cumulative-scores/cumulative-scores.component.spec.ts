import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeScoresComponent } from './cumulative-scores.component';

describe('CumulativeScoresComponent', () => {
  let component: CumulativeScoresComponent;
  let fixture: ComponentFixture<CumulativeScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
