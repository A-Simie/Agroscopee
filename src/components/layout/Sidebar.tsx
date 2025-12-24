import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Cloud,
  Store,
  MessagesSquare,
  User,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  // { name: "Disease Scanner", path: "/scanner", icon: Search },
  { name: "Weather", path: "/weather", icon: Cloud },
  { name: "Market", path: "/market", icon: Store },
  { name: "Community", path: "/community", icon: MessagesSquare },
  { name: "Account", path: "/profile", icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-56 h-screen bg-white k:bg-gray-900 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-4 flex-col fixed left-0 top-0">
        {/* Logo Section */}
        <div className="mb-8">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            AgroScope
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            AI Crop Assistant
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={name}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        <button
          className="w-full bg-red-700 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-4"
          onClick={() => {
            localStorage.removeItem("AgroAccessToken");
            localStorage.removeItem("AgroScopeUser");
            navigate("/login");
          }}
        >
          Log out
        </button>
      </aside>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-2 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={name}
                to={path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-green-700 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
