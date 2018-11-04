import { TestBed, inject, async } from '@angular/core/testing';

import { BatchService } from './batch.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BatchService', () => {
  let batchService: BatchService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      BatchService
    ]
  }));

  beforeEach(() => {
    batchService = TestBed.get(BatchService);
  });

  it('should be created', () => {
    expect(batchService).toBeTruthy();
  });

});
