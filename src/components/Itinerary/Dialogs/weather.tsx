import { Loading } from "@/components/Loading";
import { getWeather } from "@/handlers/Itinerary/actions/helpers";
import { useCurrentEvent, useHomepage } from "@/hooks";
import { MappedWeatherData } from "@/types/Weather";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import ReactWeather from "react-open-weather";
import theme from "../utils/Theme";

const Component = () => {
  const { locale } = useHomepage().itinerary;
  const event = useCurrentEvent();

  const loc = useMemo(() => event!.location, [event]);
  const [data, setData] = useState<MappedWeatherData | null>(null);

  useEffect(() => {
    const get = async () => setData(await getWeather({ location: loc }));

    if (!data) {
      get();
    }
  }, [data, loc]);

  if (!data) return <Loading />;

  const defaults = {
    lang: locale,
    locationLabel: event!.location.city,
    unitsLabels: {
      temperature: "F",
      windSpeed: "mph"
    },
    showForecast: true,
    theme
  };

  return (
    <Suspense fallback={<Loading />}>
      <ReactWeather {...defaults} data={data} />
    </Suspense>
  );
};
export default {
  title: "Weather",
  description: "See what the weather will be like!",
  Component
} as const;
