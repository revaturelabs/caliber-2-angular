import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraineeComponent } from './add-trainee.component';

describe('AddTraineeComponent', () => {
  let component: AddTraineeComponent;
  let fixture: ComponentFixture<AddTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
