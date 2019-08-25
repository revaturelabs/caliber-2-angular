import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationrowComponent } from './locationrow.component';

describe('LocationrowComponent', () => {
  let component: LocationrowComponent;
  let fixture: ComponentFixture<LocationrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
