/**
 * This interface is used to represent Location JSON Object from Location Service (com.revature.location.domain.Location)
 */

export interface Location {
  id?: number; // Optional because it won't have an idea if transient entity, will have one if persistent entity
  name: string;
  city: string;
  zipcode: string;
  address: string;
  state: string;
  active: boolean;
}
