import { IconName } from "@/utils/openWeather/IconsMap";

type Weather = {
  /** Weather condition id */
  id: number;
  /** Group of weather parameters (Rain, Snow, Extreme etc.) */
  main: string;
  /** Weather condition within the group (full list of weather conditions). Get the output in your language */
  description: string;
  /** Weather icon id */
  icon: IconName;
};

export type Forecast<T = unknown> = {
  /** Time of the forecasted data, Unix, UTC */
  dt: number;
  /** Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used */
  temp: number;
  /** Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used */
  feels_like: number;
  /** Atmospheric pressure on the sea level, hPa */
  pressure: number;
  /** Humidity, % */
  humidity: number;
  /** Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit */
  dew_point: number;
  /** Cloudiness, % */
  clouds: number;
  /** Average visibility, metres. The maximum value of the visibility is 10 km */
  visibility: number;
  /** Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_speed: number;
  /** Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_gust?: number;
  /** Wind direction, degrees (meteorological) */
  wind_deg: number;
  /** Rain volume for last hour, mm */
  rain?: { "1h": number };
  /** Snow volume for last hour, mm */
  snow?: { "1h": number };

  weather: Weather[];
} & T;

export type CurrentForecast = Forecast<{
  /** Sunrise time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response */
  sunrise: number;
  /** Sunset time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response */
  sunset: number;
  /** UV index */
  uvi: number;
}>;

type HourlyForecast = Forecast<{
  /** Probability of precipitation */
  pop: number;
}>;

type MinutelyForecast = Pick<Forecast, "dt"> & {
  /** Precipitation volume, mm */
  precipitation: number;
};

type FeelsLikeForecast = {
  /** Morning temperature */
  morn: number;
  /** Day temperature */
  day: number;
  /** Evening temperature */
  eve: number;
  /** Night temperature */
  night: number;
};

type TempForecast = FeelsLikeForecast & {
  /** Min daily temperature */
  min: number;
  /** Max daily temperature */
  max: number;
};

export type DailyForecast = Omit<
  Forecast<{
    /** Sunrise time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response */
    sunrise: number;
    /** Sunset time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response */
    sunset: number;
    /** Human-readable description of the weather conditions for the day */
    summary: string;
    /** The time of when the moon rises for this day, Unix, UTC */
    moonrise: number;
    /** The time of when the moon sets for this day, Unix, UTC */
    moonset: number;
    /* Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibbous', 'waning gibbous', and 'waning crescent', respectively. Moon phase calculation algorithm: if the moon phase values between the start of the day and the end of the day have a round value (0, 0.25, 0.5, 0.75, 1.0), then this round value is taken, otherwise the average of moon phases for the start of the day and the end of the day is taken */
    moon_phase: number;
  }>,
  "temp" | "feels_like"
> & { temp: TempForecast; feels_like: FeelsLikeForecast };
/** Current weather data API response */
export type WeatherResponse = {
  /** Latitude of the location, decimal (-90; 90) */
  lat: number;
  /** Longitude of the location, decimal (-180; 180) */
  lon: number;
  /** Timezone name for the requested location */
  timezone: string;
  /** Shift in seconds from UTC */
  timezone_offset: number;
  /** Current forecast */
  current: CurrentForecast;
  /** Minute forecast weather data API response */
  minutely: MinutelyForecast[];
  /** Hourly forecast weather data API response */
  hourly: HourlyForecast[];
  /** Daily forecast weather data API response */
  daily: DailyForecast[];
  /** National weather alerts data from major national weather warning systems */
  alerts: {
    sender_name: string;
  };
};

type MappedTempForecast = {
  min: string;
  max: string;
};

type GenericMappedForecast<T = unknown> = {
  date: string;
  description?: string;
  icon: string;
  temperature: T;
  wind: string;
  humidity: number;
};

export type MappedForecast = GenericMappedForecast<MappedTempForecast>;

export type MappedDailyForecast = GenericMappedForecast<
  Partial<MappedTempForecast> & {
    current: string;
  }
>;

export type MappedWeatherData = {
  current: MappedDailyForecast;
  forecast: MappedForecast[];
};
