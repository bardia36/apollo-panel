import { ActhDto } from "@/types/auth";
import { create } from "zustand";

type AuthStore = {
  auth: ActhDto | null;
  setAuth: (value?: ActhDto) => void;
  removeAuth: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (value) => set(() => ({ auth: value })),
  removeAuth: () => set({ auth: null }),
}));

export default useAuthStore;
