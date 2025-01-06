'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function Form({ genres }: { genres: string[] }) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        )
    }

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={`rounded-full px-4 py-2 text-sm transition-colors ${selectedGenres.includes(genre)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <Button
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || selectedGenres.length < 3}
            >
                {isLoading && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                Complete
            </Button>
        </form>
    )
}