"use server";
import { DisplayableEvent, getRandomEvent } from "@/lib/random/handler";
import { EventTypes, SportEvents } from "@/types/Event";
import { randomInt } from "crypto";

export const findEvents = async (
  formData: FormData,
  {
    event,
    sport
  }: {
    event?: EventTypes;
    sport?: SportEvents;
  }
) => {
  const fetchActivity = async (event?: EventTypes, sport?: SportEvents) => {
    return event === "Sports"
      ? getRandomEvent(event, sport!)
      : getRandomEvent(event);
  };

  const set = [] as DisplayableEvent[];

  for (let i = 4; i < randomInt(4, 12); i++) {
    const activity = await fetchActivity(event, sport);
    set.push(activity);
  }

  return set;
};
