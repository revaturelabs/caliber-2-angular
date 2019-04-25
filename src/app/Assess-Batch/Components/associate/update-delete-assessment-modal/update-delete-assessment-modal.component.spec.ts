import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal.component';

describe('UpdateDeleteAssessmentModalComponent', () => {
  let component: UpdateDeleteAssessmentModalComponent;
  let fixture: ComponentFixture<UpdateDeleteAssessmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeleteAssessmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteAssessmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
