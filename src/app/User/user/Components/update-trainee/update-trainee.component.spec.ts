import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTraineeComponent } from './update-trainee.component';

describe('UpdateTraineeComponent', () => {
  let component: UpdateTraineeComponent;
  let fixture: ComponentFixture<UpdateTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
