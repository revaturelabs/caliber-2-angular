/**
 * This interface is used to model the SkillType JSON Object from Skilltype Service (com.revature.caliber.beans.SkillType)
 */

export interface SkillType {
  id?: number; // Optional since will not have id when creating client side
  type: string;
}
