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
import { EventEmitter } from '@angular/core';
import { Tag } from '../types/Tag';

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
  var saveFlagURL = environment.serverRootURL+'/qa/trainee/update';
  var categoriesByBatchByWeekURL = environment.serverRootURL +'/qa/category/';
  var deleteCategoryURL = environment.serverRootURL+ '/qa/category/delete/';

  let trainee1 = new Trainee();
        trainee1.batchId = 2;
        trainee1.name = "Martin, Angela";
        let trainee2 = new Trainee();
        trainee2.batchId = 2;
        trainee2.name = "Malone, Kevin";
        let trainee3 = new Trainee();
        trainee3.batchId = 2;
        trainee3.name = "Bernard, Andy";
  let notesFake:QcNote[] = [
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

  //Fix should create test (it didn't account for injection)
  it('should be created', () => {
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
      expect(httpMock).toBe(TestBed.get(AuditService));
    })
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
  it('should update a batch', () => {
    inject([HttpTestingController, AuditService], //Inject an HttpTestingController instead of an HttpClient
      (httpMock: HttpTestingController, as: AuditService) => {
        const testBatch = new Batch('testing1', 'Revature', 'test1', 'test train1', 'cotrainer', 1, new Date(''), new Date(''), 50, 45, 1);
        as.updateBatch(testBatch).subscribe(b => { }); // Run the function you want to test
        const req = httpMock.expectOne(updateBatchURL); //Check if the URL the function attempted to call is correct
        expect(req.request.method).toEqual('PUT');  //Check if the HTTP Method it used is correct
      })
    }
  );

  //getBatchesByYearByQuarter
  it('should get batches by year by Quarter', () => {
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let batch: Batch[];
        as.getBatchesByYearByQuarter(2017, 1).subscribe(n => {
          batch = n;
        });
        const req = httpMock.expectOne(batchesYearURL + '/2017/1');
        expect(req.request.method).toEqual('GET');
      })
    }
  );

  //getAllYears()
  it('should get all years', () => {
    inject([AuditService],
      (service: AuditService) => {
        service.getAllYears().subscribe(result => {
          this.bathYears = result;
        });
        batchNumberOfYears = service.getAllYears().subscribe.length;
        expect(service.getAllYears().subscribe.length).toBeGreaterThan(0);
    })
    
  });

  //getNotesByBatchByWeek -- 
  it('should get notes by batch week', () => {
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let qcNotes: QcNote[];
        as.getNotesByBatchByWeek(2018, 1).subscribe(n => {
          qcNotes = n;
        });
        const req = httpMock.expectOne(notesByBatchByWeekURL + '/2018/1');
        expect(req.request.method).toEqual('GET');
      })
    }
  );

  //sendNote
  it('should send note', () => {
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        const qcNote = new QcNote(100, "test note", 2, null, null, 11, "test", "test", null, null, 22);
        as.sendNote(qcNote).subscribe(b => { }); // Run the function you want to test
        const req = httpMock.expectOne(updateNoteURL); //Check if the URL the function attempted to call is correct
        expect(req.request.method).toEqual('PUT');  //Check if the HTTP Method it used is correct
      })
    }
  );

  //getOverallBatchNoteByWeek
  it('should get overall batch note by week', () => {
    inject([HttpTestingController, AuditService],
      (httpMock: HttpTestingController, as: AuditService) => {
        let qcNote: QcNote[];
        as.getOverallBatchNoteByWeek(1, 2).unsubscribe
        const req = httpMock.expectOne(notesByBatchByWeekURL + '/overall/1/2');
        expect(req.request.method).toEqual('GET');
      })
    }
  );
  
  //Sort by trainee name
  it('sorts notes by trainee name', () => {
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
    }
  );
  /* Zechariahs1
  * tests the onCLick fires an emit
  */
  it("should emit on click",()=>{
    inject([HttpTestingController, AuditService],() => {
      const fixture = TestBed.createComponent(AuditService);
      const component = fixture.componentInstance; 
      spyOn(component.invokeAssosciateFunction, 'emit');
      component.onWeekClick();
      expect(component.invokeAssosciateFunction.emit).toHaveBeenCalled();
      })
  });
  
  /*   Zechariahs1
  *  Test getAllActiveCategories will fire get Request 
  */
  it("should get  all Active Categories", ()=>{
    inject([AuditService],
      (service: AuditService) => {
        expect(service.getAllActiveCategories().subscribe.length).toEqual(1);
    })
  })

  /* Zechariahs1
  *  Test getCategoriesByBatchByWeek will fire get request
  */
 it("should get Categories by batch by week", ()=>{
  inject([HttpTestingController, AuditService],
    (httpMock: HttpTestingController, service: AuditService) => {
      let tags: Tag[];
      service.getCategoriesByBatchByWeek(2018, 1).subscribe(n => {
        tags = n;
      });
      const req = httpMock.expectOne(notesByBatchByWeekURL + '/2018/1/all');
      expect(req.request.method).toEqual('GET');
    
      req.flush(tags);
      httpMock.verify()
    })
})
 /* Zechariahs1
  *  Test getNotesForTrainee will fire get request
  */
 it("should get get Notes For a specific Trainee", ()=>{
  inject([HttpTestingController, AuditService],
    (httpMock: HttpTestingController, service: AuditService) => {
      let qcNotes: QcNote[];
      service.getNotesByBatchByWeek(2018, 1).subscribe(n => {
        qcNotes = n;
      });
      const req = httpMock.expectOne(notesByBatchByWeekURL + '/2019/1');
      expect(req.request.method).toEqual('GET');
    
      req.flush(qcNotes);
      httpMock.verify()
    })
})
/* Zechariahs1
  *  Test setNote will be an array from data sent
  */
 it("should set Note", ()=>{
  inject([HttpTestingController, AuditService],
    (httpMock: HttpTestingController, service: AuditService) => {
      service.setNotes(notesFake)
      expect(service.notes).toBe(notesFake)
      
    })
})
/* Zechariahs1
  *  Test saveFlag will fire put request
  */
 it("should save the flag", ()=>{
  inject([HttpTestingController, AuditService],
    (httpMock: HttpTestingController, service: AuditService) => {
    service.saveFlag(trainee1).subscribe(b => { }); // Run the function you want to test
      const req = httpMock.expectOne(saveFlagURL); //Check if the URL the function attempted to call is correct
      expect(req.request.method).toEqual('PUT');
      
    })
})
  /* Zechariahs1
  *  Test sendCategory will fire post request
  */
 it("should send Category using post", ()=>{
  inject([HttpTestingController, AuditService],
    (httpMock: HttpTestingController, service: AuditService) => {
      let tag: Tag;
      tag= new Tag (6000,"Yeet",96,5)
        
      service.sendCategory(tag).subscribe(n => {
        this.tagm = n;
      });
      const req = httpMock.expectOne(categoriesByBatchByWeekURL);
      expect(req.request.method).toEqual('POST');
    
      req.flush(tag);
      httpMock.verify()
    })
})

  /* Zechariahs1
  *  Test deleteCategory will fire delete request
  */
 it("should delete a Category", ()=>{
  inject([HttpTestingController, AuditService],
    (httpMock: HttpTestingController, service: AuditService) => {
      let tag: Tag;
      tag= new Tag (6000,"Yeet",96,5)
        
      service.deleteCategory(tag.categoryId).subscribe(n => {
        this.tagm = n;
      });
      const req = httpMock.expectOne(deleteCategoryURL);
      expect(req.request.method).toEqual('DELETE');
    
      req.flush(tag);
      httpMock.verify()
    })
})


});