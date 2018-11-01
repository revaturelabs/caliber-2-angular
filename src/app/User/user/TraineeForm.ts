import { TrainingStatus } from './TrainingStatus';
import { TraineeFlag } from './TraineeFlag';

export class TraineeForm {

    traineeId: number;
    resourceId: string;
    name: string;
    email: string;
    trainingStatus: TrainingStatus;
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

    constructor(name: string, email: string, skypeId: string, batchId: number, phoneNumber: string, college: string,
        degree: string, major: string, recruiterName: string, techScreenerName: string,
        projectCompletion: string, profileUrl: string, trainingStatus: TrainingStatus) {
        this.traineeId = 1000;
        this.resourceId = 'resourceString';
        this.batchId = batchId;
        this.techScreenScore = 0;
        this.name = name;
        this.email = email;
        this.skypeId = skypeId;
        this.phoneNumber = phoneNumber;
        this.college = college;
        this.degree = degree;
        this.major = major;
        this.recruiterName = recruiterName;
        this.techScreenerName = techScreenerName;
        this.projectCompletion = projectCompletion;
        this.profileUrl = profileUrl;
        this.trainingStatus = trainingStatus;
    }
}
