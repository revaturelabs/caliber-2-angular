import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeActionsComponent } from './trainee-actions.component';

describe('TraineeActionsComponent', () => {
  let component: TraineeActionsComponent;
  let fixture: ComponentFixture<TraineeActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
