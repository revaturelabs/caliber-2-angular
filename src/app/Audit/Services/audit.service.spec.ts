import { TestBed, inject } from '@angular/core/testing';

import { AuditService } from './audit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Batch } from 'src/app/Batch/type/batch';
import { QcNote } from '../types/note';
import { Trainer } from 'src/app/Batch/type/trainer';
import { BatchService } from 'src/app/Batch/batch.service';
import { NoteService } from 'src/app/Assess-Batch/Services/note.service';
import { Note } from 'src/app/Batch/type/note';
import { asElementData } from '@angular/core/src/view';
import { environment } from 'src/environments/environment';
import { Trainee } from 'src/app/Batch/type/trainee';

describe('AuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AuditService],
  }))
  var batchNumberOfYears: number = 0; // storing this value to avoid making another API call.
  var updateBatchURL = environment.serverRootURL + "/batch/all/batch/update";
  var notesByBatchByWeekURL = environment.serverRootURL + "/qa/audit/notes";
  var updateNoteURL = environment.serverRootURL + "/qa/audit/update"
  var batchesYearURL = environment.serverRootURL + '/qa/batch';

  it('should be created', () => {
    const service: AuditService = TestBed.get(AuditService);
    expect(service).toBeTruthy();
  });

  // getBatchesByYear
  it('should get batches by years', () => {
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let batch: Batch[];
        as.getBatchesByYear(2018).subscribe(n => {
          batch = n;
        });
        const req = httpMock.expectOne(batchesYearURL + '/2018/1');
        expect(req.request.method).toEqual('GET');
      })
  });

  //updateBatch
  it('should update a batch',
    inject([HttpTestingController, AuditService], //Inject an HttpTestingController instead of an HttpClient
      (httpMock: HttpTestingController, as: AuditService) => {
        const testBatch = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45, 1);
        as.updateBatch(testBatch).subscribe(b => { }); // Run the function you want to test
        const req = httpMock.expectOne(updateBatchURL); //Check if the URL the function attempted to call is correct
        expect(req.request.method).toEqual('PUT');  //Check if the HTTP Method it used is correct
      })
  );

  //getBatchesByYearByQuarter
  it('should get batches by year by Quarter',
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let batch: Batch[];
        as.getBatchesByYearByQuarter(2017, 1).subscribe(n => {
          batch = n;
        });
        const req = httpMock.expectOne(batchesYearURL + '/2017/1');
        expect(req.request.method).toEqual('GET');
      })
  );

  //getAllYears()
  it('should get all years', () => {

    const service: AuditService = TestBed.get(AuditService);
    console.log("Inside function")
    service.getAllYears().subscribe(result => {
      this.bathYears = result;
      console.log(this.batchYears);
    });
    batchNumberOfYears = service.getAllYears().subscribe.length;
    expect(service.getAllYears().subscribe.length).toBeGreaterThan(0);
    console.log("Number of years in Batch " + batchNumberOfYears);
  });

  //getNotesByBatchByWeek -- 
  it('should get notes by batch week',
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let qcNotes: QcNote[];
        as.getNotesByBatchByWeek(2018, 1).subscribe(n => {
          qcNotes = n;
        });
          const req = httpMock.expectOne(notesByBatchByWeekURL + '/2018/1');
        console.log("notesbyweekURL = " + req);
        expect(req.request.method).toEqual('GET');
      })
  );

  //sendNote
  it('should send note',
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        const qcNote = new QcNote(100, "test note", 2, null, null, 11, "test", "test", null, null, 22);
        as.sendNote(qcNote).subscribe(b => { }); // Run the function you want to test
        const req = httpMock.expectOne(updateNoteURL); //Check if the URL the function attempted to call is correct
        expect(req.request.method).toEqual('PUT');  //Check if the HTTP Method it used is correct
      })
  );

  //getOverallBatchNoteByWeek
  it('should get overall batch not by week',
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let qcNote: QcNote[];
        as.getOverallBatchNoteByWeek(1, 2).unsubscribe
        const req = httpMock.expectOne(notesByBatchByWeekURL + '/overall/1/2');
        expect(req.request.method).toEqual('GET');
      })
  );

  it('sorts notes by trainee name',
    inject([AuditService, NoteService],
      (as: AuditService, ns: NoteService) => {
        let trainee1 = new Trainee();
        trainee1.batchId = 2;
        trainee1.name = "Martin, Angela";
        let trainee2 = new Trainee();
        trainee2.batchId = 2;
        trainee2.name = "Malone, Kevin";
        let trainee3 = new Trainee();
        trainee3.batchId = 2;
        trainee3.name = "Bernard, Andy";
        let notes:QcNote[] = [
          new QcNote(
            45,
            "example45",
            1,
            2,
            trainee1,
            5477,
            "QC_TRAINEE",
            "Undefined",
            1559573404816,
            null,
            null
          ),
          new QcNote(
            46,
            "example46",
            1,
            2,
            trainee2,
            5478,
            "QC_TRAINEE",
            "Average",
            1559573404817,
            null,
            null
          ),
          new QcNote(
            47,
            "example47",
            1,
            2,
            trainee3,
            5479,
            "QC_TRAINEE",
            "Good",
            1559573404818,
            null,
            null
          )
        ]

        as.sortAlphabetically(notes);
        expect(notes[0].noteId).toEqual(47);
        expect(notes[1].noteId).toEqual(46);
        expect(notes[2].noteId).toEqual(45);
      })
  );

});
