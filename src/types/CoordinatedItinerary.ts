import { Group } from "./Group";
import { IUser } from "./User";

export interface ICoordinatedItinerary {
  coordinators: {
    primary: IUser;
    secondary: IUser[];
  };
  groups: Group[];
}
