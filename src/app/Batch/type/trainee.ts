import {TraineeFlag} from "../../User/user/types/trainee-flag";

export class Trainee {
    traineeId: number;
    resourceId: string;
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
    flagStatus: TraineeFlag;
    flagNotes: string;
    flagAuthor: string;
    flagTimeStamp: string;
    constructor( ) {}
}

export class traineeAssessment {
        assessmentId?: number;
        rawScore: number;
        assessmentTitle: string;
        assessmentType: string;
        weekNumber: number;
        batchId: number;
        assessmentCategory: number;
}

export class Grade {
        gradeId?: number;
        dateReceived: number;
        score: number;
        assessmentId: number;
        traineeId: number;
}

