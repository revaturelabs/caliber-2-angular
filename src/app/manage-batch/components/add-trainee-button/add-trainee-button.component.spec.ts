import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraineeButtonComponent } from './add-trainee-button.component';

describe('AddTraineeButtonComponent', () => {
  let component: AddTraineeButtonComponent;
  let fixture: ComponentFixture<AddTraineeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTraineeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTraineeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
