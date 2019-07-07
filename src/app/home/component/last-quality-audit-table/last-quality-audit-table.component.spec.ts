import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastQualityAuditTableComponent } from './last-quality-audit-table.component';

describe('LastQualityAuditTableComponent', () => {
  let component: LastQualityAuditTableComponent;
  let fixture: ComponentFixture<LastQualityAuditTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastQualityAuditTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastQualityAuditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
