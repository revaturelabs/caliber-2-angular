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
    weeks: number;

    /**
     * constructor for batch
     * @param trainingName batch name
     * @param trainingType training type
     * @param skillType skill type
     * @param trainer trainer
     * @param coTrainer co-trainer
     * @param locationId location Id
     * @param startDate start date
     * @param endDate end date
     * @param goodGrade good grade
     * @param passingGrade minimal passing grade
     * @param weeks number of weeks
     */
    constructor(trainingName: string, trainingType: string, skillType: string, trainer: string, coTrainer: string,
        locationId: number, startDate: Date, endDate: Date, goodGrade: number, passingGrade: number, weeks: number) {
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
            this.weeks = weeks;
        }
}
