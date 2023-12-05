"use server";

import { Geocode } from "@/types";
import { Location } from "@/types/Event";

export const getGeocode = async ({
  location
}: {
  location: Location;
}): Promise<Geocode> => {

  const address = [...Object.values(location)].join(" ");

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data.results[0].geometry.location;
};
