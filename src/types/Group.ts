import { IUser } from "./User";

export interface Group {
  name: string;
  members: IUser[];
  itinerary: IItinerary;
}
