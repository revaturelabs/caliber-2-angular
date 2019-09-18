/**
 * This interface is used to represent Note JSON object from Assessment Service (com.revature.caliber.beans.Note)
 */

export interface Note {
  noteId?: number;  // Optional because won't have id if transient entity, will have one if persistent entity
  noteContent: string;
  noteType: string;
  weekNumber: number;
  batchId: number;
  traineeId?: number; // Optional because note could be at the batch level
}
