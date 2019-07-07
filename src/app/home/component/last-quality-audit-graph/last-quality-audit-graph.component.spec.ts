import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastQualityAuditGraphComponent } from './last-quality-audit-graph.component';

describe('LastQualityAuditGraphComponent', () => {
  let component: LastQualityAuditGraphComponent;
  let fixture: ComponentFixture<LastQualityAuditGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastQualityAuditGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastQualityAuditGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
