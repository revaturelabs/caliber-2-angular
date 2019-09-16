import {Note} from "./Batch/type/note";
import {Grade} from "./Batch/type/trainee";
import {Assessment} from "./Assess-Batch/Models/Assesment";

export interface WeeklyAssociateNotes {
  notesByAssociateId: Map<number, Note[]>
}

export interface AssessBatchColumn {
  category: string;
  assessment: Assessment;
}

