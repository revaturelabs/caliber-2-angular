import { TrainingStatus } from './training-status';
import { TraineeFlag } from './trainee-flag';

/**
 * @ignore
 */
export class Trainee {

    traineeId: number;
    resourceId: number;
    name: string;
    email: string;
    trainingStatus: string;
    // batchId: number;
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

    /**
     *
     * @param name Trainee's name
     * @param email  Trainee's email
     * @param trainingStatus Trainee's training status
     * @param batch Trainee's batch id
     * @param phoneNumber Trainee's phone Number
     */
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
