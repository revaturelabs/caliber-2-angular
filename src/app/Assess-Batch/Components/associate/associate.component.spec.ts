import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateComponent } from './associate.component';
import { AssessBatchService } from '../../Services/assess-batch.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Note } from 'src/app/Batch/type/note';
import { Trainee } from 'src/app/Batch/type/trainee';
import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal/update-delete-assessment-modal.component';
import { Assessment } from '../../Models/Assesment';
import { AssessmentService } from '../../Services/assessment.service';
import { Grade } from 'src/app/User/user/types/trainee';
import { AssessBatchGradeService } from '../../Services/assess-batch-grades.service';
import { NoteService } from '../../Services/note.service';

describe('AssociateComponent', () => {
  let component: AssociateComponent;
  let fixture: ComponentFixture<AssociateComponent>;
  let assessmentService: AssessmentService;
  let assessBatchGrade: AssessBatchGradeService;
  
  let assessments: Assessment[];
  let notes: Note[];
  let grades:Grade[];
  let trainee1: Trainee;
  let trainee2: Trainee;
  let trainee3: Trainee;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateComponent, UpdateDeleteAssessmentModalComponent],
      imports: [
        FormsModule, HttpClientTestingModule],
      //providers: [AssessBatchService, UpdateDeleteAssessmentModalComponent]
      providers:[AssessmentService, AssessBatchService, AssessBatchGradeService, NoteService, UpdateDeleteAssessmentModalComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateComponent);
    component = fixture.componentInstance;
    assessmentService = fixture.debugElement.injector.get(AssessmentService);
    assessBatchGrade = fixture.debugElement.injector.get(AssessBatchGradeService);

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

    assessments = [
      new Assessment(1, 20, "Exam", "HTML", 1, 1, 1),
      new Assessment(2, 10, "Verbal", "SQL", 1, 1, 2)
    ]
    component.noteArr = notes;
    component.assessmentArr = assessments;
    component.traineeArr[0] = trainee1;
    component.traineeArr[1] = trainee2;
    component.traineeArr[2] = trainee3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should populate Assess', () =>{
    spyOn(component, "populateAssess").and.callFake(function(){
      let tmpAssessments = [
        new Assessment(1, 50, "Project", "HTML", 1, 1, 3),
        new Assessment(2, 20, "QC", "SQL", 1, 1, 4)
      ]

      component.assessmentArr = tmpAssessments;

      let tmpGrades = [
        new Grade(),
        new Grade(),
        new Grade(),
      ]
      tmpGrades[0].gradeId = 1;
      tmpGrades[0].score = 50;
      tmpGrades[0].traineeId = 1;
      tmpGrades[1].gradeId = 2;
      tmpGrades[1].score = 20;
      tmpGrades[1].traineeId = 1;

      component.gradesArr = tmpGrades;

      component.sumRawScores();
    })

    component.populateAssess();
    expect(component.gradesArr[0].score === 50).toBeTruthy();
    expect(JSON.stringify(component.assessmentArr[0]) === JSON.stringify(new Assessment(1,50,"Project", "HTML",1,1,3))).toBeTruthy();
  })

  it('Should initialize component', () =>{
    spyOn(component, "myInit").and.callFake(function(){
      component.superArr = [];

      let tempArr = [];
      component.avgArr = [];
      for (let i = 0; i < component.assessmentArr.length; i++) {
        var temp: Grade[] = [];
        //Mocking Average grade return from database
        if(i === 0){
          let grade1 = new Grade();
          grade1 = {
            gradeId: 1,
            dateReceived: 8062019,
            score: 70,
            assessmentId: 1,
            traineeId: 1
          }
          tempArr[i] = grade1;
        }
        else{
          let grade2 = new Grade();
          grade2 = {
            gradeId: i,
            dateReceived: 8062019,
            score: 50,
            assessmentId: i,
            traineeId: i
          }
          tempArr[i] = grade2;
        }

        component.avgArr = tempArr;

        for (let j = 0; j < component.gradesArr.length; j++) {
          if (
            component.assessmentArr[i].assessmentId == component.gradesArr[j].assessmentId
          ) {
            temp.push(component.gradesArr[j]);
          }
        }
        component.superArr.push(temp);
      }

      component.result =100;
    })

    component.myInit();
    let grade1 = new Grade();
    grade1 = {
      gradeId: 1,
      dateReceived: 8062019,
      score: 70,
      assessmentId: 1,
      traineeId: 1
    }
    
    expect(JSON.stringify(component.avgArr[0]) === JSON.stringify(grade1)).toBeTruthy();
    expect(component.result === 100).toBeTruthy();
  })

  it('Should persist selected assessment over modal', () =>{

    spyOn(assessmentService, "getCurrentAssessment").and.callFake(function(arg){});
    spyOn(assessmentService.currentAssessment, "emit").and.callFake(function(arg){});
    spyOn(assessmentService, "getCurrentAssessmentId").and.callFake(function(arg){});
    spyOn(assessmentService.currentAssessmentId, "emit").and.callFake(function(arg){});
    spyOn(assessmentService, "getCurrentCategoryId").and.callFake(function(arg){});
    spyOn(assessmentService.currentCategoryId, "emit").and.callFake(function(arg){});
    component.selectedId(component.assessmentArr[0]);
    expect(assessmentService.currentAssessment.emit).toHaveBeenCalled();
    expect(component.selectedAssessmentId === 1).toBeTruthy();
    expect(component.selectedAssessmentCategoryId === 1).toBeTruthy();
    expect(assessmentService.currentAssessmentId.emit).toHaveBeenCalled();
    expect(assessmentService.currentCategoryId.emit).toHaveBeenCalled();
  })


  it('Should sum values', () =>{
    component.sumRawScores();
    expect(component.totalRaw === 30).toBeTruthy();
  })

  it('Should cycle flags', () =>{
      component.cycleFlag(1);
      expect(component.traineeArr[0].flagStatus === "RED").toBeTruthy();
      component.cycleFlag(1);
      expect(component.traineeArr[0].flagStatus === "GREEN").toBeTruthy();
      component.cycleFlag(1);
      expect(component.traineeArr[0].flagStatus === null).toBeTruthy();
  })

  it('Should comment on trainee', () =>{
    spyOn(component, "commentOnTrainee").and.callFake(function(arg1, arg2)
    {
      arg1.flagNotes = arg2;
      component.deleteFromSwitch(arg1.traineeId);
    })

    component.commentOnTrainee(component.traineeArr[0], "Test");
    expect(component.traineeArr[0].flagNotes === "Test").toBeTruthy();
    expect(component.flagNoteSwitch[component.traineeArr[0].traineeId] === undefined).toBeTruthy();
  })
  
  it('Should validate score', () =>{
    var tmpgrade: Grade;
    spyOn(component, "validateScore").and.callFake(function(arg)
    {
      if(arg.value < 0){
        arg.placeholder = arg.target.value;
        arg.value = "";
       } else {
        arg.style = "";
        arg.placeholder = "";
        //Mock database return here;
        tmpgrade = new Grade();
        tmpgrade.score = arg.value;
       }
    })

    let e = document.createElement('input');
    e.value = "20";
    component.validateScore(e);
    expect(tmpgrade.score == 20).toBeTruthy();
  })

  it('Should check for Grade', () =>{
    expect(component.checkForGrade(grades, component.traineeArr[0])).toBeTruthy();
    expect(component.checkForGrade(grades, component.traineeArr[2])).toBeFalsy();
  })

  it('Should get category name', () =>{
    spyOn(component, "getCategoryName").and.callFake(function()
    {
      let temp = [];
      for(let i = 0; i < component.assessmentArr.length; i++) {
        if(component.assessmentArr[i].assessmentCategory === 1){
          temp[i] = "HTML";
        }
        else{
          temp[i] = "SQL";
        }
      }
      return temp;
    })

    expect(component.getCategoryName()[0] === "HTML").toBeTruthy();
    expect(component.getCategoryName()[1] === "SQL").toBeTruthy();
  })
  
});

