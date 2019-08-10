import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteAssessmentModalComponent } from './update-delete-assessment-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateDeleteAssessmentModalComponent', () => {
  let component: UpdateDeleteAssessmentModalComponent;
  let fixture: ComponentFixture<UpdateDeleteAssessmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeleteAssessmentModalComponent ],
      imports: [
        FormsModule, HttpClientTestingModule],
        providers:[]
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
