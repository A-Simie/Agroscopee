import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import WeatherInsights from "@/pages/Weather";
import DiseasesResult from "@/pages/DiseasesAnalysis";
import NotFound from "@/pages/NotFound";
import Community from "@/pages/Community";
import Market from "@/pages/Market";
import Chatbot from "@/pages/ChatBot";
import Login from "@/pages/login";
import Profile from "@/pages/Profile";
import Signup from "@/pages/signup";
import LandingPage from "@/pages/LandingPage";
import { ProtectedRoute } from "@/router/ProtectedRoute";
import AuthCallback from "@/pages/AuthCallback";
import EditProfile from "@/pages/EditProfile";
import ChangePassword from "@/pages/ChangePassword";
import SetPassword from "@/pages/SetPassword";
import DeleteAccount from "@/pages/DeleteAccount";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="weather" element={<WeatherInsights />} />
          <Route path="disease-analysis" element={<DiseasesResult />} />
          <Route path="community" element={<Community />} />
          <Route path="market" element={<Market />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="profile" element={<Profile />} />

          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route path="/profile/set-password" element={<SetPassword />} />
          <Route path="/profile/delete-account" element={<DeleteAccount />} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
