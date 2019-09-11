import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssessBatchRoutingModule } from "./assess-batch-routing.module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AssessBatchComponent } from "../Assess-Batch/Components/assess-batch/assess-batch.component";
import { AssociateComponent } from "../Assess-Batch/Components/associate/associate.component";
import { FeedbackComponent } from "../Assess-Batch/Components/feedback/feedback.component";
import { ToolbarComponent } from "../Assess-Batch/Components/toolbar/toolbar.component";
import { BatchModalComponent} from '../Assess-Batch/Components/toolbar/batch-modal/batch-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockSaveComponent } from "../Assess-Batch/Components/mock-save/mock-save.component";
import { UpdateDeleteAssessmentModalComponent }from  '../Assess-Batch/Components/associate/update-delete-assessment-modal/update-delete-assessment-modal.component';
import { FilterBatchPipeService } from '../Assess-Batch/Services/filter-batch-pipe.service'
import {AssessBatchV2Module} from "../assess-batch-v2/assess-batch-v2.module";
@NgModule({
  imports: [CommonModule, AssessBatchRoutingModule, FormsModule, NgbModule.forRoot(), ReactiveFormsModule, AssessBatchV2Module],
  declarations: [
      AssessBatchComponent,
      AssociateComponent,
      FeedbackComponent,
      ToolbarComponent,
      BatchModalComponent,
      // MockSaveComponent,
      UpdateDeleteAssessmentModalComponent,
      FilterBatchPipeService
    ],
    entryComponents :[ BatchModalComponent, UpdateDeleteAssessmentModalComponent ],
  providers: [UpdateDeleteAssessmentModalComponent]


})
export class AssessBatchModule {}
