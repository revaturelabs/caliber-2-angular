import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastQualityAuditComponent } from './last-quality-audit.component';

describe('LastQualityAuditComponent', () => {
  let component: LastQualityAuditComponent;
  let fixture: ComponentFixture<LastQualityAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastQualityAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastQualityAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
