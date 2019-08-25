import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlocationmodalComponent } from './addlocationmodal.component';

describe('AddlocationmodalComponent', () => {
  let component: AddlocationmodalComponent;
  let fixture: ComponentFixture<AddlocationmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlocationmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlocationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
