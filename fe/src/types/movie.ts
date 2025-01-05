export interface MovieType {
    id: number;
    title: string;
    description?: string;
    episode: number;
    views?: string;
    rating?: number;
    image: string;
    genres: string[];
    studio?: string;
    date?: string;
    year?: number;
    isHD?: boolean;
    synopsis?: string;
    cast?: string;
    quality?: string;
}