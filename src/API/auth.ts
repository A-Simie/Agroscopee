import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  google_id: string | null;
  name: string;
  created_at: string;
  updated_at: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  error?: string;
  message?: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthUser | null> => {
  try {
    const response = await api.post<{ user: AuthUser; token: string }>(
      "/api/auth/login",
      payload
    );

    const { user, token } = response.data;

    localStorage.setItem("AgroAccessToken", token);
    localStorage.setItem("AgroScopeUser", JSON.stringify(user));

    toast.success("Login successful. Welcome back to AgroScope!");

    return user;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message =
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      "Unable to login. Please try again.";

    toast.error(message);
    return null;
  }
};

export const signupUser = async (
  payload: SignupPayload
): Promise<AuthUser | null> => {
  try {
    const response = await api.post<{ user: AuthUser; token: string }>(
      "/api/auth/signup",
      payload
    );

    const { user, token } = response.data;

    localStorage.setItem("AgroAccessToken", token);
    localStorage.setItem("AgroScopeUser", JSON.stringify(user));

    toast.success("Account created! Welcome to AgroScope!");
    return user;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message =
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      "Unable to create account. Please try again.";
    toast.error(message);
    return null;
  }
};

export const signupWithGoogle = (): void => {
  const apiUrl =
    import.meta.env.VITE_AGROSCOPE_API_URL || "http://localhost:4000";
  const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
  window.location.href = `${baseUrl}/api/auth/google`;
};

export const loginWithGoogle = (): void => {
  const apiUrl =
    import.meta.env.VITE_AGROSCOPE_API_URL || "http://localhost:4000";
  const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
  window.location.href = `${baseUrl}/api/auth/google`;
};

export const updateProfile = async (data: {
  name?: string;
  email?: string;
}): Promise<AuthUser | null> => {
  try {
    const response = await api.patch<AuthUser>("/api/auth/profile", data);

    localStorage.setItem("AgroScopeUser", JSON.stringify(response.data));

    toast.success("Profile updated successfully!");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message =
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      "Failed to update profile";
    toast.error(message);
    return null;
  }
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<boolean> => {
  try {
    await api.patch("/api/auth/password", data);
    toast.success("Password changed successfully!");
    return true;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response?.status === 401) {
      const message =
        axiosError.response?.data?.error ??
        "Session expired. Please login again.";
      toast.error(message);

      if (message.includes("expired") || message.includes("Invalid token")) {
        localStorage.removeItem("AgroAccessToken");
        localStorage.removeItem("AgroScopeUser");
        window.location.href = "/login";
      }
      return false;
    }

    const message =
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      "Failed to change password";
    toast.error(message);
    return false;
  }
};

export const setPassword = async (password: string): Promise<boolean> => {
  try {
    await api.post("/api/auth/password/set", { password });
    toast.success(
      "Password set successfully! You can now login with email and password."
    );
    return true;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message =
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      "Failed to set password";
    toast.error(message);
    return false;
  }
};

export const deleteAccount = async (password?: string): Promise<boolean> => {
  try {
    await api.delete("/api/auth/account", { data: { password } });
    toast.success("Account deleted successfully");
    localStorage.removeItem("AgroAccessToken");
    localStorage.removeItem("AgroScopeUser");
    return true;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message =
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      "Failed to delete account";
    toast.error(message);
    return false;
  }
};
