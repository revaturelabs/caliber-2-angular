import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchViewComponent } from './batch-view.component';
import { BatchService } from '../batch.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BatchModalComponent } from 'src/app/Assess-Batch/Components/toolbar/batch-modal/batch-modal.component';
import { BatchModule } from '../batch/batch.module';
import { ViewTraineesComponent } from 'src/app/User/user/Components/view-trainees/view-trainees.component';
import { TraineeTogglePipe } from 'src/app/User/user/Pipes/trainee-toggle.pipe';
import { DeleteTraineeComponent } from 'src/app/User/user/Components/delete-trainee/delete-trainee.component';
import { AddTraineeComponent } from 'src/app/User/user/Components/add-trainee/add-trainee.component';
import { SwitchBatchComponent } from 'src/app/User/user/Components/switch-batch/switch-batch.component';
import { UpdateTraineeComponent } from 'src/app/User/user/Components/update-trainee/update-trainee.component';
import { ToolbarComponent } from 'src/app/Assess-Batch/Components/toolbar/toolbar.component';


describe('BatchViewComponent', () => {
  let component: BatchViewComponent;
  let fixture: ComponentFixture<BatchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchViewComponent, BatchModalComponent, ViewTraineesComponent, TraineeTogglePipe, DeleteTraineeComponent, AddTraineeComponent, SwitchBatchComponent, UpdateTraineeComponent],
      imports: [
        FormsModule, HttpClientTestingModule],
        providers:[BatchService, ErrorService, ToolbarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
