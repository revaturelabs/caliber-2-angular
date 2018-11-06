import { TestBed, inject } from '@angular/core/testing';
import { ViewBatchesService } from './view-batches.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Trainee } from '../types/trainee';
import { Batch } from 'src/app/Batch/type/batch';

describe('ViewBatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ViewBatchesService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ViewBatchesService = TestBed.get(ViewBatchesService);
    expect(service).toBeTruthy();
  });

  it('should get all current batches with an http request',
    inject([HttpTestingController, ViewBatchesService],
      (httpMock: HttpTestingController, vbs: ViewBatchesService) => {
        let t: Batch[];
        vbs.getBatches().subscribe(_ => {
          t = _;
        });
        const req = httpMock.expectOne('http://localhost:9085/vp/batch/all/');
        expect(req.request.method).toEqual('GET');
        const t1 = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1,
          new Date('2018-10-04'), new Date(''), 50, 45);
        const t2 = new Batch('testing2', 'Revature', 'test2', 'test train2', 'cotrainer', 2,
          new Date('2018-10-04'), new Date(''), 50, 45);
        req.flush([t1, t2]);
      })
  );

  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

});
