import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LastQualityAuditComponent } from '../last-quality-audit/last-quality-audit.component';
import { LastQualityAuditGraphComponent } from '../last-quality-audit-graph/last-quality-audit-graph.component';
import { LastQualityAuditTableComponent } from '../last-quality-audit-table/last-quality-audit-table.component';
import { HomeToolbarComponent } from '../home-toolbar/home-toolbar.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, LastQualityAuditComponent, LastQualityAuditGraphComponent, LastQualityAuditTableComponent, HomeToolbarComponent ],
      imports: [
        FormsModule, HttpClientTestingModule],
        providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
