import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverallQCScoresComponent } from './overall-qc-scores.component';
import { ReportService } from '../../Service/report.service';

let QCnotes = [{"noteId":45,"content":"example45","week":1,"batchId":2,"trainee":null,
          "traineeId":5477,"type":"QC_TRAINEE","qcStatus":"Undefined","updateTime":1562622768551,
          "lastSavedBy":null},
          {"noteId":46,"content":"example46","week":1,"batchId":2,"trainee":null,
          "traineeId":5478,"type":"QC_TRAINEE","qcStatus":"Average","updateTime":1562622768551,
          "lastSavedBy":null},
          {"noteId":47,"content":"example47","week":1,"batchId":2,"trainee":null,
          "traineeId":5479,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1562622768552,
          "lastSavedBy":null},
          {"noteId":102,"content":"batchNote102","week":1,"batchId":2,"trainee":null,
          "traineeId":0,"type":"QC_BATCH","qcStatus":"Undefined","updateTime":1562622768582,
          "lastSavedBy":null},
          {"noteId":159,"content":"example159","week":2,"batchId":2,"trainee":null,
          "traineeId":5477,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1562622768601,
          "lastSavedBy":null},
          {"noteId":160,"content":"example160","week":2,"batchId":2,"trainee":null,
          "traineeId":5478,"type":"QC_TRAINEE","qcStatus":"Average","updateTime":1562622768602,
          "lastSavedBy":null},
          {"noteId":161,"content":"example161","week":2,"batchId":2,"trainee":null,
          "traineeId":5479,"type":"QC_TRAINEE","qcStatus":"Poor","updateTime":1562622768602,
          "lastSavedBy":null},
          {"noteId":216,"content":"batchNote216","week":2,"batchId":2,"trainee":null,
          "traineeId":0,"type":"QC_BATCH","qcStatus":"Undefined","updateTime":1562622768617,
          "lastSavedBy":null}];

// describe('OverallQCScoresComponent', () => {
//   let component: OverallQCScoresComponent;
//   let fixture: ComponentFixture<OverallQCScoresComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ OverallQCScoresComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OverallQCScoresComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// describe('OverallQCScoresComponent', () => {
//   it('Should see the Batch QC scores', function() {
//   });
// });
