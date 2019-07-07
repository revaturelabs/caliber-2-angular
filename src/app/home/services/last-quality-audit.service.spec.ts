import { TestBed } from '@angular/core/testing';

import { LastQualityAuditService } from './last-quality-audit.service';

describe('LastQualityAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LastQualityAuditService = TestBed.get(LastQualityAuditService);
    expect(service).toBeTruthy();
  });
});
