import { useSessionStore } from "@/stores/use-session-store";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${useSessionStore.getState().accessToken}`,
  },
});
