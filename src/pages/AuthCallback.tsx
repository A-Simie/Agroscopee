import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Authentication failed. Please try again.");
      toast.error("Authentication failed");
      setTimeout(() => navigate("/signup"), 2000);
      return;
    }

    if (token && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));

        localStorage.setItem("AgroAccessToken", token);
        localStorage.setItem("AgroScopeUser", JSON.stringify(user));

        toast.success(`Welcome back, ${user.name}!`);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Error parsing user data:", err);
        setError("Failed to process authentication");
        setTimeout(() => navigate("/signup"), 2000);
      }
    } else {
      setError("Invalid authentication response");
      setTimeout(() => navigate("/signup"), 2000);
    }
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-sm text-slate-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
        <p className="text-slate-300 font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}
