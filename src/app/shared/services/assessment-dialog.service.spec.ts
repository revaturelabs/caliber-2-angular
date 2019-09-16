import { TestBed } from '@angular/core/testing';

import { AssessmentDialogService } from './assessment-dialog.service';

describe('AssessmentDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentDialogService = TestBed.get(AssessmentDialogService);
    expect(service).toBeTruthy();
  });
});
