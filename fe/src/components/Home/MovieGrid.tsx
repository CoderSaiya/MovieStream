import {MovieType} from "@/types/movie"
import Link from "next/link"
import {useEffect, useMemo, useRef, useState} from "react";
import {TrendingGrid} from "@/components/Home/TrendingGrid";
import {MovieCard} from "@/components/Home/MovieCard";

export function MovieGrid({movies, title}: { movies: MovieType[]; title: string }) {
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

    const renderMovieItem = useMemo(() => {
        return movies.map((movie, index) =>
            title.toUpperCase() === "TRENDING MOVIES" ? (
                <TrendingGrid
                    key={movie.id}
                    movie={movie}
                    index={index}
                    isHovered={hoveredAnime === movie.id}
                    isScrolling={isScrolling}
                    onMouseEnter={() => !isScrolling && setHoveredAnime(movie.id)}
                    onMouseLeave={() => setHoveredAnime(null)}
                />
            ) : (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    index={index}
                    isHovered={hoveredAnime === movie.id}
                    isScrolling={isScrolling}
                    onMouseEnter={() => !isScrolling && setHoveredAnime(movie.id)}
                    onMouseLeave={() => setHoveredAnime(null)}
                />
            )
        )
    }, [movies, title, hoveredAnime, isScrolling])
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
                    data-aos="fade-up"
                >
                    {renderMovieItem}
                </div>
            </div>
        </section>
    )
}