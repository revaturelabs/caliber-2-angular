import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlocationmodalComponent } from './editlocationmodal.component';

describe('EditlocationmodalComponent', () => {
  let component: EditlocationmodalComponent;
  let fixture: ComponentFixture<EditlocationmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlocationmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlocationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
