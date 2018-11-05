import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchViewComponent } from './batch-view.component';
import { BatchService } from '../batch.service';

describe('BatchViewComponent', () => {
  let component: BatchViewComponent;
  let fixture: ComponentFixture<BatchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('BatchViewMethods', () => {
  let batchComponent: BatchViewComponent;
  let batchService: BatchService;

  beforeEach(() => {
    batchComponent = new BatchViewComponent(batchService);
  });
});
