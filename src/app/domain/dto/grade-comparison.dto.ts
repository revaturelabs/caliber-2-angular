
export interface GradeComparisonDto {
  traineeGrades: GradesByAssessmentType;
  restOfBatchGrades: GradesByAssessmentType;
}

export interface GradesByAssessmentType {
  grades: Map<string, number>;
}
