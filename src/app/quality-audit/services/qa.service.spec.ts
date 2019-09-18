import { TestBed } from '@angular/core/testing';

import { QaService } from './qa.service';

describe('QaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QaService = TestBed.get(QaService);
    expect(service).toBeTruthy();
  });
});
