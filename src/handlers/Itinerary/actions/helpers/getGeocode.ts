"use server";

import { Geocode } from "@/types";

export const getGeocode = async (address: string): Promise<Geocode> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data.results[0].geometry.location;
};
