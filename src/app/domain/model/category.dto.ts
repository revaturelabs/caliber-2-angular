/**
 * This class is used to model JSON objects returned from the Category Service (com.revature.caliber.beans.Category)
 */

export class Category {
  categoryId?: number;
  skillCategory: string;
  active: boolean;
  categoryOwner?: string;

  /**
   *
   * @param categoryId
   * @param skillCategory
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
