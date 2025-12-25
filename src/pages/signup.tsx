import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Leaf } from "lucide-react";
import { signupUser, signupWithGoogle } from "@/API/auth";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await signupUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (!user) {
        setError("Unable to create account. Please check your details.");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-slate-950">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/85 border border-white/30 shadow-2xl rounded-2xl">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  Create your AgroScope account
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Start detecting crop diseases and tracking farm health.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <Input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
                className="h-10 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="h-10 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500"
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="h-10 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500"
              />
              <Input
                name="confirm"
                type="password"
                placeholder="Confirm password"
                value={form.confirm}
                onChange={handleChange}
                required
                className="h-10 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500"
              />

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
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <span className="relative px-2 text-[11px] uppercase tracking-wide text-slate-400 bg-white dark:bg-slate-900">
                or continue with
              </span>
            </div>

            <Button
              type="button"
              onClick={signupWithGoogle}
              variant="outline"
              className="w-full h-10 text-sm flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <FcGoogle size={18} />
              Sign up with Google
            </Button>

            <div className="text-center text-sm">
              <p className="text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-medium underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
