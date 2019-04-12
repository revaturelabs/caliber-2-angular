import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssessBatchRoutingModule } from "./assess-batch-routing.module";
import { FormsModule } from "@angular/forms";
import { AssessBatchComponent } from "../Assess-Batch/Components/assess-batch/assess-batch.component";
import { AssociateComponent } from "../Assess-Batch/Components/associate/associate.component";

@NgModule({
  imports: [CommonModule, AssessBatchRoutingModule, FormsModule],
  declarations: [
      AssessBatchComponent,
      AssociateComponent
    ],
})
export class AssessBatchModule {}
