import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchModalComponent } from './edit-batch-modal.component';

describe('EditBatchModalComponent', () => {
  let component: EditBatchModalComponent;
  let fixture: ComponentFixture<EditBatchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
