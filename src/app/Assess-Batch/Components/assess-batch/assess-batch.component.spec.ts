import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessBatchComponent } from './assess-batch.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AssociateComponent } from '../associate/associate.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MockSaveComponent } from '../mock-save/mock-save.component';
import { BatchModalComponent } from 'src/app/Batch/batch-modal/batch-modal.component';
import { UpdateDeleteAssessmentModalComponent } from '../associate/update-delete-assessment-modal/update-delete-assessment-modal.component';

describe('AssessBatchComponent', () => {
  let component: AssessBatchComponent;
  let fixture: ComponentFixture<AssessBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessBatchComponent, ToolbarComponent, AssociateComponent, FeedbackComponent, MockSaveComponent, BatchModalComponent, UpdateDeleteAssessmentModalComponent],
      imports: [
        FormsModule, HttpClientTestingModule],
        providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
