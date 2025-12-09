import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { authStatus, User } from "../interfaces/user.interface";

interface AuthState {
  token?: string | null;
  user?: User | null;
  authStatus: authStatus;
}

interface AuthActions {
  login: () => void;
  logout: () => void;
}

const storeAuth: StateCreator<AuthState & AuthActions> = () => ({
  user: null,
  token: null,
  authStatus: "checking",
  login: () => {},
  logout: () => {},
});

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(storeAuth, {
    name: "auth-storage",
  })
);
