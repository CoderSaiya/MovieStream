import { Card } from "@/components/ui/card"
import { Star, Clock } from "lucide-react"

const trendingMovies = [
    {
        id: 1,
        title: "Doraemon: Nobita's New Dinosaur",
        genre: "Kids",
        rating: 9.3,
        duration: "2h 46m",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
        id: 2,
        title: "Doraemon: Nobita's New Dinosaur",
        genre: "Kids",
        rating: 9.3,
        duration: "2h 46m",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
        id: 3,
        title: "Doraemon: Nobita's New Dinosaur",
        genre: "Kids",
        rating: 9.3,
        duration: "2h 46m",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
]

export function TrendingMovies() {
    return (
        <Card className="bg-black/20 backdrop-blur-xl border-0 text-white p-4" data-aos="fade-up" data-aos-delay="300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Trending Movies</h3>
            </div>
            <div className="grid gap-4">
                {trendingMovies.map((movie) => (
                    <div key={movie.id} className="flex gap-4 group cursor-pointer">
                        <div className="relative w-[120px] h-[68px] rounded-lg overflow-hidden">
                            <img
                                src={movie.image || "/placeholder.svg"}
                                alt={movie.title}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold group-hover:text-purple-400 transition-colors">{movie.title}</h4>
                            <p className="text-sm text-gray-400">{movie.genre}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span>{movie.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{movie.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}