import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const WeatherCard: React.FC = () => {
  return (
    <Card className="p-6 dark:bg-gray-900 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Today&apos;s forecast
          </p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">
            Ilorin • 29°C
          </h3>
          <p className="text-sm text-muted-foreground">
            Humidity 80%, partly cloudy. Good conditions for fungal spread.
          </p>
        </div>
        <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
          <Sun className="h-8 w-8 text-amber-500" />
        </div>
      </div>

      <Button variant="secondary" className="w-full text-sm">
        View 5‑day farm weather
      </Button>
    </Card>
  );
};
