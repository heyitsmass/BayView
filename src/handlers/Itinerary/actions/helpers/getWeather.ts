"use server";

import { TLocationType } from "@/types/Event";
import { MappedWeatherData, WeatherResponse } from "@/types/Weather";
import { fetcher } from "@/utils/fetcher";
import { mapWeatherData } from "@/utils/openWeather";
import { getGeocode } from "./getGeocode";

export type GetWeatherPayload = {
  location: TLocationType;
};

/** Get the current weather stats */
const getWeather = async ({
  location
}: {
  location: TLocationType;
}): Promise<MappedWeatherData | null> => {
  const address = [...Object.values(location)].join(",");

  const geocode = await getGeocode(address);

  if (!geocode) return null;

  type ExclusionFields =
    | "current"
    | "minutely"
    | "hourly"
    | "daily"
    | "alerts";

  const exclude = ["minutely", "hourly", "alerts"] as ExclusionFields[];

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${
    geocode.lat
  }&lon=${geocode.lng}&exclude=${exclude.join(",")}&appid=${
    process.env.OPEN_WEATHER_API_KEY
  }`;

  const data = await fetcher<WeatherResponse>(url);

  return mapWeatherData(data.daily, data.current, "en");
};

export { getWeather };
