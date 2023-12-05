"use client";
import Button from "@/components/Button";
import { Loading } from "@/components/Loading";
import { GoogleDirectionsMap } from "@/components/Maps";

import { getGeocode } from "@/handlers/Itinerary/actions/helpers/getGeocode";
import { useCurrentEvent, useGeocoder } from "@/hooks";
import { Geocode } from "@/types";
import { Location } from "@/types/Event";
import {
  faBicycle,
  faBus,
  faCar,
  faPersonWalking
} from "@fortawesome/free-solid-svg-icons";

import React, { Suspense, useEffect, useMemo, useState } from "react";

const mapDirectionModes = [
  "DRIVING",
  "BICYCLING",
  "TRANSIT",
  "WALKING"
] as const;

const modeIconMap = {
  DRIVING: faCar,
  BICYCLING: faBicycle,
  TRANSIT: faBus,
  WALKING: faPersonWalking
} as const;

type MapDirectionsMode = (typeof mapDirectionModes)[number];

const Component = () => {
  const event = useCurrentEvent();
  const [mode, setMode] = useState<MapDirectionsMode>("DRIVING");

  const geocode = useGeocoder(event!.location);

  const [userLoc, setUserLoc] = useState<Geocode | null>(null);

  if (!userLoc)
    navigator.geolocation.getCurrentPosition(
      (e) => {
        setUserLoc({
          lat: e.coords.latitude,
          lng: e.coords.longitude
        } as Geocode);
      },
      (e) => {
        console.log(e.message);
      }
    );

  if (!geocode || !userLoc) return <Loading />;

  const { lat, lng } = geocode;

  const origin = {
    lat: userLoc.lat,
    lng: userLoc.lng
  };

  const destination = {
    lat: lat,
    lng: lng
  };

  if (!origin || !destination) return <Loading />;

  return (
    <>
      <div className="w-[800px] z-0 relative">
        <div className="h-[400px] mb-4">
          <GoogleDirectionsMap
            origin={origin}
            destination={destination}
            mode={mode}
          />
        </div>
        <div>
          <div className="flex gap-4 pt-4 w-full justify-center">
            {mapDirectionModes.map((m) => (
              <Button
                icon={modeIconMap[m]}
                variant="secondary"
                key={m}
                onClick={() => setMode(m)}
                disabled={mode === m}
              >
                <span className="capitalize">{m.toLocaleLowerCase()}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default {
  title: "Directions",
  description: "Get directions to your event!",
  Component
} as const;
