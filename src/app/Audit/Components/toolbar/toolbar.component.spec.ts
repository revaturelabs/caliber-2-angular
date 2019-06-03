import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Batch } from 'src/app/Batch/type/batch';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { of } from 'rxjs';
import { QcNote } from '../../types/note';
import { Trainee } from 'src/app/Batch/type/trainee';
import { ExpectedConditions } from 'protractor';

class MockAuditService {
  selectedBatch: Batch = new Batch('TrainingName', 'TrainingType', 'SkillType', 'Trainer', 'coTrainer', 1, new Date(), new Date(), 80, 70, 3);
  getAllYears() {
    return of([2017, 2018, 2019]);
  }
  getBatchesByYearByQuarter() {
    return of(1);
  }
  setNotes(notes) { }
}

fdescribe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let auditService: AuditService;
  let getAllYearsSpy;
  let updateBatchSpy;
  let getNotesByBatchByWeekSpy;
  let getBatchesByYearByQuarterSpy;
  let trainee1: Trainee;
  let trainee2: Trainee;
  let trainee3: Trainee;
  let notes: QcNote[];
  let batches: Batch[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [HttpClientTestingModule],
      providers: [AuditService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    // set up audit service for component to use.
    auditService = fixture.debugElement.injector.get(AuditService);
    auditService.selectedBatch = new Batch('TrainingName', 'TrainingType', 'SkillType', 'Trainer', 'coTrainer', 1, new Date(), new Date(), 80, 70, 3);
    component.selectedBatch = new Batch('TrainingName', 'TrainingType', 'SkillType', 'Trainer', 'coTrainer', 1, new Date(), new Date(), 80, 70, 3);
    component.selectedYear = 2019;
    component.selectedQuarter = 2;
    component.weeks = [1, 2, 3];
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

    batches = [
      new Batch("test1", null, null, null, null, null, null, null, null, null, 3),
      new Batch("test2", null, null, null, null, null, null, null, null, null, 2)
    ]


    getAllYearsSpy = spyOn(component.auditService, 'getAllYears').and.returnValue(of([2017, 2018, 2019]));
    updateBatchSpy = spyOn(component.auditService, 'updateBatch').and.returnValue(of({}));
    getNotesByBatchByWeekSpy = spyOn(component.auditService, 'getNotesByBatchByWeek').and.returnValue(of(notes));
    getBatchesByYearByQuarterSpy = spyOn(component.auditService, 'getBatchesByYearByQuarter').and.returnValue(of(batches));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the number of weeks from the batch', () => {
    component.getWeeks();
    expect(component.weeks.length).toEqual(component.auditService.selectedBatch.weeks);
  })

  it('should show the active week', () => {
    component.selectedWeek = 2;
    expect(component.showActiveWeek(1)).not.toEqual('active');
    expect(component.showActiveWeek(2)).toEqual('active');
    expect(component.showActiveWeek(3)).not.toEqual('active');
  });

  it('should get all years', () => {
    component.getAllYears();
    expect(getAllYearsSpy).toHaveBeenCalled();
    expect(component.years).toEqual([2017, 2018, 2019]);
  });

  it('adds a week', () => {
    let oldWeeks = component.selectedBatch.weeks;
    component.addWeek();
    expect(Number(component.selectedBatch.weeks) == (oldWeeks + 1)).toBe(true);
    expect(updateBatchSpy).toHaveBeenCalledWith(component.selectedBatch);
    expect(component.weeks.length).toEqual(oldWeeks + 1);
  })

  it('selects a week', () => {
    component.selectWeek(2);
    expect(getNotesByBatchByWeekSpy).toHaveBeenCalledWith(component.selectedBatch.batchId, 2);
    expect(component.auditService.notes).toEqual(notes);
  });

  it('selects a batch', () => {
    let testBatch: Batch = new Batch(null, null, null, null, null, null, null, null, null, null, 5);
    component.selectBatch(testBatch);
    expect(component.selectedBatch).toEqual(testBatch);
    expect(component.auditService.selectedBatch).toEqual(testBatch);
    expect(component.weeks.length).toEqual(5);
  });

  it('selects a quarter', () => {
    component.selectQuarter(3);
    expect(component.selectedQuarter).toEqual(3);
  });

  it('selects a year', () => {
    component.selectYear(2018);
    expect(component.selectedYear).toEqual(2018);
    expect(component.auditService.selectedYear).toEqual(2018);
  });

  it('gets batches', () => {
    component.getBatches();
    expect(getBatchesByYearByQuarterSpy).toHaveBeenCalledWith(component.selectedYear, component.selectedQuarter);
    expect(component.batches).toEqual(batches);
  })
});
