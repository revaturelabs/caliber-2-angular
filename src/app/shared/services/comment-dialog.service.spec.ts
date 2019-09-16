import { TestBed } from '@angular/core/testing';

import { CommentDialogService } from './comment-dialog.service';

describe('CommentDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentDialogService = TestBed.get(CommentDialogService);
    expect(service).toBeTruthy();
  });
});
