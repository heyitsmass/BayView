"use client";
import { getGeocode } from "@/handlers/Itinerary/actions/helpers/getGeocode";
import { Geocode } from "@/types";
import { Location } from "@/types/Event";
import { useEffect, useMemo, useState } from "react";

export const useGeocoder = (location: Location) => {
  const [geocode, setGeocode] = useState<Geocode | null>(null);

  useEffect(() => {
    const get = async () => {
      if (!geocode) setGeocode(await getGeocode({ location }));
    };
    !geocode && get();
  }, [location, geocode]);

  return geocode;
};
