import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { BatchModalComponent } from './batch-modal.component';
import { BatchService } from '../batch.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Batch } from '../type/batch';

describe('BatchModalComponent', () => {
  let component: BatchModalComponent;
  let testService: BatchService;

  beforeEach(() => {
    component = new BatchModalComponent(testService);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should have goodGradeThreshold be undefined', () => {
    expect(component.goodGradeThreshold).toBeUndefined();
  });

  it('should have goodGradeThreshold not be undefined', () => {
    component.goodGradeThreshold = 1;
    expect(component.goodGradeThreshold).toBeDefined();
  });

  it('should have goodGradeThreshold be equal to borderlineGradeThreshold', () => {
    component.goodGradeThreshold = 1;
    component.setMinGrade();
    expect(component.borderlineGradeThreshold).toBeGreaterThanOrEqual(component.goodGradeThreshold);
  });

  it('should have borderlineGradeThreshold not be greater than goodGradeThreshold', () => {
    component.goodGradeThreshold = 3;
    component.borderlineGradeThreshold = 4;
    component.lowerMinGrade();
    expect(component.borderlineGradeThreshold).toBeLessThanOrEqual(component.goodGradeThreshold);
  });
});


