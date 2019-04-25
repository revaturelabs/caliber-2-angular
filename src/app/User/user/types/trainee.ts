import { TraineeFlag } from "./trainee-flag";

export class Trainee {

    traineeId: number;
    resourceId: number;
    name: string;
    email: string;
    trainingStatus: string;
    batchId: number;
    phoneNumber: string;
    skypeId: string;
    profileUrl: string;
    recruiterName: string;
    college: string;
    degree: string;
    major: string;
    techScreenerName: string;
    techScreenScore: number;
    projectCompletion: string;
    flagNotes: string;
    flagStatus: TraineeFlag;

    constructor() {}
}

export class traineeAssessment {
    assessmentId: number;
    rawScore: number;
    assessmentTitle: string;
    assessmentType: string;
    weekNumber: number;
    batchId: number;
    assessmentCategory: number;
}

export class Grade {
    gradeId: number;
    dateReceived: number;
    score: number;
    assessmentId: number;
    traineeId: number;
}

export class Category {
    categoryId: number;
    skillCategory: string;
    categoryOwner: string;
    active: boolean;
}
