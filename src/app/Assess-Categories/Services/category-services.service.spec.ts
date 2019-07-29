import { TestBed } from '@angular/core/testing';

import { CategoryServicesService } from './category-services.service';

describe('CategoryServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryServicesService = TestBed.get(CategoryServicesService);
    expect(service).toBeTruthy();
  });
});
