import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TraineesService } from './trainees.service';
import { Trainee } from '../types/trainee';

describe('ViewAllTraineesService', () => {
  let service: TraineesService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TraineesService],
    imports: [HttpClientTestingModule]
  }));
beforeEach(() => {
    service = TestBed.get(TraineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send an http request and receive the appropriate response data',
    inject([HttpTestingController, TraineesService],
      (httpMock: HttpTestingController, vats: TraineesService) => {
        let t: Trainee[];
        vats.getTrainees(2200).subscribe(data => {
          t = data;
        });
        const req = httpMock.expectOne('http://localhost:9085/all/trainee?batch=2200');
        expect(req.request.method).toEqual('GET');
      }
    )
  );

  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));
});
