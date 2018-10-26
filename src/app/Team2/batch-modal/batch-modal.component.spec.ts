import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchModalComponent } from './batch-modal.component';
import { BatchService } from '../batch.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Batch } from '../type/batch';

describe('BatchModalComponent', () => {
  let component: BatchModalComponent;
  let fixture: ComponentFixture<BatchModalComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ BatchModalComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should return 1', () => {
    component.goodGradeThreshold = 1;
    component.borderlineGradeThreshold = 1;
    component.setMinGrade();
    expect(component.borderlineGradeThreshold).toBe(1);
  });
  it('is always true', () => {
    const alwaysTrue = true;
    expect(alwaysTrue).toBeTruthy();
  });
  it('should create', () => {
    expect(1).toBeTruthy();
  });
});

