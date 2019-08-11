import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateComponent } from './associate.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QcNote } from '../../types/note';
import { Trainee } from 'src/app/Batch/type/trainee';
import { AuditService } from '../../Services/audit.service';
import { Tag } from '../../types/Tag';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Batch } from 'src/app/Batch/type/batch';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('AssociateComponent', () => {
  let component: AssociateComponent;
  let fixture: ComponentFixture<AssociateComponent>;
  let auditService :AuditService;
  let getNoteSpy;
  let notes: QcNote[];
  let trainee1: Trainee;
  let trainee2: Trainee;
  let trainee3: Trainee;

  let categoryTags: Map<string, Tag> = new Map<string,Tag>();
  let categoryList: Tag[];

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
    categoryTags.set("Java",new Tag(1,"Java", 1,2))
  categoryTags.set(".Net",new Tag(2,".Net", 5,3)) 
  categoryTags.set("JPA",new Tag(4,"JPA", 6,8))

    categoryList = [new Tag(1,"ScriptJava", 1,2),new Tag(1,"Java++", 3,4),new Tag(1,"Java#", 6,7)]

    component.categoryTags= categoryTags;
    auditService.categoriesByBatchByWeek = categoryList;
    auditService.notes = notes;
    auditService.selectedBatch = new Batch("Intensive Testing","JPA","Testing","Dave",null,5,null,null,78,90,10)
    component.selectedTrainee = trainee1;
    // getNoteSpy = spyOn(component.auditService, 'getAllYears').and.returnValue(of([2017, 2018, 2019]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Zechariahs1
  // Test that values are intialized in ngOnInit
  it('should intialize component values', ()=>{
    spyOn(component, "getAllActiveCategories")
    component.ngOnInit()
    expect(auditService.subsVar).toBeTruthy()
    expect(component.notes).toBeTruthy()
    expect(component.getAllActiveCategories).toHaveBeenCalled()
    
  })

  it('should get note', () => {
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
    component.onFlagSelected('red');
    expect((component.selectedTrainee.flagStatus == 'red'));
  })

  it('should get notes by batch week', ()=>
  {
    component.getNotesByBatchByWeek();
    expect(component.notes).toEqual(notes);
  })

  /* Zechariahs1
  * test that active categories shoule be returned
  */
  it('should get all active Categories', ()=>
  {
    spyOn(auditService, "getAllActiveCategories").and.returnValue( 
      of([ new Tag(1,"Java", 1,2), new Tag(2,".Net", 5,3),new Tag(4,"JPA", 6,8)]));
    component.getAllActiveCategories();
    expect(component.activeCategoryTags.get("Java")).toEqual(new Tag(1,"Java", -1,-1));
  })
  
   /* Zechariahs1
  * test that category is added 
  */
 it('should add a category to category collection', ()=>
 {
   component.addCategoryTag(new Tag(6,"RESTful API",2,2))
   expect(component.categoryTags.get("RESTful API")).toBeTruthy();
 })

/*  Zechariahs1
* Hover texts displays over commets
*/

it('should show Text', ()=>
 {
  component.showText(46)
  expect(component.hoverComment).toEqual(notes[1].trainee.flagNotes);
 })

 /*  Zechariahs1
* Flags is submited
*/

it('should submit flag', ()=>
{
 component.onFlagSubmit()
 expect(component.isaddFlagClicked).toEqual(false);
})

/*  Zechariahs1
* Flags is deleted
*/

it('should delete flag', ()=>
{
 component.onFlagDelete()
 expect(component.isaddFlagClicked).toBeFalsy();
 expect(component.selectedTrainee.flagNotes).toBeFalsy();
 expect(component.selectedTrainee.flagStatus).toEqual("NONE");
})

/*  Zechariahs1
* Flag save is canceled
*/

it('should cancel flag save', ()=>
{
 component.onFlagCancel()
 expect(component.isaddFlagClicked).toBeFalsy();
 expect(component.selectedTrainee.flagNotes).toEqual( component.selectedTraineeFlagStatusBeforeSelecting);
 expect(component.selectedTrainee.flagStatus).toEqual(component.selectedTraineeFlagNotesBeforeSelecting);
})

/*  Zechariahs1
* Added new Trainee addeds another flag
*/

it('should create another flag for new trainee', ()=>
{

  trainee2.flagNotes = "Note"
  trainee2.flagStatus = "Ready"
 component.onAddFlagClicked(trainee2, 2)
 expect(component.isaddFlagClicked).toBeFalsy();
 expect(component.selectedTrainee.flagNotes).toEqual(trainee2.flagNotes);
 expect(component.selectedTrainee.flagStatus).toEqual(trainee2.flagStatus);
 expect(component.selectedTraineeIndex).toEqual(2)
 expect(component.flagStatusVisual).toEqual("fa-" + trainee2.flagStatus.toLowerCase())
})

/*  Zechariahs1
* Sorts notes alphabetically
*/

it('should sort notes Alphabetically', ()=>
{
  component.sortAlphabetically(notes)
  expect(notes[0].noteId).toEqual(47);
  expect(notes[1].noteId).toEqual(46);
  expect(notes[2].noteId).toEqual(45);
})

/*  Zechariahs1
* test checking if the save spinner is showing
*/

it('should show spinner', ()=>
{
  component.showSpinner(2);
  expect(component.spinner.style.display).toEqual("block")
  expect(component.checkMark.style.display).toEqual("none")
  expect(component.errMark.style.display).toEqual("none")
})

/*  Zechariahs1
* test checking the spinner is being cleared
* Test #15
*/

it('should clear spinner', ()=>
{
  component.clearAllSavingIcon(2);
  expect(component.spinner.style.display).toEqual("none")
  expect(component.checkMark.style.display).toEqual("none")
  expect(component.errMark.style.display).toEqual("none")
})


/*  Zechariahs1
* test getCategoriesByBatchByWeek 
* Test #16
*/

it('should get Categories by batch week', ()=>
{
 component.getCategoriesByBatchByWeek()
 expect(component.categoryTags.get("Java++")).toBeTruthy()
})


/*  Zechariahs1
* test setScore 
* Test #17
*/

it('should set score of the trainee', ()=>
{
  component.setScore("Fail", 45)
  expect(component.notes[0].qcStatus).toEqual("Fail")

})


});