import { TestBed, inject } from '@angular/core/testing';

import { ViewBatchesService } from './view-batches.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { Trainee } from '../types/trainee';

describe('ViewBatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewBatchesService = TestBed.get(ViewBatchesService);
    expect(service).toBeTruthy();
  });

  it('should get all current batches with an http request',
  inject([HttpTestingController, ViewBatchesService],
    (httpMock: HttpTestingController, vbs: ViewBatchesService) => {
      let t: Trainee[];
      vbs.getBatches().subscribe(_ => {
        t = _;
      });
      const req = httpMock.expectOne('http://localhost:9085/all/trainee?batch=2200');
      expect(req.request.method).toEqual('GET');
      const t1 = new Trainee('John Dao', 'jd@j.com', 'Dropped', '111');
      const t2 = new Trainee('Emily Dao', 'ed@j.com', 'Signed', '222');
      req.flush([t1, t2]);
    })
  );

  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

});
