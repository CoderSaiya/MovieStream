import { MovieType } from "@/types/movie"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { MovieTooltip } from "./MovieTooltip";

export function MovieGrid({ movies, title }: { movies: MovieType[]; title: string }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [hoveredAnime, setHoveredAnime] = useState<number | null>(null)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        const slider = scrollRef.current;
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        if (slider) {
            const handleMouseDown = (e: MouseEvent) => {
                isDown = true
                setIsScrolling(true)
                slider.classList.add('active')
                startX = e.pageX - slider.offsetLeft
                scrollLeft = slider.scrollLeft
            }

            const handleMouseLeave = () => {
                isDown = false
                setIsScrolling(false)
                slider.classList.remove('active')
            }

            const handleMouseUp = () => {
                isDown = false
                setIsScrolling(false)
                slider.classList.remove('active')
            }

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDown) return
                e.preventDefault()
                const x = e.pageX - slider.offsetLeft
                const walk = (x - startX) * 2
                slider.scrollLeft = scrollLeft - walk
            }

            slider.addEventListener('mousedown', handleMouseDown)
            slider.addEventListener('mouseleave', handleMouseLeave)
            slider.addEventListener('mouseup', handleMouseUp)
            slider.addEventListener('mousemove', handleMouseMove)

            return () => {
                slider.removeEventListener('mousedown', handleMouseDown)
                slider.removeEventListener('mouseleave', handleMouseLeave)
                slider.removeEventListener('mouseup', handleMouseUp)
                slider.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, []);
    return (
        <section className="w-full py-12 md:py-16" data-aos="fade-down">
            <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10 mb-12">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <Link href="/more" className="text-sm text-red-500 hover:underline">
                        Xem thêm
                    </Link>
                </div>
                <div
                    ref={scrollRef}
                    className="flex space-x-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scrollbar-hide"
                    data-aos="fade-up">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative"
                            onMouseEnter={() => !isScrolling && setHoveredAnime(movie.id)}
                            onMouseLeave={() => setHoveredAnime(null)}
                        >
                            <Link href={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <div className="relative h-[180px] w-[120px] sm:h-[240px] sm:w-[160px] md:h-[280px] md:w-[200px]">
                                    <Image
                                        src={movie.image}
                                        alt={movie.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="episode-badge">Tập {movie.episode}</div>
                                    <div className="absolute left-2 top-2 rounded-lg bg-yellow-500 px-2 py-1 text-xs font-bold">
                                        ⭐ {movie.rating}
                                    </div>
                                </div>
                                <div className="mt-2 space-y-1">
                                    <h3 className="line-clamp-2 text-sm font-semibold">{movie.title}</h3>
                                    <p className="views-count text-xs sm:text-sm">Lượt xem: {movie.views}</p>
                                </div>
                            </Link>
                            {hoveredAnime === movie.id && !isScrolling && (
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
                    ))}
                </div>
            </div>
        </section>
    )
}