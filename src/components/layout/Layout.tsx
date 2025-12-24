import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Header } from "../Header";

export default function Layout() {
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

  const handleLogout = (): void => {
    localStorage.removeItem("AgroAccessToken");
    localStorage.removeItem("AgroScopeUser");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden">
      <Sidebar />

      <div className="hidden md:block md:w-56 flex-shrink-0"></div>

      <main className="flex-1 min-w-0 p-4 sm:p-6 pb-20 md:pb-0">
        <Header userName={userName} onLogout={handleLogout} />
        <Outlet />
      </main>
    </div>
  );
}
