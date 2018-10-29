export class Batch {
    batchId: number;
    trainingName: string;
    trainingType: string;
    skillType: string;
    trainer: string;
    coTrainer: string;
    location: string;
    startDate: Date;
    endDate: Date;
    goodGradeThreshold: number;
    borderlineGradeThreshold: number;

    constructor(batchId: number, trainingName: string, trainingType: string, skillType: string, trainer: string, coTrainer: string,
        location: string, startDate: Date, endDate: Date, goodGrade: number, passingGrade: number) {
            this.batchId = batchId;
            this.trainingName = trainingName;
            this.trainingType = trainingType;
            this.skillType = skillType;
            this.trainer = trainer;
            this.coTrainer = coTrainer;
            this.location = location;
            this.startDate = startDate;
            this.endDate = endDate;
            this.goodGradeThreshold = goodGrade;
            this.borderlineGradeThreshold = passingGrade;
        }
}
