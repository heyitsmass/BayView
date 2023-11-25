"use server";

import { handleCall } from "@/lib/random/handleCall";
import { location } from "@/lib/random/utils";

import { DocumentWithDisplayData } from "@/types";
import {
  Activities,
  Event,
  EventTypes,
  Reservable,
  SportEvents,
  Sports,
} from "@/types/Event";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { HydratedDocument } from "mongoose";
import { modelTypes } from "../constants";

export async function getRandomEvent(): Promise<
  DocumentWithDisplayData<Event>
>;
/**
 * Generate a random Sports event based on the type
 * @param event - The type of event to generate (must be Sports)
 * @param sport - The type of sport to generate
 * @returns a Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: "Sports",
  sport: SportEvents
): Promise<DocumentWithDisplayData<HydratedDocument<Event<Sports>>>>;
/**
 * Generate a random (Non-Sports) event based on the type
 * @param event - The type of event to generate
 * @returns a Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: Exclude<EventTypes, "Sports">
): Promise<
  DocumentWithDisplayData<Event<Reservable | Omit<Activities, "Sports">>>
>;

/**
 * Generate a random event based on the type
 * @param event - The type of event to generate
 * @param sport - Only used for Sports
 * @returns A Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event?: EventTypes,
  sport?: SportEvents
): Promise<DocumentWithDisplayData<Event>> {
  const types: EventTypes[] = [
    "Hotel",
    "Dining",
    "Flight",
    "Theatre",
    "Concert",
    "Museum",
    "Park",
    "Zoo",
    "Aquarium",
    "Waterpark",
    "AmusementPark",
    "Nightlife",
    "Shopping",
    "Spa",
    "Golf",
    "Hiking",
    "Biking",
  ];

  const sports: SportEvents[] = [
    "Baseball",
    "Basketball",
    "Football",
    "Hockey",
    "Soccer",
    "Tennis",
  ];

  if (!event) {
    event = types[randomInt(types.length)];
    if (event === "Sports") {
      sport = sports[randomInt(sports.length)];
    }
  }

  const data =
    event === "Sports" ? handleCall(event, sport!) : handleCall(event);

  return new modelTypes[event]({
    name: faker.lorem.words(),
    location: location(),
    description: faker.lorem.words(),
    date: faker.date.future().toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    partySize: faker.number.int({ min: 1, max: 3 }),
    picture_url: `/assets/events/${event.toLowerCase()}.png`,
    ...data,
  });
}
