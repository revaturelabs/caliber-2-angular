import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualQcresultsRowComponent } from './individual-qcresults-row.component';

describe('IndividualQcresultsRowComponent', () => {
  let component: IndividualQcresultsRowComponent;
  let fixture: ComponentFixture<IndividualQcresultsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualQcresultsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualQcresultsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
