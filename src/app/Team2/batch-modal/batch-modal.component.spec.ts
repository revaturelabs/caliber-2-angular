import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchModalComponent } from './batch-modal.component';

describe('BatchModalComponent', () => {
  let component: BatchModalComponent;
  let fixture: ComponentFixture<BatchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
