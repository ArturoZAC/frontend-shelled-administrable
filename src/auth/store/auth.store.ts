import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { authStatus, User } from "../interfaces/user.interface";
import { loginAction } from "../actions/login.action";
import { renewTokenAction } from "../actions/renewToken.action";

interface AuthState {
  token?: string | null;
  user?: User | null;
  authStatus: authStatus;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  renewToken: () => Promise<boolean>;
}

const storeAuth: StateCreator<AuthState & AuthActions> = (set) => ({
  user: null,
  token: null,
  authStatus: "checking",
  login: async (email: string, password: string) => {
    set({ authStatus: "checking" });
    try {
      const data = await loginAction(email, password);
      set({
        token: data.token,
        user: data.user,
        authStatus: "authenticated",
      });
      return true;
    } catch {
      set({
        token: null,
        user: null,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
  logout: () => {
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },
  renewToken: async () => {
    set({ authStatus: "checking" });
    try {
      const data = await renewTokenAction();
      set({
        token: data.token,
        user: data.user,
        authStatus: "authenticated",
      });
      return true;
    } catch {
      set({
        token: null,
        user: null,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
});

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(storeAuth, {
    name: "auth-storage",
  })
);
