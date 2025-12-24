import { Sun, Cloud, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getCurrentWeather, type WeatherData } from "@/API/weather";

export const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocation({ lat: 6.52, lon: 3.38 });
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCurrentWeather(location.lat, location.lon);
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Unable to load weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (isLoading) {
    return (
      <Card className="p-6 dark:bg-gray-900 space-y-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="p-6 dark:bg-gray-900 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Today&apos;s forecast
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">
              Weather Unavailable
            </h3>
            <p className="text-sm text-muted-foreground">
              {error ?? "Could not fetch weather data"}
            </p>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
            <Cloud className="h-8 w-8 text-amber-500" />
          </div>
        </div>
      </Card>
    );
  }

  const Icon = weather.cloudCover > 50 ? Cloud : Sun;

  return (
    <Card className="p-6 dark:bg-gray-900 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Today&apos;s forecast
          </p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">
            Your Location • {Math.round(weather.temperatureC)}°C
          </h3>
          <p className="text-sm text-muted-foreground">
            Humidity {Math.round(weather.humidity)}%
            {weather.precipitationMm > 0 &&
              `, rainfall ${weather.precipitationMm.toFixed(1)}mm`}
            {weather.cloudCover > 70
              ? ". High disease risk—monitor crops closely."
              : ". Moderate conditions for fungal spread."}
          </p>
        </div>
        <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
          <Icon className="h-8 w-8 text-amber-500" />
        </div>
      </div>

      <Button variant="secondary" className="w-full text-sm">
        View detailed weather insights
      </Button>
    </Card>
  );
};
