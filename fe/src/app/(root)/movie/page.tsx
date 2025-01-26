"use client"

import { useState, useEffect } from "react"
import type { MovieType } from "@/types/movie"
import { motion } from "framer-motion"
import {FilterSort} from "@/components/Filter/FilterSort";
import {MovieCard} from "@/components/Filter/MovieCard";

const DUMMY_MOVIES: MovieType[] = [
    {
        id: 1,
        title: "Doraemon: Nobita's New Dinosaur",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
        date: "12/12",
        views: 5699,
        rating: 9.3,
        genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    },
    {
        id: 2,
        title: "Doraemon: Nobita's New Dinosaur",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
        date: "12/12",
        views: 5699,
        rating: 9.3,
        genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    },
    {
        id: 3,
        title: "Doraemon: Nobita's New Dinosaur",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
        date: "12/12",
        views: 5699,
        rating: 9.3,
        genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    },
    {
        id: 4,
        title: "Doraemon: Nobita's New Dinosaur",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
        date: "12/12",
        views: 5699,
        rating: 9.3,
        genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    },
    {
        id: 5,
        title: "Doraemon: Nobita's New Dinosaur",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
        date: "12/12",
        views: 5699,
        rating: 9.3,
        genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    },
    {
        id: 6,
        title: "Doraemon: Nobita's New Dinosaur",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
        date: "12/12",
        views: 5699,
        rating: 9.3,
        genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    },
]

export default function MovieList() {
    const [movies, setMovies] = useState<MovieType[]>(DUMMY_MOVIES)
    const [sortBy, setSortBy] = useState("popularity")
    const [filterGenre, setFilterGenre] = useState("All")

    const allGenres = Array.from(new Set(DUMMY_MOVIES.flatMap((movie) => movie.genres)))

    useEffect(() => {
        let filteredMovies = [...DUMMY_MOVIES]

        if (filterGenre !== "All") {
            filteredMovies = filteredMovies.filter((movie) => movie.genres.includes(filterGenre))
        }

        switch (sortBy) {
            case "date":
                filteredMovies.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
                break
            case "views":
                filteredMovies.sort((a, b) => Number(b.views) - Number(a.views))
                break
            case "rating":
                filteredMovies.sort((a, b) => Number(b.rating) - Number(a.rating))
                break
            default: // popularity
                filteredMovies.sort((a, b) => Number(b.views) * Number(b.rating) - Number(a.views) * Number(a.rating))
        }

        setMovies(filteredMovies)
    }, [sortBy, filterGenre])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-4xl font-bold text-gray-900"
                >
                    Discover Movies
                </motion.h1>
                <FilterSort onSortChange={setSortBy} onGenreChange={setFilterGenre} genres={allGenres} />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4"
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}