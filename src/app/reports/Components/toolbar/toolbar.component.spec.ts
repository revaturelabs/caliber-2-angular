import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ReportService } from '../../Service/report.service';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { AssessBatchService } from 'src/app/Assess-Batch/Services/assess-batch.service';
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Batch } from 'src/app/Batch/type/batch';
import { Trainee } from 'src/app/Batch/type/trainee';


describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  
  let reportService: ReportService;
  let traineeService: TraineeService;
  
  let getAllSpyYears;
  let getBatchesForYear2018Spy;
  let getWeeksSpy;
  let getTraineesSpy;

  let batches: Batch[];
  let weeks: number[];
  let trainees: Trainee[];
  let years: number[];
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ToolbarComponent ],
      providers: [ ReportService, AuditService, AssessBatchService, TraineeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    reportService = fixture.debugElement.injector.get(ReportService);
    traineeService = fixture.debugElement.injector.get(TraineeService);
    getAllSpyYears = spyOn(reportService, 'getAllYears').and.returnValue(of([2017, 2018, 2019]));
    // batches = [new Batch ( "1607 Jul11 Java", "Revature", "Full Stack Java/JEE", "Patrick Walsh", "Dan Pickles", 1, null, null, 80, 70, 8),
    //            new Batch ( "1611 Nov14 Java (AP)","Revature","PEGA BPM","Dan Pickles",null,2,null,null,70,65,2 ),
    //            new Batch ( "1702 Feb13 Java (AP)","Corporate","Full Stack Java/JEE","Shelby",null,3,null,null,85,70,6)]
    batches = [
      new Batch ("1607 Jul11 Java", "Revature", null, null, null, null, null, null, 80, 70, 6),
      new Batch ("1611 Nov14 Java (AP)", "Revature", null, null, null, null, null, null, 70, 65, 2)
    ];

    // trainees = [
    //   new Trainee (5456,null,"Forsberg, Justin","forsbergjj@gmail.com","Employed",2150,"(763) 614-9683",null,null,null,null,null,null,null,null,null,null,null,null,null)
    // ];
    trainees = [new Trainee(), 
                new Trainee()
    ];
    weeks = [0, 1, 2, 3, 4, 5, 6];
    component.selectedYear = "2018";
    getBatchesForYear2018Spy = spyOn(reportService, 'getBatch').and.returnValue(of(batches));
    getWeeksSpy = spyOn(reportService, 'setWeek').and.returnValue(of(weeks[0]));
    getTraineesSpy = spyOn(traineeService, 'getTraineesByBatchId').and.returnValue(of(trainees));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should load getAllYears from the server', () => {
    component.getAllYears();
    console.log("Getting all the years for the reports toolbar");
    expect(getAllSpyYears).toHaveBeenCalled();
    expect(component.years).toEqual([2017,2018,2019]);
  });

  // it('should load getBatch from the server when the year 2018 is chosen', () => {
  //   component.getBatch(2018);
  //   console.log("Getting the batches for year 2018 for the reports toolbar");
  //   expect(getBatchesForYear2018Spy).toHaveBeenCalled();
  //   console.log("These are the batches " + component.batches);
  //   expect(component.batches.length).toEqual(2);
  // });

  it('should call getWeeks method which sets the selected week using ReportService', () => {
    component.getWeeks();
    console.log("Setting the weeks for the reports toolbar");
    expect(getWeeksSpy).toHaveBeenCalled();
    expect(component.selectedWeek).toEqual(weeks[0]);
  });
  

  // it('should call getTraineesByBatchId which gets all the Trainees using TraineeService', () => {
  //   component.getTraineesByBatchId();
  //   console.log("Inside the getTraineeByBatchId method which uses TraineeService");
  //   expect(getTraineesSpy).toHaveBeenCalled();
  //   expect(component.listedTrainees.length).toEqual(1);
  // });
  
});

