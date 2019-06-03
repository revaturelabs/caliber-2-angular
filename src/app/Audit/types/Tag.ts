export class Tag{

  categoryId: number;
  id: number;
  skillCategory: string;
  batchId: number;
  week: number;

  constructor(categoryId: number, id: number, skillCategory: string, batchId: number, week: number){
    this.categoryId = categoryId;
    this.id = id;
    this.skillCategory = skillCategory;
    this.batchId = batchId;
    this.week = week;
  }
}
