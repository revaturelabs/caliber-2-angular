import {Note} from "../model/assessment-note.dto";

export interface WeeklyAssociateNotes {
  notesByAssociateId: Map<number, Note[]>
}
