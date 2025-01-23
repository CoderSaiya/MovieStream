import Image from "next/image"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/StarRating"
import { Clock, Eye } from 'lucide-react'
import { MovieDetailsProps } from "@/types"
import { useParams, useRouter } from "next/navigation"

export function MovieDetails({
    title,
    alternateTitle,
    synopsis,
    coverImage,
    rating,
    totalRatings,
    releaseDate,
    viewCount,
    episodes,
    schedule,
    status,
    quality,
    ageRating,
    language,
    studio,
    season,
    genres,
    director,
    country,
    followers
}: MovieDetailsProps) {
    const router = useRouter();
    const param = useParams();
    const id = param.id as string;

    console.log(router);

    return (
        <div className="container py-6">
            <div className="relative mb-6">
                <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Cover Image */}
                    <div className="relative mb-4 flex-shrink-0 md:mb-0">
                        <div className="relative h-[400px] w-[300px] overflow-hidden rounded-lg" data-aos="fade-right">
                            <Image
                                src={coverImage}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <Button className="flex px-20 py-2 my-2 w-full bg-red-600 hover:bg-red-700"
                            data-aos="fade-up"
                            onClick={() => {
                                router.push(`${id}/watch`);
                            }}
                        >
                            WATCH NOW
                        </Button>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="mb-2 text-3xl font-bold" data-aos="fade-down">{title}</h1>
                        <h2 className="mb-4 text-xl text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-xl" data-aos="fade-left">{alternateTitle}</h2>

                        <div className="mb-4" data-aos="fade-right">
                            <StarRating rating={rating} totalRatings={totalRatings} />
                        </div>

                        <div className="mb-4 flex items-center gap-4 text-sm text-gray-400" data-aos="fade-left">
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {releaseDate}
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {viewCount.toLocaleString()} Views
                            </div>
                        </div>

                        <p className="mb-6 text-gray-500" data-aos="fade-right">{synopsis}</p>

                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2" data-aos="fade-left">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">New episode:</span>
                                    <span>{episodes.current}_END</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Schedule:</span>
                                    <span>{schedule}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Status:</span>
                                    <span>{status}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Gerne:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {genres.map((genre) => (
                                            <span
                                                key={genre}
                                                className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Director:</span>
                                    <span>{director}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Quality:</span>
                                    <span className="rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                                        {quality}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Rating:</span>
                                    <span>{ageRating}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Language:</span>
                                    <span>{language}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Studio:</span>
                                    <span>{studio.join(", ")}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Season:</span>
                                    <span>{season}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Nation:</span>
                                    <span>{country}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-400">Followers:</span>
                                    <span>{followers}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}