import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  accessToken: string | null;
};

type Actions = {
  setAccessToken: (accessToken: string | null) => void;
};

export const useSessionStore = create(
  persist<State & Actions>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) =>
        set((state) => ({ ...state, accessToken: token })),
    }),
    { name: "user-session" }
  )
);
