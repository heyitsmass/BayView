"use server";

import { faker } from "@faker-js/faker";
import { findEntertainment } from "./findEntertainment";
import { findExperience } from "./findExperience";
import { findOutdoor } from "./findOutdoor";
import { findRelaxation } from "./findRelaxation";
import { findReservation } from "./findReservation";

import { modelTypes } from "@/lib/constants";
import { DisplayData } from "@/types";
import {
  Event,
  TEvent,
  TEventQuery,
  TEventType,
  TLocationType
} from "@/types/Event";

export type DisplayableEvent<T extends TEvent = TEvent> = Event<T> &
  DisplayData & {
    __t: TEventType;
    _id: string;
  };

const findEvents = async ({
  ...props
}: TEventQuery): Promise<DisplayableEvent[] | null> => {
  const { activity, type } = props;

  let res: TEvent[] | null = null;

  if ("priceRange" in props.params) {
    const asInt = parseInt(props.params.priceRange.toString());
    props.params.priceRange = asInt <= 0 ? 9999 : asInt;
  }

  switch (activity) {
    case "Entertainment":
      res = await findEntertainment({
        ...props
      } as TEventQuery<"Entertainment">);
      break;
    case "Relaxation":
      res = await findRelaxation({
        ...props
      } as TEventQuery<"Relaxation">);
      break;
    case "Outdoor":
      res = await findOutdoor({
        ...props
      } as TEventQuery<"Outdoor">);
      break;
    case "Experience":
      res = await findExperience({
        ...props
      } as TEventQuery<"Experience">);
      break;

    case "Reservation":
      res = await findReservation({
        ...props
      } as TEventQuery<"Reservation">);
      break;

    default:
      break;
  }

  return res
    ? hydrate(res, type, props.params.date || new Date(Date.now()))
    : null;
};

const getLocation = (): TLocationType => {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    lat: faker.location.latitude(),
    lng: faker.location.longitude()
  };
};
const hydrate = async (
  events: TEvent[],
  mode: TEventType,
  refDate: Date
): Promise<DisplayableEvent[]> =>
  events.map(
    (event) =>
      new modelTypes[mode]({
        location: getLocation(),
        party: [],
        ...event,
        name: faker.company.name(),
        description: faker.lorem.words(10),
        date: faker.date.soon({
          refDate: new Date(Date.now()),
          days: 1 + Math.floor(Math.random() * 3)
        }),
        __t: mode
      }).toJSON({
        flattenObjectIds: true,
        virtuals: true
      }) as DisplayableEvent
  );

export { findEvents };
