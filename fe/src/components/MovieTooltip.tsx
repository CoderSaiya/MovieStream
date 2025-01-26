import { Badge } from "@/components/ui/badge"
import { MovieTooltipProps } from "@/types"

export function MovieTooltip({
    title,
    episode,
    date,
    year,
    quality,
    synopsis,
    studio,
    genres,
    cast
}: MovieTooltipProps) {
    return (
        <div className="absolute -top-4 left-full z-50 ml-4 w-[300px] translate-y-0 transform">
            <div className="rounded-lg bg-white p-4 shadow-xl">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-gray-900">{title}</h3>
                        {quality && (
                            <Badge variant="destructive" className="bg-red-600">
                                {quality}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            {episode}
                        </Badge>
                        <span>{date}</span>
                        <span>{year}</span>
                    </div>

                    <p className="text-sm text-gray-600">{synopsis}</p>

                    <div className="space-y-1">
                        <div className="flex items-start gap-2 text-sm">
                            <span className="font-medium text-gray-900">Studio:</span>
                            <span className="text-gray-600">{studio}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                            <span className="font-medium text-gray-900">Genre:</span>
                            <div className="flex flex-wrap gap-1">
                                {genres.map((genre) => (
                                    <Badge key={genre} variant="outline" className="text-xs">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                            <span className="font-medium text-gray-900">Performer:</span>
                            <span className="text-gray-600">{cast}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}