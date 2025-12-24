import { useState } from "react";
import {
  Search,
  CloudRain,
  CloudDrizzle,
  Sun,
  Cloud,
  Droplets,
} from "lucide-react";

interface ForecastDay {
  day: string;
  icon: string;
  precipitation: string;
  temp: string;
}

export default function WeatherInsights() {
  const [searchQuery, setSearchQuery] = useState("");

  const forecastData: ForecastDay[] = [
    { day: "Today", icon: "sun", precipitation: "10%", temp: "22° / 14°" },
    { day: "Mon", icon: "sun", precipitation: "0%", temp: "24° / 15°" },
    { day: "Tue", icon: "cloud", precipitation: "20%", temp: "23° / 16°" },
    { day: "Wed", icon: "sun", precipitation: "10%", temp: "25° / 17°" },
    { day: "Thu", icon: "rain", precipitation: "80%", temp: "21° / 15°" },
    { day: "Fri", icon: "drizzle", precipitation: "60%", temp: "20° / 14°" },
    { day: "Sat", icon: "sun", precipitation: "0%", temp: "22° / 15°" },
  ];

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case "sun":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "cloud":
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case "drizzle":
        return <CloudDrizzle className="w-6 h-6 text-blue-400" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
          Weather Insights
        </h1>

        {/* Search Bar */}
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

      {/* Current Weather Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6 border border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Sunnyvale Farm, CA
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Partly Cloudy
            </p>
          </div>
          <Sun className="w-12 h-12 text-yellow-500" />
        </div>

        <div className="mb-6">
          <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1">
            22°C
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Feels like 20°C
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Humidity
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              65%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Wind Speed
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              10 km/h
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              UV Index
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              High
            </p>
          </div>
        </div>

        {/* Planting Advisory */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Droplets className="w-4 h-4 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                Maize Planting Advisory
              </h3>
              <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                Optimal Planting Window: This Wednesday Afternoon
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                Conditions are ideal. Soil temperatures are favorable and light
                rain is forecasted for Thursday, ensuring good moisture for
                germination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          7-Day Forecast
        </h3>

        <div className="space-y-3">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                {day.day}
              </div>
              <div className="flex-1 flex justify-center">
                {getWeatherIcon(day.icon)}
              </div>
              <div
                className={`w-16 text-center text-sm font-medium ${
                  day.precipitation === "0%" ? "text-gray-400" : "text-blue-600"
                }`}
              >
                {day.precipitation}
              </div>
              <div className="w-24 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                {day.temp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
