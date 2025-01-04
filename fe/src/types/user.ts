export interface UserState {
    user: string | null;
    setUser: (name: string) => void;
    clearUser: () => void;
}