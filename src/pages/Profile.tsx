import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, History, LogOut } from "lucide-react";

interface StoredUser {
  id: string;
  email: string;
  name?: string;
}

export default function Profile() {
  const navigate = useNavigate();

  const user = useMemo<StoredUser | null>(() => {
    const raw = localStorage.getItem("AgroScopeUser");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as StoredUser;
    } catch {
      return null;
    }
  }, []);

  const displayName =
    user?.name && user.name.trim().length > 0
      ? user.name.trim()
      : user?.email?.split("@")[0] ?? "Farmer";

  const email = user?.email ?? "no-email@agroscope.app";

  const initials =
    displayName
      .split(" ")
      .filter((part) => part.length > 0)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AG";

  const handleLogout = (): void => {
    localStorage.removeItem("AgroAccessToken");
    localStorage.removeItem("AgroScopeUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-6">
        <Card className="rounded-2xl border border-emerald-100/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm">
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-6 px-6 md:px-8">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-semibold shadow-md">
                {initials}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-400" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {displayName}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {email}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  AgroScope farmer • Disease & weather insights
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <Button
                variant="outline"
                className="h-9 px-4 text-xs border-emerald-200 dark:border-slate-700"
              >
                Edit profile
              </Button>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Manage how AgroScope personalizes your farm insights.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="py-4 px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    Change password
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Keep your AgroScope account secure.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-xs text-slate-500 hover:text-emerald-600"
              >
                Manage
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="py-4 px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <History className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    Scan history
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Review past disease scans and outcomes.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-xs text-slate-500 hover:text-emerald-600"
                onClick={() => navigate("/disease-analysis")}
              >
                View
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="h-9 px-5 text-xs font-medium text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log out of AgroScope
          </Button>
        </div>
      </div>
    </div>
  );
}
