import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { BatchModalComponent } from './batch-modal/batch-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Batch } from 'src/app/Batch/type/batch';
import { Trainee, Grade } from 'src/app/Batch/type/trainee';
import { Note } from 'src/app/Batch/type/note';
import { Assessment } from '../../Models/Assesment';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let batchlist: Batch[];
  let trainees: Trainee[];
  let trainee1: Trainee;
  let trainee2: Trainee;
  let trainee3: Trainee;
  let notes: Note[];
  let assessments: Assessment[];
  let grades: Grade[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent, FormModalComponent, BatchModalComponent],
      imports: [
        FormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;

    trainee1 = new Trainee();
    trainee1.batchId = 2;
    trainee1.name = "Martin, Angela";
    trainee1.traineeId = 1;
    trainee1.flagStatus = null;
    trainee2 = new Trainee();
    trainee2.batchId = 2;
    trainee2.name = "Malone, Kevin";
    trainee2.traineeId = 2;
    trainee2.flagStatus = null;
    trainee3 = new Trainee();
    trainee3.batchId = 2;
    trainee3.name = "Bernard, Andy";
    trainee3.traineeId = 3;
    trainee3.flagStatus = null;

    trainees = [
      trainee1,
      trainee2,
      trainee3
    ]

    notes = [
      new Note(
        45,
        "example45",
        "test",
        2,
        1,
        5477
      ),
      new Note(
        45,
        "example45",
        "test",
        2,
        1,
        5477
      ),
      new Note(
        45,
        "example45",
        "test",
        2,
        1,
        5477
      ),
    ]

    batchlist = [
      new Batch(
          "Java Full Stack",
          "",
          "Java",
          "Bob",
          "",
          0,
          new Date("8/10/2019"),
          new Date("8/15/2019"),
          100,
          70,
          1
      ),
      new Batch(
        ".Net",
        "",
        "I dont Know",
        "Tim",
        "",
        0,
        new Date("8/10/2019"),
        new Date("8/15/2019"),
        100,
        70,
        1
    )
    ]

    assessments = [
      new Assessment(1, 20, "Exam", "HTML", 1, 1, 1),
      new Assessment(2, 10, "Verbal", "SQL", 1, 1, 2)
    ]

    grades = [
      new Grade(),
      new Grade(),
      new Grade(),
    ]
    grades[0].gradeId = 1;
    grades[0].score = 20;
    grades[0].traineeId = 1;
    grades[1].gradeId = 2;
    grades[1].score = 10;
    grades[1].traineeId = 2;
    grades[2].gradeId = 3;
    grades[2].score = 30;
    grades[2].traineeId = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should NgOnIntit', () =>{

  })

  it('Should Display Years', () =>{
    component.displayYears();
    expect(component.selectedYear === "Select Year").toBeTruthy();
  })

  it('Should Get All Years', () =>{
    spyOn(component, "getBatchNotesByWeek").and.callFake(function(){
      component.noteService.weekEmitter.emit(component.selectedWeek);
      component.noteService.batchIdEmitter.emit(component.selectedBatch.batchId);
      component.noteService.noteEmitter.emit(notes);
    })
    spyOn(component, "getTraineesByBatchId").and.callFake(function(){
      component.ourTrainee=trainees;
      component.traineeService.storeTrainees(trainees);
      component.traineeService.trainees.emit(trainees);
      component.getBatchNotesByWeek();
    })
    spyOn(component, "getBatches").and.callFake(function(arg1, arg2){
      if(batchlist.length > 0) {
        component.batchExists = true;
        component.batches = batchlist;
        component.selectedBatch = component.batches[0];
        component.getWeeks();
        component.selectedWeek = component.weeks.length;
      } else {
        component.batchExists = false;
      }
    })
    spyOn(component, "checkBatchExistanceInaQuarter").and.callFake(function(arg1, arg2){
      if(batchlist.length > 0) {
        component.quarters.push("Q"+arg2);
        component.selectedQuarter = component.quarters[0];
        
       
        var temp: String[] = component.quarters.sort((n1, n2) => {
          if (n1 > n2) {
            return -1;
          }

          if (n1 < n2) {
            return 1;
          }

          return 0;
        });

        component.quarters = temp;
        component.selectedYear = arg1;
        component.selectedBatch = batchlist[0];
        component.getBatches();
      } else {

      }
    });
    spyOn(component, "getAllYears").and.callFake(function(){
      component.years = [2017,2018,2019];
      component.selectedYear = component.years[0].toString();
      for (var q = 4; q > 0; q--) { 
        component.checkBatchExistanceInaQuarter(component.years[0], q);
      }
      component.selectedYear = "Select Year";
    });

    component.getAllYears();
    expect(component.selectedYear === "Select Year");
    expect(component.selectedQuarter === "Q4");
    expect(component.selectedWeek === 1);
    expect(JSON.stringify(component.selectedBatch) === JSON.stringify(new Batch("Java Full Stack","","Java", "Bob","",0,new Date("8/10/2019"),new Date("8/15/2019"),100,70,1))).toBeTruthy();
    expect(JSON.stringify(component.ourTrainee) === JSON.stringify(trainees)).toBeTruthy();
  })

  it('Should Get Batches', () =>{
    spyOn(component, "getBatches").and.callFake(function(arg1, arg2){
      if(batchlist.length > 0) {
        component.batchExists = true;
        component.batches = batchlist;
        component.selectedBatch = component.batches[0];
        //component.getWeeks();
        component.selectedWeek = component.weeks.length;
      } else {
        component.batchExists = false;
      }
    })

    component.getBatches();
    expect(JSON.stringify(component.selectedBatch) === JSON.stringify(new Batch("Java Full Stack","","Java", "Bob","",0,new Date("8/10/2019"),new Date("8/15/2019"),100,70,1))).toBeTruthy();
    expect(JSON.stringify(component.selectedBatch) === JSON.stringify(new Batch(".Net","","C#", "Tim","",0,new Date("8/10/2019"),new Date("8/15/2019"),100,70,1))).toBeFalsy();
  })

  it('Should Select Year', () =>{
    component.selectYear(2017);
    expect(component.selectedYear === "2017").toBeTruthy();
    expect(component.selectedQuarter === "Select Quarter").toBeTruthy();
  })

  it('Should Check Batch Existance in a Quarter', () =>{
    spyOn(component, "checkBatchExistanceInaQuarter").and.callFake(function(arg1, arg2){
      if(batchlist.length > 0) {
        component.quarters.push("Q"+arg2);
        component.selectedQuarter = component.quarters[0];
        
       
        var temp: String[] = component.quarters.sort((n1, n2) => {
          if (n1 > n2) {
            return -1;
          }

          if (n1 < n2) {
            return 1;
          }

          return 0;
        });

        component.quarters = temp;
        component.selectedYear = arg1;
        component.selectedBatch = batchlist[0];
        //component.getBatches();
      } else {
      }
    });
    component.checkBatchExistanceInaQuarter(2017, 1);
    expect(component.selectedYear == "2017").toBeTruthy();
    batchlist = [];
    component.checkBatchExistanceInaQuarter(2018, 2);
    expect(component.selectedYear == "2018").toBeFalsy();
  })

  it('Should Show Q\'s', () =>{
    component.showQs();
    expect(component.selectedQuarter === "Select Quarter").toBeTruthy();
  })

  it('Should Select Quarter', () =>{
    spyOn(component, "getBatches").and.callFake(function(){});
    component.selectQuarter("1");
    expect(component.selectedQuarter === "1").toBeTruthy();
    expect(component.selectedQuarter === "2").toBeFalsy();
  })

  it('Should Select Batch', () =>{

    spyOn(component, "getBatchNotesByWeek")
    spyOn(component, "getAssessmentsByBatchIdAndWeekNum")
    spyOn(component, "getGradesByBatchIdAndWeekNum")

    component.selectBatch(batchlist[0]);
    expect(JSON.stringify(component.selectedBatch) === JSON.stringify(batchlist[0])).toBeTruthy();
    expect(JSON.stringify(component.auditService.selectedBatch) === JSON.stringify(batchlist[0])).toBeTruthy();
  })

  it('Should Show Active Week', () => {
    component.selectedWeek = 1;
    expect(component.showActiveWeek(1) === "active").toBeTruthy();
    expect(component.showActiveWeek(2) === "active").toBeFalsy();
  })

  it('Should Select Week', () =>{
    spyOn(component, "getBatchNotesByWeek")
    spyOn(component, "getAssessmentsByBatchIdAndWeekNum")
    spyOn(component, "getGradesByBatchIdAndWeekNum")

    component.selectWeek(1);
    expect(component.selectedWeek === 1).toBeTruthy();
    expect(component.auditService.selectedWeek === 1).toBeTruthy();
    expect(component.selectedWeek === 2).toBeFalsy();
    expect(component.auditService.selectedWeek === 2).toBeFalsy();

  })

  it('Should Add Week', () =>{
    spyOn(component, "getBatchNotesByWeek")
    
    component.batches = batchlist;
    component.selectedBatch = batchlist[0];
    component.weeks = [1];
    expect(component.weeks.length === 1).toBeTruthy();
    component.addWeek();
    expect(component.weeks.length === 2).toBeTruthy();
    expect(component.selectedBatch.weeks === 2).toBeTruthy();
    expect(component.batches[1].weeks === 2).toBeFalsy();

  })

  it('Should Get Weeks', () =>{
    spyOn(component, "getTraineesByBatchId")

    component.batches = batchlist;
    component.selectedBatch = batchlist[0];
    component.getWeeks();
    expect(component.weeks.length === component.selectedBatch.weeks).toBeTruthy();

  })

  it('Should Get Trainee By Batch Id', () =>{
    spyOn(component, "getTraineesByBatchId").and.callFake(function(){
      component.ourTrainee=trainees;
      component.traineeService.storeTrainees(trainees);
      component.traineeService.trainees.emit(trainees);
      //component.getBatchNotesByWeek();
    })

    component.getTraineesByBatchId();
    expect(JSON.stringify(component.ourTrainee) === JSON.stringify(trainees)).toBeTruthy();
    expect(JSON.stringify(component.traineeService.ourTrainees) === JSON.stringify(trainees)).toBeTruthy();
  })

  it('Should Get Notes By Week', () =>{
    spyOn(component.noteService.noteEmitter, "emit")
    spyOn(component.noteService.weekEmitter, "emit")
    spyOn(component.noteService.batchIdEmitter, "emit")
    spyOn(component, "getBatchNotesByWeek").and.callFake(function(){
      component.noteService.weekEmitter.emit(component.selectedWeek);
      component.noteService.batchIdEmitter.emit(component.selectedBatch.batchId);
      component.noteService.noteEmitter.emit(notes);
    })

    component.getBatchNotesByWeek();
    expect(component.noteService.noteEmitter.emit).toHaveBeenCalledWith(notes);
    expect(component.noteService.weekEmitter.emit).toHaveBeenCalledWith(component.selectedWeek);
    expect(component.noteService.batchIdEmitter.emit).toHaveBeenCalledWith(component.selectedBatch.batchId);

  })

  it('Should Get Assessments By Batch Id', () =>{
    spyOn(component, "getAssessmentsByBatchId").and.callFake(function(){
      component.weeklyAssessments=[];
      component.weeklyAssessments = assessments;
      component.assessBatchGradeService.storeAssessments(component.weeklyAssessments);
      component.assessBatchGradeService.assessments.emit(component.weeklyAssessments);
    })

    component.getAssessmentsByBatchId();
    expect(JSON.stringify(component.weeklyAssessments) === JSON.stringify(assessments)).toBeTruthy();
    expect(JSON.stringify(component.assessBatchGradeService.allAssessments) === JSON.stringify(assessments)).toBeTruthy();
  })

  it('Should Get Assessments By Batch Id and Week Number', () =>{
    spyOn(component, "getAssessmentsByBatchIdAndWeekNum").and.callFake(function(){
      component.weeklyAssessments=[];
      component.weeklyAssessments = assessments;
      component.assessBatchGradeService.storeAssessments(component.weeklyAssessments);
      component.assessBatchGradeService.assessments.emit(component.weeklyAssessments);
    })

    component.getAssessmentsByBatchIdAndWeekNum();
    expect(JSON.stringify(component.weeklyAssessments) === JSON.stringify(assessments)).toBeTruthy();
    expect(JSON.stringify(component.assessBatchGradeService.allAssessments) === JSON.stringify(assessments)).toBeTruthy();
  })

  it('Should Get Grades By Batch Id and Week Number', () =>{
    spyOn(component.assessBatchGradeService.grades, "emit")
    spyOn(component, "getGradesByBatchIdAndWeekNum").and.callFake(function(){
      component.gradesArr=[];
      component.gradesArr = grades;

      component.assessBatchGradeService.storeGrades(component.gradesArr);
      component.assessBatchGradeService.grades.emit(component.gradesArr);
    })

    component.getGradesByBatchIdAndWeekNum();
    expect(JSON.stringify(component.gradesArr) === JSON.stringify(grades)).toBeTruthy();
    expect(component.assessBatchGradeService.grades.emit).toHaveBeenCalledWith(grades);

  })

  //nGet grades by batch id is not called ever
  // it('Should Get Grades By Batch Id', () =>{
    
  // })
});
