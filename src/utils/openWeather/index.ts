//https://github.com/farahat80/react-open-weather/blob/master/src/js/providers/openweather/useOpenWeather.js
import {
  CurrentForecast,
  DailyForecast,
  MappedDailyForecast,
  MappedForecast,
  MappedWeatherData
} from "@/types/Weather";
import dayjs from "dayjs";
import { getIcon } from "./IconsMap";
import { Locale } from "./langText";

const formatDate = (dte, lang: Locale) => {
  if (lang && lang !== "en") {
    dayjs.locale(lang.replace("_", "-"));
  }
  if (dte && dayjs(dte).isValid()) {
    return dayjs.unix(dte).format("ddd D MMMM");
  }
  return "";
};

const mapCurrent = (day: CurrentForecast, lang: Locale): MappedDailyForecast => {
  return {
    date: formatDate(day.dt, lang),
    description: day.weather[0]?.description,
    icon: day.weather[0] && getIcon(day.weather[0].icon),
    temperature: {
      current: day.temp.toFixed(0),
      min: undefined, // openweather doesnt provide min/max on current weather
      max: undefined
    },
    wind: day.wind_speed.toFixed(0),
    humidity: day.humidity
  };
};

const mapForecast = (
  forecast: DailyForecast[],
  lang: Locale = "en"
): MappedForecast[] => {
  const mappedForecasts = [] as MappedForecast[];

  for (let i = 0; i < 5; i += 1) {
    mappedForecasts.push({
      date: formatDate(forecast[i].dt, lang),
      description: forecast[i].weather[0]
        ? forecast[i].weather[0].description
        : undefined,
      icon: forecast[i].weather[0] && getIcon(forecast[i].weather[0].icon),
      temperature: {
        min: forecast[i].temp.min.toFixed(0),
        max: forecast[i].temp.max.toFixed(0)
      },
      wind: forecast[i].wind_speed.toFixed(0),
      humidity: forecast[i].humidity
    });
  }
  return mappedForecasts;
};

const mapWeatherData = (
  forecastData: DailyForecast[],
  todayData: CurrentForecast,
  lang: Locale
): MappedWeatherData => {
  return {
    current: mapCurrent(todayData, lang),
    forecast: mapForecast(forecastData, lang)
  };
};

export { mapWeatherData };
