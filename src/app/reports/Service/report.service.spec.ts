import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

import { ReportService } from './report.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ToolbarComponent } from 'src/app/Audit/Components/toolbar/toolbar.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';
import { Batch } from 'src/app/Batch/type/batch';
import { Category, Grade } from 'src/app/User/user/types/trainee';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { QANote } from '../Models/qanote';

describe('ReportService', () => {

  beforeEach(() => TestBed.configureTestingModule({ 
    imports: [ HttpClientTestingModule ],
    // declarations: [ ToolbarComponent ],
    providers: [ ReportService]
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ToolbarComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // let component: ToolbarComponent;
  // let fixture: ComponentFixture<ToolbarComponent>;
  let url = environment.serverRootURL;
  let yearsURL = url + '/qa/batch/valid-years';
  let batchesYearURL = url + 'batch/vp/batch/';
  let categoryAllURL = url + '/category/all/active';
  let gradeAllURL = url + '/assessment/all/grade/all';
  let assessmentAllURL = url + '/assessment/all/assessment/batch/';
  let gradesByTraineeURL = url + '/assessment/all/grade/trainee/';
  let qaNotesURL = url + '/qa/audit/notes/all';

  let years: number[];
  let numberOfYears: number = 0;
 

  it('should be created', () => {
    const service: ReportService = TestBed.get(ReportService);
    expect(service).toBeTruthy();
  });


  // getAllYears
  it('should get all the years', () => {
    const service: ReportService  = TestBed.get(ReportService);
    service.getAllYears().subscribe(n => {
      years = n;
    })
    console.log("getting all the years in the report service for the toolbar component");
    numberOfYears = service.getAllYears().subscribe.length;
    expect(service.getAllYears().subscribe.length).toBeGreaterThan(0);
  });

  // getAllCategories
  it('should get all the categories', () => {
    inject([HttpTestingController, ReportService],
      (httpMock: HttpTestingController, as: ReportService) => {
        let category: Category[];
        as.getAllCategories().subscribe(n => {
          category = n;
        });
        const req = httpMock.expectOne(categoryAllURL);
        expect(req.request.method).toEqual('GET');
      })
  });

  // getBatchesByYear(year)
  it('should get batches by years', () => {
    inject([HttpTestingController, ReportService],
      (httpMock: HttpTestingController, as: ReportService) => {
        let batch: Batch[];
        as.getBatchesByYear(2018).subscribe(n => {
          batch = n;
        });
        const req = httpMock.expectOne(batchesYearURL + '/2018');
        expect(req.request.method).toEqual('GET');
      })
  });

  // getAllGradesForTotalAverage
  it('should get all the grades to calculate average grade', () => {
    inject([HttpTestingController, ReportService],
      (httpMock: HttpTestingController, as: ReportService) => {
        let grading: Grade[];
        as.getAllGradesForTotalAverage().subscribe(n => {
          grading = n;
        });
        const req = httpMock.expectOne(gradeAllURL);
        expect(req.request.method).toEqual('GET');
      })
  })

  // getAllAssessments
  it('should get all the assessments for a batch', () => {
    inject([HttpTestingController, ReportService],
      (httpMock: HttpTestingController, as: ReportService) => {
        let assess: Assessment[];
        as.getAllAssessments().subscribe(n => {
          assess = n;
        });
        const req = httpMock.expectOne(assessmentAllURL + '/2150');
        expect(req.request.method).toEqual('GET');
      })
  })

  // getAllTraineeGrades
  it('should get all the grades for the trainee', () => {
    inject([HttpTestingController, ReportService], 
      (httpMock: HttpTestingController, as: ReportService) => {
        let traineeGrade: Grade[];
        as.getAllTraineeGrades().subscribe(n => {
          traineeGrade = n;
        });
        const req = httpMock.expectOne(gradesByTraineeURL + '/5354');
        expect(req.request.method).toEqual('GET');
      });
  });

  // getAllQANotes
  it('should get all the qa notes for the batch', () => {
    inject([HttpTestingController, ReportService],
      (httpMock: HttpTestingController, as: ReportService) => {
        let qaNote: QANote[];
        as.getAllQANotes().subscribe(n => {
          qaNote = n;
        });
        const req = httpMock.expectOne(qaNotesURL + '/2150');
        expect(req.request.method).toEqual('GET');
      });
  });
});
