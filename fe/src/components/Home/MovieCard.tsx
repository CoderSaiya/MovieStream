import Link from "next/link";
import Image from "next/image"
import {MovieCardProps} from "@/types";
import {MovieTooltip} from "@/components/MovieTooltip";

export function MovieCard({movie, isHovered, isScrolling, onMouseEnter, onMouseLeave}: MovieCardProps) {
    return (
        <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link href={`/movie/${movie.id}`} className="movie-card">
                <div className="relative h-[180px] w-[120px] sm:h-[240px] sm:w-[160px] md:h-[280px] md:w-[200px]">
                    <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover"/>
                    {movie.episode && (
                        <div className="episode-badge">Tập {movie.episode}</div>
                    )}
                    {movie.rating && (
                        <div className="absolute left-2 top-2 rounded-lg bg-yellow-500 px-2 py-1 text-xs font-bold">
                            ⭐ {movie.rating}
                        </div>
                    )}
                </div>
                <div className="mt-2 space-y-1">
                    <h3 className="line-clamp-2 text-sm font-semibold">{movie.title}</h3>
                    <p className="views-count text-xs sm:text-sm">Lượt xem: {movie.views}</p>
                </div>
            </Link>
            {isHovered && !isScrolling && <MovieTooltip {...movie} />}
        </div>
    )
}