import { Category } from "./Category";

export class Assessment{
    assessmentId : number; 
    rawScore: number;
    assessmentTitle: string;
    assessmentType: string;
    weekNumber: number;
    batchId: number;
    assessmentCategory: number;

    /**
     * 
     * @param assessmentId
     * @param rawScore
     * @param assessmentTitle
     * @param assessmentType
     * @param weekNumber
     * @param batchId
     * @param assessmentCategory
     */

    constructor(assessmentId: number, rawScore: number, assessmentTitle: string, assessmentType: string, 
                weekNumber: number, batchId: number, assessmentCategory:number){
                    this.assessmentId = assessmentId;
                    this.rawScore = rawScore;
                    this.assessmentTitle = assessmentTitle;
                    this.assessmentType = assessmentType;
                    this.weekNumber = weekNumber;
                    this.batchId = batchId;
                    this.assessmentCategory =assessmentCategory;

                }
}