import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TraineesService } from './trainees.service';
import { Trainee } from '../types/trainee';

let t1: Trainee;
let t2: Trainee;

const getUrl = 'http://localhost:9085/all/trainee?batch=';
const updateUrl = 'http://localhost:9085/all/trainee/update';
const createUrl = 'http://localhost:9085/all/trainee/create';
const deleteUrl = 'http://localhost:9085/all/trainee/delete/';

describe('TraineesService', () => {
  let service: TraineesService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TraineesService],
    imports: [HttpClientTestingModule]
  }));
beforeEach(() => {
    t1 = new Trainee();
    t2 = new Trainee();
    service = TestBed.get(TraineesService);
    t1.traineeId = 1;
    t1.name = 'John Dao';
    t1.email = 'jd@j.com';
    t1.trainingStatus = 'Dropped';
    t1.phoneNumber = '111';
    t2.traineeId = 2;
    t2.name = 'Emily Dao';
    t2.email = 'ed@j.com';
    t2.trainingStatus = 'Signed';
    t2.phoneNumber = '222';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send an http GET request and receive the appropriate response data',
    inject([HttpTestingController, TraineesService],
      (httpMock: HttpTestingController, vats: TraineesService) => {
        let t: Trainee[];
        vats.getTrainees(2200).subscribe(data => {
          t = data;
        });
        const req = httpMock.expectOne(getUrl + '2200');
        req.flush([t1, t2]);
        expect(req.request.method).toEqual('GET');
        expect(t).toEqual([t1, t2]);
      }
    )
  );

  it('should send an http POST request and receive the appropriate response data',
    inject([HttpTestingController, TraineesService],
      (httpMock: HttpTestingController, vats: TraineesService) => {
        let t: Trainee;
        vats.createTrainee(t).subscribe(data => {
          t = data;
        });
        const req = httpMock.expectOne(createUrl);
        req.flush(t1);
        expect(req.request.method).toEqual('POST');
        expect(t).toEqual(t1);
      }
    )
  );

  it('should send an http PUT request and receive the appropriate response data',
    inject([HttpTestingController, TraineesService],
      (httpMock: HttpTestingController, vats: TraineesService) => {
        let t: Trainee;
        vats.updateTrainee(t).subscribe(data => {
          t = data;
        });
        const req = httpMock.expectOne(updateUrl);
        req.flush(t1);
        expect(req.request.method).toEqual('PUT');
        expect(t).toEqual(t1);
      }
    )
  );

  it('should send an http DELETE request and receive the appropriate response data',
    inject([HttpTestingController, TraineesService],
      (httpMock: HttpTestingController, vats: TraineesService) => {
        vats.deleteTrainee(t1.traineeId).subscribe();
        const req = httpMock.expectOne(deleteUrl + t1.traineeId);
        expect(req.request.method).toEqual('DELETE');
      }
    )
  );

  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));
});
