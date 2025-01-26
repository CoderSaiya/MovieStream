import Image from "next/image"
import Link from "next/link"
import {MovieTooltip} from "@/components/MovieTooltip";
import {MovieCardProps} from "@/types";

export function TrendingGrid({
                                      movie,
                                      index,
                                      isHovered,
                                      isScrolling,
                                      onMouseEnter,
                                      onMouseLeave,
                                  }: MovieCardProps) {
    return (
        <div className="relative group" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link href={`/movie/${movie.id}`} className="block relative">
                <div
                    className="relative h-[180px] w-[120px] sm:h-[240px] sm:w-[160px] md:h-[280px] md:w-[200px] rounded-lg overflow-hidden">
                    <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Large number overlay */}
                    <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0">
            <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[120px] text-white opacity-90">
              {index + 1}
            </span>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
                        Tập {movie.episode}
                    </div>
                    <div className="absolute left-2 top-2 rounded-lg bg-yellow-500 px-2 py-1 text-xs font-bold">
                        ⭐ {movie.rating}
                    </div>
                </div>
                <div className="mt-2 space-y-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{movie.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Views: {movie.views?.toLocaleString()}</p>
                </div>
            </Link>
            {isHovered && !isScrolling && (
                <MovieTooltip
                    title={movie.title}
                    episode={movie.episode}
                    date={movie.date}
                    year={movie.year}
                    quality={movie.quality}
                    synopsis={movie.synopsis}
                    studio={movie.studio}
                    genres={movie.genres}
                    cast={movie.cast}
                />
            )}
        </div>
    )
}