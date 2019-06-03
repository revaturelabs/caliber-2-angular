export class Tag{

  categoryId: number;
  id: number;
  skillCategory: string;
  batchId: number;
  week: number;

  constructor(categoryId: number, skillCategory: string, batchId: number, week: number){
    this.categoryId = categoryId;
    this.skillCategory = skillCategory;
    this.batchId = batchId;
    this.week = week;
  }

  setId(id: number): void {
    this.id = id;
  }
}
