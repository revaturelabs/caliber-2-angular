import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });

  it('should create an error', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const name = 'TestService';
    const message = 'this is a test';
    const error = { serviceName: name, errorMessage: message };
    service.setError(name, message);
    expect(service.error).toEqual(error);
  });
});
