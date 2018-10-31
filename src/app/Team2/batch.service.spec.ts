import { TestBed, inject, async } from '@angular/core/testing';

import { BatchService } from './batch.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      BatchService
    ]
  }));

  it('should get users', inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, apiService: BatchService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
