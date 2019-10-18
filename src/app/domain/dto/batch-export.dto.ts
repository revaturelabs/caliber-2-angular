export interface BatchExport {
  trainingName: string;
  trainingType: string;
  skillType: string;
  trainer: string;
  coTrainer: string;
  location?: string;
  locationId: number;
  startDate: any;
  endDate: any;
  goodGrade: number;
  passingGrade: number;
}
