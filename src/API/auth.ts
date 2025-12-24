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

const extractTokenFromHeader = (
  authorizationHeader: string | undefined
): string | null => {
  if (!authorizationHeader) return null;

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;

  return token;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthUser | null> => {
  try {
    const response = await api.post<AuthUser>("/api/auth/login", payload);

    const authorizationHeader = response.headers.authorization as
      | string
      | undefined;
    const token = extractTokenFromHeader(authorizationHeader);
    console.log("authorization header:", authorizationHeader);
    if (token) {
      console.log("Storing token:", token);
      localStorage.setItem("AgroAccessToken", token);
    }

    localStorage.setItem("AgroScopeUser", JSON.stringify(response.data));
    toast.success("Login successful. Welcome back to AgroScope!");
    console.log("token", localStorage.getItem("AgroAccessToken"));
    console.log("storedUser", localStorage.getItem("AgroScopeUser"));

    return response.data;
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
    const response = await api.post<AuthUser>("/api/auth/signup", payload);

    const authorizationHeader = response.headers.authorization as
      | string
      | undefined;
    const token = extractTokenFromHeader(authorizationHeader);

    if (token) {
      localStorage.setItem("AgroAccessToken", token);
    }

    localStorage.setItem("AgroScopeUser", JSON.stringify(response.data));
    toast.success("Account created successfully. Welcome to AgroScope!");
    return response.data;
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
