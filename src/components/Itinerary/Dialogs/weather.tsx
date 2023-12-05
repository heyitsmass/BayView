'use client'; 
import { Loading } from "@/components/Loading";
import { getWeather } from "@/handlers/Itinerary/actions/helpers";
import { useCurrentEvent, useHomepage } from "@/hooks";
import { MappedWeatherData } from "@/types/Weather";
import { Suspense, useEffect, useMemo, useState } from "react";
import ReactWeather from "react-open-weather";
import theme from "../utils/Theme";

const Component = () => {
  const { locale, temperateUnit, speedUnit } = useHomepage().itinerary;
  const event = useCurrentEvent();

  const [data, setData] = useState<MappedWeatherData | null>(null);

  useEffect(() => {
    const get = async () =>
      setData(await getWeather({ location: event!.location }));

    if (!data) {
      get();
    }
  }, [data, event]);

  if (data === null) return <Loading />;

  const defaults = {
    lang: locale,
    locationLabel: event!.location.city,
    unitsLabels: {
      temperature: temperateUnit,
      windSpeed: speedUnit
    },
    showForecast: true,
    theme
  };

  return (
    <Suspense fallback={<Loading />}>
      {data != null && <ReactWeather {...defaults} data={data} />}
    </Suspense>
  );
};
export default {
  title: "Weather",
  description: "See what the weather will be like!",
  Component
} as const;
