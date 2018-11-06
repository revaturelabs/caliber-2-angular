import { TestBed, inject, async } from '@angular/core/testing';

import { BatchService } from './batch.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Batch } from './type/batch';
import { BLocation } from './type/location';
import { Trainer } from './type/trainer';

describe('BatchService', () => {
  let batchService: BatchService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      BatchService
    ]
  }));

  beforeEach(() => {
    batchService = TestBed.get(BatchService);
  });

  it('should be created', () => {
    expect(batchService).toBeTruthy();
  });

  it('should get all batches',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let batches: Batch[];
        bs.getAllBatches().subscribe(all => {
          batches = all;
        });
        const req = httpMock.expectOne('http://localhost:9095/vp/batch/all');
        expect(req.request.method).toEqual('GET');
        const b1 = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45);
        const b2 = new Batch('testing2', 'Revature', 'test2', 'test trainer', 'co trainer', 2, new Date(''), new Date(''), 45, 40);
        req.flush([b1, b2]);
      })
  );

  it('should get a single batch',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let batch: Batch;
        const testBatch = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45);
        testBatch.batchId = 1;
        bs.getBatch(testBatch).subscribe(b => {
          batch = b;
        });
        const req = httpMock.expectOne('http://localhost:9095/all/batch/1');
        expect(req.request.method).toEqual('GET');
        const testBatch2 = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45);
        testBatch2.batchId = 1;
        req.flush([testBatch2]);
      })
  );

  it('should get all batches by year',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let batches: Batch[];
        bs.getBatchesByYear(2018).subscribe(b => {
          batches = b;
        });
        const req = httpMock.expectOne('http://localhost:9095/vp/batch/');
        expect(req.request.method).toEqual('GET');
        const testBatch = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1,
          new Date('2018-10-04'), new Date(''), 50, 45);
        req.flush([testBatch]);
      })
  );

  it('should post a batch',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        const testBatch = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45);
        bs.postBatch(testBatch).subscribe(b => { });
        const req = httpMock.expectOne('http://localhost:9095/all/batch/create');
        expect(req.request.method).toEqual('POST');
      })
  );

  it('should update a batch',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        const testBatch = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45);
        bs.putBatch(testBatch).subscribe(b => { });
        const req = httpMock.expectOne('http://localhost:9095/all/batch/update');
        expect(req.request.method).toEqual('PUT');
      })
  );

  it('should delete a batch',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        bs.deleteBatch(1).subscribe(b => { });
        const req = httpMock.expectOne('http://localhost:9095/all/batch/delete');
        expect(req.request.method).toEqual('DELETE');
      })
  );

  it('should get all skill types',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let skillTypes: string[];
        bs.getAllSkillTypes().subscribe(st => {
          skillTypes = st;
        });
        const req = httpMock.expectOne('http://localhost:8080/types/skill/all');
        expect(req.request.method).toEqual('GET');
        const s1 = 'Java';
        const s2 = 'PEGA';
        req.flush([s1, s2]);
      })
  );

  it('should get all start years',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let years: number[];
        bs.getAllYears().subscribe(y => {
          years = y;
        });
        const req = httpMock.expectOne('http://localhost:9095/valid_years');
        expect(req.request.method).toEqual('GET');
        const y1 = 2018;
        const y2 = 2019;
        req.flush([y1, y2]);
      })
  );

  it('should get all locations',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let locations: BLocation[];
        bs.getAllLocations().subscribe(l => {
          locations = l;
        });
        const req = httpMock.expectOne('http://localhost:8040/all/location/all');
        expect(req.request.method).toEqual('GET');
        const l1 = new BLocation();
        const l2 = new BLocation();
        req.flush([l1, l2]);
      })
  );

  it('should get all trainers',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        let trainers: Trainer[];
        bs.getAllTrainers().subscribe(t => {
          trainers = t;
        });
        const req = httpMock.expectOne('http://localhost:9085/all/trainer/all');
        expect(req.request.method).toEqual('GET');
        const t1 = new Trainer();
        const t2 = new Trainer();
        req.flush([t1, t2]);
      })
  );

  it('should get number of trainees in all batches for specified year',
    inject([HttpTestingController, BatchService],
      (httpMock: HttpTestingController, bs: BatchService) => {
        const batchIds: number[] = [1, 2, 3];
        let nums: number[][];
        bs.getTraineeCount(batchIds).subscribe(ids => {
          nums = ids;
        });
        const req = httpMock.expectOne('http://localhost:9085/all/count/');
        expect(req.request.method).toEqual('GET');
        const n1: number[][] = null;
        req.flush(n1);
      })
  );


});


