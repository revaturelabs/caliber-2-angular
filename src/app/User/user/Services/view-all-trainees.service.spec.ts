import { TestBed } from '@angular/core/testing';

import { ViewAllTraineesService } from './view-all-trainees.service';

describe('ViewAllTraineesService', () => {
  let service: ViewAllTraineesService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(ViewAllTraineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
