import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainerComponent } from './add-trainer.component';

describe('AddTrainerComponent', () => {
  let component: AddTrainerComponent;
  let fixture: ComponentFixture<AddTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
