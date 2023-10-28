import {Event} from './Event'; 
export interface IItinerary {
  startDate?: Date;
  endDate?: Date;
  events: Event[];
}
