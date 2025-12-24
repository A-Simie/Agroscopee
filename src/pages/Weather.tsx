import { useState, useEffect } from "react";
import {
  Search,
  CloudRain,
  CloudDrizzle,
  Sun,
  Cloud,
  Droplets,
  Loader2,
} from "lucide-react";
import { getWeatherForecast, type WeatherForecast } from "@/API/weather";

export default function WeatherInsights() {
  const [searchQuery, setSearchQuery] = useState("");
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ lat: 6.52, lon: 3.38 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setLocation({ lat: 6.52, lon: 3.38 });
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchForecast = async () => {
      setIsLoading(true);
      try {
        const data = await getWeatherForecast(location.lat, location.lon);
        setForecast(data);
      } catch (error) {
        console.error("Forecast error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [location]);

  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0) {
      return <Sun className="w-6 h-6 text-yellow-500" />;
    }
    if (weatherCode <= 3) {
      return <Cloud className="w-6 h-6 text-gray-400" />;
    }
    if (weatherCode <= 67) {
      return <CloudDrizzle className="w-6 h-6 text-blue-400" />;
    }
    return <CloudRain className="w-6 h-6 text-blue-500" />;
  };

  const getDayName = (dateString: string, index: number): string => {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  if (isLoading || !forecast) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
          Weather Insights
        </h1>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your farm, city, or zip code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6 border border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Your Farm Location
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Conditions
            </p>
          </div>
          {getWeatherIcon(0)}
        </div>

        <div className="mb-6">
          <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1">
            {Math.round(forecast.current.temperatureC)}°C
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time field conditions
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Humidity
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {Math.round(forecast.current.humidity)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Rain
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {forecast.current.precipitationMm.toFixed(1)} mm
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Cloud Cover
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {Math.round(forecast.current.cloudCover)}%
            </p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Droplets className="w-4 h-4 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                Farm Advisory
              </h3>
              <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                {forecast.current.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          7-Day Forecast
        </h3>

        <div className="space-y-3">
          {forecast.daily.map((day, index) => (
            <div
              key={day.date}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                {getDayName(day.date, index)}
              </div>
              <div className="flex-1 flex justify-center">
                {getWeatherIcon(day.weatherCode)}
              </div>
              <div
                className={`w-16 text-center text-sm font-medium ${
                  day.precipitationProbability === 0
                    ? "text-gray-400"
                    : "text-blue-600"
                }`}
              >
                {day.precipitationProbability}%
              </div>
              <div className="w-24 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
