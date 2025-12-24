import { api } from "@/lib/api";

export interface WeatherData {
  summary: string;
  temperatureC: number;
  humidity: number;
  precipitationMm: number;
  cloudCover: number;
}

export interface ForecastDay {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
}

export interface WeatherForecast {
  current: WeatherData;
  daily: ForecastDay[];
}

export const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const response = await api.get<WeatherData>(
    `/api/weather/current?lat=${lat}&lon=${lon}`
  );

  return response.data;
};

export const getWeatherForecast = async (
  lat: number,
  lon: number
): Promise<WeatherForecast> => {
  const response = await api.get<WeatherForecast>(
    `/api/weather/forecast?lat=${lat}&lon=${lon}`
  );

  return response.data;
};
