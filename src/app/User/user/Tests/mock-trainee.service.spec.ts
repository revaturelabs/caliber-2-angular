import { TestBed } from '@angular/core/testing';

import { MockTraineeService } from './mock-trainee.service';

describe('MockTraineeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockTraineeService = TestBed.get(MockTraineeService);
    expect(service).toBeTruthy();
  });
});
