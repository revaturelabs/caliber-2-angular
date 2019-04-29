export class Category {
    categoryId: number;
    skillCategory: string;
    categoryOwner: string;
    active: boolean;
  

  /**
   * 
   * @param categoryId
   * @param skillCategory
   * @param categoryOwner
   * @param active
   * 
   */
  constructor(categoryId: number, skillCategory: string, categoryOwner: string, active: boolean){
    this.categoryId = categoryId;
    this.skillCategory = skillCategory;
    this.categoryOwner = categoryOwner;
    this.active = active;

  }

}