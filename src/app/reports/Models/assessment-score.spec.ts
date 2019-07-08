import { AssessmentScore } from './assessment-score';

describe('AssessmentScore', () => {
  it('should create an instance', () => {
    expect(new AssessmentScore("EXAM", 95)).toBeTruthy();
  });
});
