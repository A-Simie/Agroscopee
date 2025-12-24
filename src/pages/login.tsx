import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import cornfield from "@/assets/cornfield.jpeg";
import { loginUser } from "@/API/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const user = await loginUser({ email, password });
    console.log(user);

    setIsSubmitting(false);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 bg-slate-950"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.85), rgba(15,23,42,0.95)), url(${cornfield})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/80 border border-white/30 shadow-2xl rounded-2xl">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  Welcome back to AgroScope
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Log in to monitor farms, insights, and weather intelligence.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 pr-10 focus-visible:ring-emerald-500"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-2 py-1.5">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-10 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <p>Secure access to your farm data.</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-600 hover:text-emerald-700 font-medium underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
