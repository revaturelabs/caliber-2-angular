import { TestBed } from '@angular/core/testing';

import { FilterBatchPipeService } from './filter-batch-pipe.service';

describe('FilterBatchPipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterBatchPipeService = TestBed.get(FilterBatchPipeService);
    expect(service).toBeTruthy();
  });
});
