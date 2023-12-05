"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { useMap, useMapsLibrary, Marker } from "@vis.gl/react-google-maps";

import { useHomepage } from "@/hooks";
import {
  faArrowRight,
  faClock,
  faMountainCity
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  PropsWithChildren,
  ReactNode,
  Suspense,
  useEffect,
  useState
} from "react";
import styles from "./map.module.css";
import { Loading } from "../Loading";
type GoogleGeoCode = {
  lat: number;
  lng: number;
};

enum Animation {
  /**
   * Marker bounces until animation is stopped by calling {@link
   * google.maps.Marker.setAnimation} with <code>null</code>.
   */
  BOUNCE = 0.0,
  /**
   * Marker drops from the top of the map to its final location. Animation
   * will cease once the marker comes to rest and {@link
   * google.maps.Marker.getAnimation} will return <code>null</code>. This type
   * of animation is usually specified during creation of the marker.
   */
  DROP = 1.0
}

enum TravelMode {
  /**
   * Specifies a bicycling directions request.
   */
  BICYCLING = "BICYCLING",
  /**
   * Specifies a driving directions request.
   */
  DRIVING = "DRIVING",
  /**
   * Specifies a transit directions request.
   */
  TRANSIT = "TRANSIT",
  /**
   * Specifies a walking directions request.
   */
  WALKING = "WALKING"
}

export enum UnitSystem {
  /**
   * Specifies that distances in the <code>DirectionsResult</code> should be
   * expressed in imperial units.
   */
  IMPERIAL = 0.0,
  /**
   * Specifies that distances in the <code>DirectionsResult</code> should be
   * expressed in metric units.
   */
  METRIC = 1.0
}

type MapProps = PropsWithChildren<{
  origin: GoogleGeoCode;
  destination: GoogleGeoCode;
  travelMode: TravelMode;
}>;

const MapProvider = ({ children }: { children: ReactNode }) => {
  //api key usage is restricted as it's exposed to the client.

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {children}
    </APIProvider>
  );
};

export function GoogleMap({ origin }: { origin: GoogleGeoCode }) {
  return (
    <MapProvider>
      <Map center={origin} className="rounded-2xl h-full w-full" zoom={13}>
        <Marker position={origin} animation={Animation.BOUNCE} />
      </Map>
    </MapProvider>
  );
}

export function GoogleDirectionsMap({
  origin,
  destination,
  mode
}: {
  origin: GoogleGeoCode;
  destination: GoogleGeoCode;
  mode: "DRIVING" | "BICYCLING" | "TRANSIT" | "WALKING";
}) {
  return (
    <MapProvider>
      <Map center={origin} className="rounded-2xl h-full w-full">
        <Directions
          origin={origin}
          destination={destination}
          travelMode={TravelMode[mode]}
        />
      </Map>
    </MapProvider>
  );
}

const Directions = ({ origin, destination, travelMode }: MapProps) => {
  //Adopted from https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx

  const { unitSystem, locale } = useHomepage().itinerary;

  const map = useMap();

  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize Directions Service and Renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  const [empty, setEmpty] = useState(false);

  // Use Directions Route
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin,
        destination,
        travelMode,
        provideRouteAlternatives: true,
        unitSystem: UnitSystem[unitSystem],
        language: locale
      })
      .then((response) => {
        if (directionsRenderer.getMap() === null) {
          directionsRenderer.setMap(map);
        }

        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        setEmpty(false);
      })
      .catch((err) => {
        setEmpty(true);
        directionsRenderer.setMap(null);
      });

    //return () => directionsRenderer.setMap(null);
  }, [
    origin,
    destination,
    travelMode,
    directionsService,
    directionsRenderer,
    unitSystem,
    locale,
    map
  ]);

  // Update Directions Renderer
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  const hours = leg.duration?.value! / 3600;
  const minutes = leg.duration?.value! / 60 - Math.floor(hours) * 60;
  const time = `${Math.floor(hours)}h ${Math.floor(minutes)}m`;
  if (empty)
    return (
      <div className="text-zinc-900 dark:text-zinc-100">
        <div className={styles.title}>
          <p className="min-w-max font-semibold">{"No Results!"}</p>
        </div>
        <div
          className={[
            styles.directions,
            styles[travelMode.toString()]
          ].join(" ")}
        ></div>
      </div>
    );
  return (
    <div className="text-zinc-900 dark:text-zinc-100">
      <div className={styles.title}>
        <p className="min-w-max font-semibold">{selected.summary}</p>
      </div>

      <div
        className={[styles.directions, styles[travelMode.toString()]].join(
          " "
        )}
      >
        <p className="py-4 font-semibold">
          {leg.start_address.split(",")[0]}{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          {leg.end_address.split(",")[0]}
        </p>
        <p className="flex w-1/2 items-center">
          <FontAwesomeIcon icon={faMountainCity} className="w-8" />{" "}
          {leg.distance?.text}
        </p>
        <p className="flex w-1/2 items-center">
          <FontAwesomeIcon icon={faClock} className="w-8" />
          {time}
        </p>
        <div className="pb-4 mt-4">
          <ul className="flex flex-col gap-2">
            {routes.map((route, index) => (
              <li key={route.summary}>
                <button
                  className={styles.button}
                  onClick={() => setRouteIndex(index)}
                  disabled={selected.summary === route.summary}
                >
                  {route.summary}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
