import { create } from "zustand";
import { AppState } from "../types";

const useStore = create<AppState>((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;