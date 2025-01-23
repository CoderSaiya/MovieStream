import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    totalRatings: number
    showCount?: boolean
}

export function StarRating({ rating, totalRatings, showCount = true }: StarRatingProps) {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 10; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
        } else if (i === fullStars && hasHalfStar) {
            stars.push(
                <div key={i} className="relative">
                    <Star className="h-5 w-5 text-gray-400" />
                    <div className="absolute inset-0 overflow-hidden w-1/2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            )
        } else {
            stars.push(<Star key={i} className="h-5 w-5 text-gray-400" />)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                {stars}
            </div>
            {showCount && (
                <span className="text-sm text-gray-400">
                    (Review {(rating ?? 0.0).toFixed(1)}/10 from {totalRatings} member(s))
                </span>
            )}
        </div>
    )
}