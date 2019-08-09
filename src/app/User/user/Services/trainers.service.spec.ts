import { TestBed } from '@angular/core/testing';

import { TrainersService } from './trainers.service';

describe('TrainersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainersService = TestBed.get(TrainersService);
    expect(service).toBeTruthy();
  });
});
