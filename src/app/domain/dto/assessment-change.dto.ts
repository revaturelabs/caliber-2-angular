import {Assessment} from "../model/assessment.dto";


export interface AssessmentChangeDto {
  assessment: Assessment;
  action: AssessmentAction;
}

export enum AssessmentAction {
  CREATE, UPDATE, DELETE
}
