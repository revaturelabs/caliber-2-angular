import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyQualityAuditComponent } from './weekly-quality-audit.component';

describe('WeeklyQualityAuditComponent', () => {
  let component: WeeklyQualityAuditComponent;
  let fixture: ComponentFixture<WeeklyQualityAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyQualityAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyQualityAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
