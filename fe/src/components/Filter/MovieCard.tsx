import Image from "next/image"
import Link from "next/link"
import type {MovieType} from "@/types/movie"
import {motion} from "framer-motion"

export function MovieCard({movie}: { movie: MovieType }) {
    return (
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3}}>
            <Link href={`/movie/${movie.id}`} className="group block">
                <div
                    className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                    <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                            <div className="mt-2 flex items-center justify-between">
                                <span
                                    className="text-sm text-gray-300">{new Date(movie.date || "").getFullYear()}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-yellow-400">⭐ {Number(movie.rating).toFixed(1)}</span>
                                    <span
                                        className="text-sm text-gray-300">{movie.views?.toLocaleString()} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}