import { Trainer } from "src/app/Batch/type/trainer";
import { Trainee } from "src/app/Batch/type/trainee";

/**
 * This class is used to represent the Note JSON object returned from the Quality Audit Service (com.revature.caliber.beans.Note)
 */

export class QcNote {
  noteId?: number;
  content: string;
  week: number;
  batchId: number;
  trainee?: Trainee;
  traineeId?: number;
  type: string;
  qcStatus?: string;
  updateTime?: number; // updateTime is a timestamp as long milliseconds
                       // use getDate(updateTime | date format) to display the date
  lastSavedBy?: Trainer;
  lastSavedById?: number;

  constructor(noteId: number, content: string, week: number, batchId: number, trainee: Trainee,
              traineeId: number, type: string, qcStatus: string, updateTime: number, lastSavedBy: Trainer, lastSavedById: number) {
    this.noteId=noteId;
    this.content=content;
    this.week=week;
    this.batchId=batchId;
    this.trainee=trainee;
    this.traineeId=traineeId;
    this.type=type;
    this.qcStatus = qcStatus;
    this.updateTime=updateTime;
    this.lastSavedBy=lastSavedBy;
    this.lastSavedById=lastSavedById;
  }
}
