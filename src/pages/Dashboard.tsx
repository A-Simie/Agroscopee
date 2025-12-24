import React, { useMemo } from "react";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ScanPlantCard } from "@/components/ScanPlantCard";
import { WeatherCard } from "@/components/WeatherCard";
import { RecentScans } from "@/components/RecentScans";

const Dashboard: React.FC = () => {
  const storedUser = useMemo(() => {
    const raw = localStorage.getItem("AgroScopeUser");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as { name?: string; email: string };
    } catch {
      return null;
    }
  }, []);

  const userName =
    storedUser?.name && storedUser.name.trim().length > 0
      ? storedUser.name
      : storedUser?.email ?? "Farmer";
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 space-y-8">
        <WelcomeSection userName={userName} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ScanPlantCard />
            <RecentScans />
          </div>

          <div className="space-y-6">
            <WeatherCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
