import { TestBed } from '@angular/core/testing';

import { AssessCategoryService } from './assess-category.service';

describe('AssessCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessCategoryService = TestBed.get(AssessCategoryService);
    expect(service).toBeTruthy();
  });
});
