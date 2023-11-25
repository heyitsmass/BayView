import { FlattenedEvent } from "@/app/home/itinerary/page";
import { EventTypes, SportEvents } from "@/types/Event";
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
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./event.module.css";
import { SyntheticEvent } from "react";

type DiningOptions = "Breakfast" | "Lunch" | "Dinner";

const DiningMap: {
  [P in DiningOptions]: IconDefinition;
} = {
  Breakfast: faMugSaucer,
  Lunch: faBurger,
  Dinner: faPlateWheat,
};

const EventMap: {
  [P in EventTypes]: IconDefinition;
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
  Golf: faGolfBallTee,
};

const SportMap: {
  [P in SportEvents]: IconDefinition;
} = {
  Football: faFootball,
  Basketball: faBasketballBall,
  Baseball: faBaseball,
  Hockey: faHockeyPuck,
  Soccer: faFutbol,
  Tennis: faTableTennisPaddleBall,
};

const IconMap: {
  [P in EventTypes | DiningOptions | SportEvents]: IconDefinition;
} = { ...EventMap, ...DiningMap, ...SportMap };

type EventOptions = EventTypes | DiningOptions | SportEvents;

type ItineraryEventProps = {
  onClick: (e: SyntheticEvent) => void;
} & FlattenedEvent;
export const ItineraryEvent = ({ ...props }: ItineraryEventProps) => {
  const { __t, peek, picture_url, onClick } = props;

  const [title, name] = peek;

  return (
    <div
      className={
        styles.event +
        " border h-28 rounded-2xl m-3 flex shadow-lg bg-zinc-700 border-zinc-600 cursor-pointer"
      }
      onClick={onClick}
    >
      <div className="relative w-full flex flex-row items-center">
        <div
          className={
            styles.icon +
            " border-r-2 dark:border-white h-2/3 flex items-center justify-center text-4xl text-rose-800"
          }
        >
          <FontAwesomeIcon
            icon={IconMap[__t]}
            className={"!drop-shadow-3xl min-w-[66px] w-full mx-4"}
          />
        </div>
        <div className={styles.wrapper + " w-5/6 flex relative h-full"}>
          <div
            className={
              styles.info +
              " w-3/4 h-full pl-4 grid grid-cols-2 text-sm rounded-r-2xl gap-2 p-2"
            }
          >
            <h2 className="col-span-full !text-base capitalize flex">
              <span className="w-max min-w-max">
                <b>{title.label} </b> - <span>{title.value}</span>
              </span>

              <p className={styles.name + " ml-1 truncate ellipsis"}>
                - <span>{name.value}</span>
              </p>
            </h2>
            {peek.slice(2).map((item, i) => {
              return (
                <p key={i}>
                  {"label" in item && <span>{item.label}</span>}
                  <small>{item.value}</small>
                </p>
              );
            })}
          </div>
          <div
            className={
              styles.img +
              " absolute h-full right-0 rounded-r-2xl w-1/4 !min-w-1/4"
            }
            style={{
              background: `url(${picture_url})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
