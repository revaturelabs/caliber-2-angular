import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastQualityAuditTableRowComponent } from './last-quality-audit-table-row.component';

describe('LastQualityAuditTableRowComponent', () => {
  let component: LastQualityAuditTableRowComponent;
  let fixture: ComponentFixture<LastQualityAuditTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastQualityAuditTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastQualityAuditTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
