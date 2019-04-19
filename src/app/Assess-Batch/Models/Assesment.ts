import { Category } from "./Category";

export interface Assessment{
    assessmentId : number; 
    title: string;
    category: Category;
    type: string;
}