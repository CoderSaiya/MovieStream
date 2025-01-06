import { create } from "zustand";
import { UserState, VideoPlayerState } from "@/types/state";

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (name) => set(() => ({ user: name })),
  clearUser: () => set(() => ({ user: null })),
}));

const useVideoPlayerStore = create<VideoPlayerState>((set) => ({
  isPlaying: false,
  isMuted: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
  showOverlay: true,
  error: null,
  isLoading: false,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setVolume: (volume) => set({ volume }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setShowOverlay: (showOverlay) => set({ showOverlay }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
export { useUserStore, useVideoPlayerStore };