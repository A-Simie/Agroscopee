import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { updateProfile, type AuthUser } from "@/API/auth";

export default function EditProfile() {
  const navigate = useNavigate();

  const user = useMemo<AuthUser | null>(() => {
    const raw = localStorage.getItem("AgroScopeUser");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }, []);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updated = await updateProfile({ name, email });

    setIsSubmitting(false);

    if (updated) {
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
              Edit profile
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Update your AgroScope account information
            </p>
          </div>
        </div>

        <Card className="rounded-2xl border border-emerald-100/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm">
          <CardContent className="py-6 px-6 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This is how your name will appear across AgroScope
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Used for login and important notifications
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Save changes"}
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
