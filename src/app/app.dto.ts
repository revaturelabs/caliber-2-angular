import {Note} from "./Batch/type/note";

export interface WeeklyAssociateNotes {
  notesByAssociateId: Map<number, Note[]>
}
