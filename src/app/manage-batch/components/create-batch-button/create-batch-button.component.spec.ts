import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchButtonComponent } from './create-batch-button.component';

describe('CreateBatchButtonComponent', () => {
  let component: CreateBatchButtonComponent;
  let fixture: ComponentFixture<CreateBatchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBatchButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBatchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
