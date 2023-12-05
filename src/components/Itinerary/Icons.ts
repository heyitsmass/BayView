import { DiningOptions } from "@/types";
import { TEventType, TSportEvent } from "@/types/Event";
import {
  IconDefinition,
  faBaseball,
  faBasketballBall,
  faBuildingColumns,
  faBurger,
  faChampagneGlasses,
  faFishFins,
  faFootball,
  faFutbol,
  faGolfBallTee,
  faHippo,
  faHockeyPuck,
  faHotel,
  faMasksTheater,
  faMedal,
  faMicrophoneLines,
  faMugSaucer,
  faPeopleGroup,
  faPersonBiking,
  faPersonHiking,
  faPersonSwimming,
  faPlane,
  faPlateWheat,
  faShoppingCart,
  faSpa,
  faTableTennisPaddleBall,
  faTicket,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";

const DiningMap: {
  [P in DiningOptions]: IconDefinition;
} = {
  Breakfast: faMugSaucer,
  Lunch: faBurger,
  Dinner: faPlateWheat
};

const EventMap: {
  [P in TEventType]: IconDefinition;
} = {
  Flight: faPlane,
  Hotel: faHotel,
  Dining: faUtensils,
  Theatre: faMasksTheater,
  Concert: faMicrophoneLines,
  Museum: faBuildingColumns,
  Park: faPeopleGroup,
  Zoo: faHippo,
  Aquarium: faFishFins,
  Waterpark: faPersonSwimming,
  AmusementPark: faTicket,
  Hiking: faPersonHiking,
  Biking: faPersonBiking,
  Shopping: faShoppingCart,
  Sports: faMedal,
  Nightlife: faChampagneGlasses,
  Spa: faSpa,
  Golf: faGolfBallTee
};

const SportMap: {
  [P in TSportEvent]: IconDefinition;
} = {
  Football: faFootball,
  Basketball: faBasketballBall,
  Baseball: faBaseball,
  Hockey: faHockeyPuck,
  Soccer: faFutbol,
  Tennis: faTableTennisPaddleBall
};

export default { ...EventMap, ...DiningMap, ...SportMap } as const;
