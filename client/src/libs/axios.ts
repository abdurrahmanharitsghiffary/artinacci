import { useSessionStore } from "@/stores/use-session-store";
import axios from "axios";
import { redirect } from "next/navigation";

export const publicApi = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${useSessionStore.getState().accessToken}`,
  },
});

api.interceptors.request.use((value) => {
  const token = useSessionStore.getState().accessToken;
  if (token) value.headers.Authorization = `Bearer ${token}`;
  return value;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(error, "Eerr");
    if (error?.response && error?.response?.status === 401) {
      console.log("Redirect to login");
      window.location.href = "/auth/login";
    }
  }
);
