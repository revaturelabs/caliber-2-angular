import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAuditContainerComponent } from './quality-audit-container.component';

describe('QualityAuditContainerComponent', () => {
  let component: QualityAuditContainerComponent;
  let fixture: ComponentFixture<QualityAuditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAuditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAuditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
