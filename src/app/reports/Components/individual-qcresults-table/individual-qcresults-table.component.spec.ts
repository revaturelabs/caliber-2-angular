import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualQCResultsTableComponent } from './individual-qcresults-table.component';

describe('IndividualQCResultsTableComponent', () => {
  let component: IndividualQCResultsTableComponent;
  let fixture: ComponentFixture<IndividualQCResultsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualQCResultsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualQCResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
