'use client';
import { useGetData } from "@/hooks/useGetData";
import { GoogleGeoCodeResponse, Geocode as IGeocode } from "@/types";
import { TLocationType } from "@/types/Event";

export const Geocode = (location: TLocationType): IGeocode | null => {
  const baseAddress = "https://maps.googleapis.com/maps/api/geocode/json";

  const address = [...Object.values(location)].join(" ");

  const url = `${baseAddress}?address=${encodeURI(address)}`;

  const data = useGetData<GoogleGeoCodeResponse>(url);

  if (data?.status === "OK") {
    return data.results[0].geometry.location;
  }

  return null;
};

export const useGeocoder = (location: TLocationType) => {
  return Geocode(location);
};
