import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ui/ThemeToggle";

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const initial = userName?.charAt(0)?.toUpperCase() ?? "A";
  const navigate = useNavigate();
  return (
    <header className="bg-card/80 backdrop-blur border-b border-border px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight text-foreground">
              AgroScope
            </span>
            <span className="text-[11px] text-muted-foreground">
              Smart farm analytics dashboard
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full bg-muted/60 px-2 py-1.5 hover:bg-muted transition-colors border border-border/70"
                aria-label="Open user menu"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-medium">
                  {initial}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-xs font-medium text-foreground truncate max-w-[120px]">
                    {userName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Logged in
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-52"
              align="end"
              sideOffset={8}
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-medium">
                    {initial}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-none">
                      {userName}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      AgroScope Farmer
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-xs"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onLogout}
                className="text-xs text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
