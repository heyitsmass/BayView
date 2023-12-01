"use server";

import { Location } from "@/types/Event";
import { MappedWeatherData, WeatherResponse } from "@/types/Weather";
import { fetcher } from "@/utils/fetcher";
import { mapWeatherData } from "@/utils/openWeather";
import { getGeocode } from "./getGeocode";

export type GetWeatherPayload = {
  location: Location;
};

/** Get the current weather stats */
const getWeather = async ({
  location
}: {
  location: Location;
}): Promise<MappedWeatherData> => {
  const address = [...Object.values(location)].join(",");

  const geocode = await getGeocode(address);

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
