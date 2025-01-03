import { create } from "zustand";
import { UserState } from "@/types/user";

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (name) => set(() => ({ user: name })),
    clearUser: () => set(() => ({ user: null })),
  }));

export default useUserStore;