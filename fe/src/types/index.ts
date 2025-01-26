import { LucideIcon } from "lucide-react";
import { User } from "./user";
import type {MovieType} from "@/types/movie";

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
    episode?: number
    date?: string | "Ongoing"
    year?: number | "Ongoing"
    quality?: string | "Ongoing"
    synopsis?: string | "Ongoing"
    studio?: string | "Ongoing"
    genres: string[]
    cast?: string | "Ongoing"
}

export interface MovieDetailsProps {
    title: string
    alternateTitle: string
    synopsis: string
    coverImage: string
    rating: number
    totalRatings: number
    releaseDate: string
    viewCount: number
    episodes: {
        current: number
        total: number
    }
    schedule: string
    status: string
    quality: string
    ageRating: string
    language: string
    studio: string[]
    season: string
    genres: string[]
    director: string
    country: string
    followers: number
}

export interface BreadcrumbItem {
    label: string
    href: string
}

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    checkPermission: (action: string, subject: string) => boolean
    isAuthenticated: boolean
}

interface OkResponse<T> {
    status: "OK";
    data: T;
}

interface NotFoundResponse {
    status: "NotFound";
    message: string;
}

interface BadRequestResponse {
    status: "BadRequest";
    message: string;
}

export type ApiResponse<T> = OkResponse<T> | NotFoundResponse | BadRequestResponse;

export interface MovieCardProps {
    movie: MovieType
    index: number
    isHovered: boolean
    isScrolling: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
}