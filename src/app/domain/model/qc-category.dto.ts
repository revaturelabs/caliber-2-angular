/**
 * This interface is used to represent the Category JSON object returned from the Quality Audit Service (com.revature.caliber.beans.Category)
 */

export interface QcCategory {
  id?: number;  // id is optional because it will have one if persistent entity, will not have one if transient entity
  categoryId: number;
  skillCategory: string;
  batchId: number;
  week: number;
}
