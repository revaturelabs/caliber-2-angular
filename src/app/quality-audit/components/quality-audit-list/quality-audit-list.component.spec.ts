import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAuditListComponent } from './quality-audit-list.component';

describe('QualityAuditListComponent', () => {
  let component: QualityAuditListComponent;
  let fixture: ComponentFixture<QualityAuditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAuditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
