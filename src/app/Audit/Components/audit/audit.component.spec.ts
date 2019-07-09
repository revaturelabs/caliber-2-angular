import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditComponent } from './audit.component';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({selector: 'app-toolbar', template: ''})
class ToolbarStubComponent{}

@Component({selector: 'app-associate', template: ''})
class AssociateStubComponent{}

@Component({selector: 'app-overall', template: ''})
class OverallStubComponent{}

describe('AuditComponent', () => {
    let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AuditComponent,
        ToolbarStubComponent,
        AssociateStubComponent,
        OverallStubComponent,
      ],
      imports: [
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
