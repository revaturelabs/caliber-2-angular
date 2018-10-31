import { TestBed } from '@angular/core/testing';

import { TraineesService } from './trainees';

describe('ViewAllTraineesService', () => {
  let service: TraineesService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(TraineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
