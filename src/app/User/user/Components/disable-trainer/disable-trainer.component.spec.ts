import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableTrainerComponent } from './disable-trainer.component';

describe('DisableTrainerComponent', () => {
  let component: DisableTrainerComponent;
  let fixture: ComponentFixture<DisableTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
