import { TestBed } from '@angular/core/testing';

import { QanoteService } from './qanote.service';

describe('QanoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QanoteService = TestBed.get(QanoteService);
    expect(service).toBeTruthy();
  });
});
