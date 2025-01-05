import { LucideIcon } from "lucide-react";

export interface AppState {
    count: number;
    increase: () => void;
    decrease: () => void;
}

export interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface FeatureCardProps extends FeatureItem {
    key?: React.Key;
    delay?: number;
}

export interface MovieTooltipProps {
    title: string
    episode: number
    date?: string | "Ongoing"
    year?: number | "Ongoing"
    quality?: string | "Ongoing"
    synopsis?: string | "Ongoing"
    studio?: string | "Ongoing"
    genres: string[]
    cast?: string | "Ongoing"
}