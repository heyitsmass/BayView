"use client";
import { getGeocode } from "@/handlers/Itinerary/actions/helpers/getGeocode";
import { Geocode } from "@/types";
import { TLocationType } from "@/types/Event";
import { useEffect, useMemo, useState } from "react";

export const useGeocoder = (location: TLocationType) => {
  const [geocode, setGeocode] = useState<Geocode | null>(null);

  useEffect(() => {
    const get = async () => {
      if (!geocode)
        setGeocode(await getGeocode(Object.values(location).join(" ")));
    };
    !geocode && get();
  }, [location, geocode]);

  return geocode;
};
