import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableLocationModalComponent } from './disable-location-modal.component';

describe('DisableLocationModalComponent', () => {
  let component: DisableLocationModalComponent;
  let fixture: ComponentFixture<DisableLocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableLocationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
