import { Batch } from "src/app/Batch/type/batch";
import { Trainee, Grade } from "src/app/Batch/type/trainee";
import { Assessment } from "src/app/Assess-Batch/Models/Assesment";

export class ReportOutput {
    selectedYear: string;
    selectedBatches: Batch[];
    selectedWeek: number;
    selectedTrainee: Trainee;
    assessmentsDataStore: Assessment[];
    gradesDataStore: Grade[];
    calculateGradesAverage: number;
    calculateAssessmentsAverage: number;
    /*
     * @param selectedYear
     * @param selectedBatch
     * @param selectedWeek
     * @param selectedTrainee
     * @param assessmentsDataStore
     * @param gradesDataStore
     * @param calculateGradesAverage
     * @param calculateAssessmentsAverage
     */
    constructor(){} 
}