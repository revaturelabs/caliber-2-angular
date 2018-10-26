import { TrainingStatus } from './TrainingStatus';
import { TraineeFlag } from './TraineeFlag';

export class Trainee {

    name: string;
    email: string;
    trainingStatus: TrainingStatus;
    batch: number;
    phoneNumber: string;
    skypeId: string;
    profileUrl: string;
    recruiterName: string;
    college: string;
    degree: string;
    major: string;
    techScreenerName: string;
    projectCompletion: string;
    flagNotes: string;
    flagStatus: TraineeFlag;

    constructor( name: string,
        email: string,
        trainingStatus: TrainingStatus,
        batch: number,
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
            this.trainingStatus = trainingStatus;
            this.batch = batch;
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
