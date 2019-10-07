import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraineesModalComponent } from './view-trainees-modal.component';

describe('ViewTraineesModalComponent', () => {
  let component: ViewTraineesModalComponent;
  let fixture: ComponentFixture<ViewTraineesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTraineesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTraineesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
