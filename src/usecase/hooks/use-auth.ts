"use client";

import React from "react";
import { useUserStore } from "@/usecase/store";
import type { User } from "@/domain/types";

interface UseAuthResult {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthResult => {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  const isAuthenticated = React.useMemo(() => user !== null, [user]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

interface UseRequireAuthResult {
  user: User;
  logout: () => Promise<void>;
}

export const useRequireAuth = (): UseRequireAuthResult | null => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return {
    user,
    logout,
  };
};
