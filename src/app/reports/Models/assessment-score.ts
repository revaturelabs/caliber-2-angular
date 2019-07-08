export class AssessmentScore {
    public assessmentType: string;
    public score: number = -1;

    constructor(assessmentType: string, score: number = -1) {
        this.assessmentType = assessmentType;
        this.score = score;
    }
}
