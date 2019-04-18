import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssessBatchRoutingModule } from "./assess-batch-routing.module";
import { FormsModule } from "@angular/forms";
import { AssessBatchComponent } from "../Assess-Batch/Components/assess-batch/assess-batch.component";
import { AssociateComponent } from "../Assess-Batch/Components/associate/associate.component";
import { FeedbackComponent } from "../Assess-Batch/Components/feedback/feedback.component";
import { ToolbarComponent } from "../Assess-Batch/Components/toolbar/toolbar.component";
import { BatchModalComponent } from "../Assess-Batch/batch-modal/batch-modal.component";
import { MockSaveComponent } from "../Assess-Batch/Components/mock-save/mock-save.component";

@NgModule({
  imports: [CommonModule, AssessBatchRoutingModule, FormsModule],
  declarations: [
      AssessBatchComponent,
      AssociateComponent,
      FeedbackComponent,
      ToolbarComponent,
      BatchModalComponent,
      MockSaveComponent
    ],
})
export class AssessBatchModule {}
