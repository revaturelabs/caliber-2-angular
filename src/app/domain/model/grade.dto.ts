/**
 * This interface represents the Grade JSON Object from Assessment Service (com.revature.caliber.beans.Grade)
 */

export interface Grade {
  gradeId?: number;
  dateReceived: number;
  score: number;
  assessmentId: number;
  traineeId: number;
}
