import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { NoteService } from '../../Services/note.service';
import { Note } from 'src/app/Batch/type/note';
import { FormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let noteService: NoteService;
  let subscribeNoteServiceSpy;
  let noteArrayResult: Note[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [FeedbackComponent],
      providers: [NoteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;

    component.selectedWeek = 9;
    component.batchId = 2525;
    noteService = TestBed.get(NoteService);

    // used to supply fake result for noteService.noteEmitter.subscribe
    // inside of getFeedbackNote() method
    noteArrayResult = [{
      noteId: 6,
      noteContent: "",
      noteType: "trainee",
      weekNumber: 9,
      batchId: 2525,
      traineeId: 34
    }, {
      noteId: 15,
      noteContent: "",
      noteType: "BATCH",
      weekNumber: 5,
      batchId: 627,
      traineeId: 90
    }];

    subscribeNoteServiceSpy = spyOn(noteService.noteEmitter, 'subscribe').and.returnValue(noteArrayResult);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // getFeedbackNote
  it('should get feedback note', () => {
    component.getFeedbackNote();
    expect(subscribeNoteServiceSpy).toHaveBeenCalled();
    //expect(subscribeNoteServiceSpy.returnValue).toBe(noteArrayResult);
  });

});
