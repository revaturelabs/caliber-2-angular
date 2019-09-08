import {Note} from "./Batch/type/note";
import {Grade} from "./Batch/type/trainee";

export interface WeeklyAssociateNotes {
  notesByAssociateId: Map<number, Note[]>
}

export interface AssessBatchColumn {
  assessmentId: number;
  categoryId: number;
  category: string;
  rawScore: number;
  assessmentType: string;
}

export interface AssessBatchCell {

}

export interface AssessBatchRow {
  assessmentId: number;
  grades: Grade[];
}
