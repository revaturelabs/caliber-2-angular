import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainerComponent } from './edit-trainer.component';

describe('EditTrainerComponent', () => {
  let component: EditTrainerComponent;
  let fixture: ComponentFixture<EditTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
