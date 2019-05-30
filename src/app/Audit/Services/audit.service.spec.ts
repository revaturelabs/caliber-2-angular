import { TestBed } from '@angular/core/testing';

import { AuditService } from './audit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AuditService],
  }));

  it('should be created', () => {
    const service: AuditService = TestBed.get(AuditService);
    expect(service).toBeTruthy();
  });
});
