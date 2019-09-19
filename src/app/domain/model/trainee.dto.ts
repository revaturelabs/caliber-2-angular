import {TraineeFlag} from "./trainee-flag.dto";

/**
 * This class is used to represent Trainee JSON Object from User Service (com.revature.caliber.pojo.Trainee)
 */

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
