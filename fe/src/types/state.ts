import { create } from "zustand";

export interface UserState {
    user: string | null;
    setUser: (name: string) => void;
    clearUser: () => void;
}

export interface AppState {
    count: number;
    increase: () => void;
    decrease: () => void;
}

export interface VideoPlayerState {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    showOverlay: boolean;
    error: string | null;
    isLoading: boolean;

    // Actions
    setIsPlaying: (isPlaying: boolean) => void;
    setIsMuted: (isMuted: boolean) => void;
    setVolume: (volume: number) => void;
    setCurrentTime: (currentTime: number) => void;
    setDuration: (duration: number) => void;
    setShowOverlay: (showOverlay: boolean) => void;
    setError: (error: string | null) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useVideoPlayerStore = create<VideoPlayerState>((set) => ({
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