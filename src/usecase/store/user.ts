"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/domain/types";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        const res = await fetch("/api/users/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Login failed");
        }

        const user = await res.json();
        set({ user });
        return user;
      },
      logout: async () => {
        try {
          await fetch("/api/users/logout", {
            method: "POST",
            credentials: "include",
          });
        } finally {
          set({ user: null });
        }
      },
    }),
    {
      name: "user-session",
    }
  )
);
