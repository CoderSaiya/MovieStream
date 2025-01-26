import {useState} from "react"
import {motion} from "framer-motion"

interface FilterSortProps {
    onSortChange: (sort: string) => void
    onGenreChange: (genre: string) => void
    genres: string[]
}

export function FilterSort({onSortChange, onGenreChange, genres}: FilterSortProps) {
    const [activeGenre, setActiveGenre] = useState("All")

    const handleGenreClick = (genre: string) => {
        setActiveGenre(genre)
        onGenreChange(genre)
    }

    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Genres</h2>
                <select
                    onChange={(e) => onSortChange(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    <option value="popularity">Sort by Popularity</option>
                    <option value="date">Sort by Release Date</option>
                    <option value="views">Sort by Views</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>
            <div className="flex flex-wrap gap-2">
                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={() => handleGenreClick("All")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activeGenre === "All" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    All
                </motion.button>
                {genres.map((genre) => (
                    <motion.button
                        key={genre}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() => handleGenreClick(genre)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            activeGenre === genre ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {genre}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}