import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { deleteAccount } from "@/API/auth";

interface StoredUser {
  id: string;
  email: string;
  google_id: string | null;
}

export default function DeleteAccount() {
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

  const hasPassword = !user?.google_id || user.google_id === null;

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (confirmation.toLowerCase() !== "delete") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    if (hasPassword && !password) {
      setError("Password is required to delete your account");
      return;
    }

    setIsSubmitting(true);

    const success = await deleteAccount(hasPassword ? password : undefined);

    setIsSubmitting(false);

    if (success) {
      navigate("/signup", { replace: true });
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
              Delete account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Permanently remove your AgroScope account
            </p>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-red-900 dark:text-red-100">
              Warning: This action cannot be undone
            </p>
            <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
              <li>
                All your plant disease scan history will be permanently deleted
              </li>
              <li>Your weather insights and saved locations will be lost</li>
              <li>You will lose access to all AgroScope features</li>
              <li>This action is immediate and irreversible</li>
            </ul>
          </div>
        </div>

        <Card className="rounded-2xl border border-red-100/60 dark:border-red-800 bg-white/90 dark:bg-slate-900/80 shadow-sm">
          <CardContent className="py-6 px-6 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {hasPassword && (
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Confirm your password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="confirmation"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Type <span className="font-bold text-red-600">DELETE</span> to
                  confirm
                </label>
                <Input
                  id="confirmation"
                  type="text"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  placeholder="Type DELETE"
                  className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  required
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This helps prevent accidental deletions
                </p>
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
                  variant="destructive"
                  className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {isSubmitting ? "Deleting..." : "Delete my account"}
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
