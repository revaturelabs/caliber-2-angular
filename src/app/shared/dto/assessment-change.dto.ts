import {Assessment} from "../../Assess-Batch/Models/Assesment";

export interface AssessmentChangeDto {
  assessment: Assessment;
  action: AssessmentAction;
}

export enum AssessmentAction {
  CREATE, UPDATE, DELETE
}
