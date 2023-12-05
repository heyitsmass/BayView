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

  return res ? hydrate(res, type) : null;
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
  mode: TEventType
): Promise<DisplayableEvent[]> =>
  events.map(
    (event) =>
      new modelTypes[mode]({
        ...event,
        name: faker.company.name(),
        location: getLocation(),
        description: faker.lorem.words(10),
        party: [],
        date: faker.date.soon({
          refDate: new Date()
        }),
        __t: mode
      }).toJSON({
        flattenObjectIds: true,
        virtuals: true
      }) as DisplayableEvent
  );

export { findEvents };
