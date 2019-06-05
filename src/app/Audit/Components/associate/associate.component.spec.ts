import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateComponent } from './associate.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QcNote } from '../../types/note';
import { Trainee } from 'src/app/Batch/type/trainee';
import { AuditService } from '../../Services/audit.service';

describe('AssociateComponent', () => {
  let component: AssociateComponent;
  let fixture: ComponentFixture<AssociateComponent>;
  let auditService :AuditService;
  let getNoteSpy;
  let notes: QcNote[];
  let trainee1: Trainee;
  let trainee2: Trainee;
  let trainee3: Trainee;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule],
      providers: [AuditService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateComponent);
    component = fixture.componentInstance;
    auditService = fixture.debugElement.injector.get(AuditService);
    trainee1 = new Trainee();
    trainee1.batchId = 2;
    trainee1.name = "Martin, Angela";
    trainee2 = new Trainee();
    trainee2.batchId = 2;
    trainee2.name = "Malone, Kevin";
    trainee3 = new Trainee();
    trainee3.batchId = 2;
    trainee3.name = "Bernard, Andy";

    notes = [
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
    auditService.notes = notes;
    // getNoteSpy = spyOn(component.auditService, 'getAllYears').and.returnValue(of([2017, 2018, 2019]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get note', () => {
    console.log(component.notes);
    let testNote: QcNote;
    testNote = component.getNote(47);
    expect(testNote.noteId).toEqual(47);
  })

  it('should toggle note array sortRandom = true', () =>
  {
    component.toggleNotesArray();
    expect(component.sortRandom == true); 
  })

  it('should select correct flag', ()=>
  {
    component.prepareFlag('red');
    expect((component.preparedFlagStatus == 'red'));
  })

  it('Should deploy to modal', ()=>
  {
    component.deployToModal(11,'green');
    expect(component.theNote==11);
    expect(component.tempFlagStatus=='green');
  })

  it('should get notes by batch week', ()=>
  {
    expect(component.getNotesByBatchByWeek).toEqual(notes);
  })

  


});