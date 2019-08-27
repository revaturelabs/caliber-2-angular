import { TestBed } from '@angular/core/testing';

import { LocationsRoutingService } from './locations-routing.service';

describe('LocationsRoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationsRoutingService = TestBed.get(LocationsRoutingService);
    expect(service).toBeTruthy();
  });
});
