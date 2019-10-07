import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeModalComponent } from './trainee-modal.component';

describe('EditTraineeModalComponent', () => {
  let component: TraineeModalComponent;
  let fixture: ComponentFixture<TraineeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
