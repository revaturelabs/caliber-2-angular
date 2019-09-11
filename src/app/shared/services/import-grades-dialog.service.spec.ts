import { TestBed } from '@angular/core/testing';

import { ImportGradesDialogService } from './import-grades-dialog.service';

describe('ImportGradesDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportGradesDialogService = TestBed.get(ImportGradesDialogService);
    expect(service).toBeTruthy();
  });
});
