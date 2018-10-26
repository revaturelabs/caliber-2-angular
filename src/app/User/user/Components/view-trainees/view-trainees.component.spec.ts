import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtraineesComponent } from './view-trainees.component';

describe('ViewtraineesComponent', () => {
  let component: ViewtraineesComponent;
  let fixture: ComponentFixture<ViewtraineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtraineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
