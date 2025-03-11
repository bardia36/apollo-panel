import { Auth } from "@/types/auth";
import { create } from "zustand";

type AuthStore = {
  auth: Auth | null;
  setAuth: (value: Auth) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (value) => set(() => ({ auth: value })),
  removeAuth: () => set({ auth: null }),
}));

export default useAuthStore;
