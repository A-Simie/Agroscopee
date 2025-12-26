import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Eye, EyeOff, Info } from "lucide-react";
import { setPassword } from "@/API/auth";

export default function SetPassword() {
  const navigate = useNavigate();

  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    const success = await setPassword(password);

    setIsSubmitting(false);

    if (success) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/profile")}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Set password
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add password login to your Google account
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Why set a password?
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              You signed up with Google. Setting a password lets you login with
              email and password too, giving you more flexibility.
            </p>
          </div>
        </div>

        <Card className="rounded-2xl border border-emerald-100/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm">
          <CardContent className="py-6 px-6 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  New password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting ? "Setting..." : "Set password"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/profile")}
                  className="h-10 px-6 border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
