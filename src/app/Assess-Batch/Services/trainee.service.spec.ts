import { TestBed, inject } from '@angular/core/testing';
import 'zone.js/dist/zone-testing'
import { TraineeService } from './trainee.service';


// import { 
//   BrowserDynamicTestingModule, 
//   platformBrowserDynamicTesting 
// } 
// from '@angular/platform-browser-dynamic/testing';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Trainee } from 'src/app/Batch/type/trainee';


// TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('TraineeService', () => {

 var userURL = environment.serverRootURL + "/user";
 var traineeBatchIdURL = "/all/trainee?batch=";
 var batchesYearURL = "/vp/batch/";
 var yearsURL = "/all/batch/valid_years";
 let ourTrainees = Trainee;
  beforeEach(() => TestBed.configureTestingModule({
   imports:[HttpClientTestingModule],
   providers: [TraineeService],
  }))


  it('should be created', () => {
    inject ([HttpTestingController],
      (httpMock : HttpTestingController)=>{
        expect(httpMock).toBe(TestBed.get(TraineeService));
      })
    })
       
    it('should get a trainees by batch ID',
inject ([HttpTestingController , TraineeService],
    (httpMock: HttpTestingController, service:
    TraineeService) => {
        let train: Trainee[]
    service.getTraineesByBatchId(1).subscribe (data => {
        data = train        
    })
    const req =httpMock.expectOne(userURL+traineeBatchIdURL + "1")
    expect(req.request.method).toEqual('GET')
}));

it('should store trainees', () => {

  expect(ourTrainees).toBeTruthy();

});

it('should return trainees', () => {

  expect(ourTrainees).toBeTruthy();

});

});
