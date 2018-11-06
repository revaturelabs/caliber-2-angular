export class Batch {
    batchId: number;
    trainingName: string;
    trainingType: string;
    skillType: string;
    trainer: string;
    coTrainer: string;
    location: string;
    locationId: number;
    startDate: Date;
    endDate: Date;
    goodGrade: number;
    passingGrade: number;
    traineeCount: number;

    //  constructor for batch object
    constructor(trainingName: string, trainingType: string, skillType: string, trainer: string, coTrainer: string,
        locationId: number, startDate: Date, endDate: Date, goodGrade: number, passingGrade: number) {
            this.trainingName = trainingName;
            this.trainingType = trainingType;
            this.skillType = skillType;
            this.trainer = trainer;
            this.coTrainer = coTrainer;
            this.locationId = locationId;
            this.startDate = startDate;
            this.endDate = endDate;
            this.goodGrade = goodGrade;
            this.passingGrade = passingGrade;
        }
}
