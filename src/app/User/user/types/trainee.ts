import { TrainingStatus } from './training-status';
import { TraineeFlag } from './trainee-flag';

export class Trainee {

    traineeId: number;
    resourceId: number;
    name: string;
    email: string;
    trainingStatus: string;
    // batch: number;
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
    flagStatus: string;

    constructor(
        name: string,
        email: string,
        trainingStatus: string,
        // batch: number,
        phoneNumber: string) {
        // skypeId: string,
        // profileUrl: string,
        // recruiterName: string,
        // college: string,
        // degree: string,
        // major: string,
        // techScreenerName: string,
        // projectCompletion: string
            this.name = name;
            this.email = email;
            this.trainingStatus = trainingStatus;
            // this.batch = batch;
            this.phoneNumber = phoneNumber;
            // this.skypeId = skypeId;
            // this.profileUrl = profileUrl;
            // this.recruiterName = recruiterName;
            // this.college = college;
            // this.degree = degree;
            // this.major = major;
            // this.techScreenerName = techScreenerName;
            // this.projectCompletion = projectCompletion;
        }
}
