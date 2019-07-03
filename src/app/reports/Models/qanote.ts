import { Trainee } from "src/app/Batch/type/trainee";

export class QANote {
    noteId : number;
    content : String;
    week : number;
    batchId: number;
    trainee: Trainee;
    traineeId: number;
    type: String;
    qcStatus: String;
    updateTime: number;
    lastSavedBy: Object;
}