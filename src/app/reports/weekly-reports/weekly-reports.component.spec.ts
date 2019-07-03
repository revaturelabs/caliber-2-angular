import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyReportsComponent } from './weekly-reports.component';

describe('WeeklyReportsComponent', () => {
  let component: WeeklyReportsComponent;
  let fixture: ComponentFixture<WeeklyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
