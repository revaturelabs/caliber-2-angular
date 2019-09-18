/**
 * To be determined where this is used (maybe is client side only)
 */

export class AssessmentScore {
  public assessmentType: string;
  public score: number = -1;

  constructor(assessmentType: string, score: number = -1) {
    this.assessmentType = assessmentType;
    this.score = score;
  }
}
