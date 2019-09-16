export interface GradeExport {
  batchId: string;
  quizzes: Quiz[];
}

export interface Quiz {
  title: string;
  category: string;
  grades: SingleGradeFromExport[];
}

export interface SingleGradeFromExport {
  traineeId: string;
  grade: number;
}
