import { Batch } from "src/app/Batch/type/batch";
import { QANote } from "src/app/reports/Models/qanote";

export class BatchCollection
{
    batch?:Batch;
    qaNotes?:QANote[];
    numPoor?:number;
    numAvg?:number;
    numGood?:number;
    numSuper?:number;
    overallStatus?:string;
}