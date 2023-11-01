import { IUser } from "./User";
import { IItinerary } from "@/types/Itinerary";
export interface Group {
  name: string;
  members: IUser[];
  itinerary: IItinerary;
}
