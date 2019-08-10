import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { OverallComponent } from './overall.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QcNote } from '../../types/note';
import { AuditService } from '../../Services/audit.service';
import { of, Observable, throwError } from 'rxjs';
import { send } from 'q';
import { HttpErrorResponse } from '@angular/common/http';


describe('OverallComponent', () => {
  let component: OverallComponent;
  let fixture: ComponentFixture<OverallComponent>;
  let overallNote: QcNote;
  let auditService: AuditService;
  let subscribeBatchNoteSpy;
  let subscribeInvokeAssociateFunction;
  let sendNoteSpy;
  let subscribeOverallNoteSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverallComponent,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [AuditService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallComponent);
    component = fixture.componentInstance;
    component.note = new QcNote(1, 'test note', 1, 1, null, 0, 'QC_BATCH', 'Undefined', 0, null, 0);
    overallNote = new QcNote(102, "batchNote102", 1, 2, null, 0, "QC_BATCH", "Undefined", 1559573404871, null, null);
    auditService = fixture.debugElement.injector.get(AuditService);
    auditService.selectedBatch = {
      batchId: 1,
      trainingName: "string",
      trainingType: "string",
      skillType: "string",
      trainer: "string",
      coTrainer: "string",
      location: "string",
      locationId: 5,
      startDate: new Date(),
      endDate: new Date(),
      goodGrade: 85,
      passingGrade: 70,
      traineeCount: 20,
      weeks: 10
    };
    auditService.selectedWeek = 7;


    subscribeBatchNoteSpy = spyOn(auditService.overallBatchNoteChanged, 'subscribe').and.callThrough();
    subscribeInvokeAssociateFunction = spyOn(auditService.invokeAssosciateFunction, 'subscribe');
    sendNoteSpy = spyOn(auditService, "sendNote");
    subscribeOverallNoteSpy = spyOn(auditService, "getOverallBatchNoteByWeek");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // showSpinner
  it('shows a spinner', () => {
    component.showSpinner();
    expect(component.isSpinning).toBe(true);
    expect(component.isCheck).toBe(false);
    expect(component.isError).toBe(false);
  });

  // clearAllSavingIcon
  it('clears the saving icon', () => {
    component.clearAllSavingIcon();
    expect(component.isSpinning).toBe(false);
    expect(component.isCheck).toBe(false);
    expect(component.isError).toBe(false);
  })

  it('sets subscriptions from audit service', () => {
    component.ngOnInit();
    expect(subscribeBatchNoteSpy).toHaveBeenCalled();
    expect(subscribeInvokeAssociateFunction).toHaveBeenCalled();
  });

  // noteOnBlur
  it('saves the note', () => {
    sendNoteSpy.and.returnValue(of(1));
    component.isTyping = true;
    component.noteOnBlur(1, false);
    expect(sendNoteSpy).toHaveBeenCalledWith(component.note);
    expect(component.isCheck).toBe(true);
  });

  // noteOnBlur
  it('shows a failed save', () => {
    sendNoteSpy.and.returnValue(throwError(new HttpErrorResponse({ status: 400 })));
    component.noteOnBlur(1, false);
    expect(sendNoteSpy).toHaveBeenCalledWith(component.note);
    expect(component.isError).toBe(true);
    expect(component.isCheck).toBe(false);
  });

  // setScore
  it('should set score for QC note', () => {
    sendNoteSpy.and.returnValue(of(1));
    component.setScore("yellow", 1);
    expect(sendNoteSpy).toHaveBeenCalledWith(component.note);
    expect(component.note.qcStatus).toBe("yellow");
    expect(subscribeBatchNoteSpy).toHaveBeenCalled();
    expect(subscribeOverallNoteSpy).toHaveBeenCalled();
    expect(subscribeOverallNoteSpy).toHaveBeenCalledWith(1, 7);
  });

  // ngOnDestroy
  it('should unsubscribe from note subscription', () => {
    component.ngOnDestroy();
    expect(component.noteSubscription.closed).toBeTruthy();
  })

});
