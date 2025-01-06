'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Form() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className="grid gap-6 text-white">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                id="firstName"
                                placeholder="First Name"
                                disabled={isLoading}
                                className="bg-gray-800/50"
                            />
                            <Input
                                id="lastName"
                                placeholder="Last Name"
                                disabled={isLoading}
                                className="bg-gray-800/50"
                            />
                        </div>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="bg-gray-800/50"
                        />
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="bg-gray-800/50"
                        />
                        <Input
                            id="confirmPassword"
                            placeholder="Confirm password"
                            type="password"
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="bg-gray-800/50"
                        />
                        <Button className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                            {isLoading && (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            )}
                            Sign up
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-center text-sm">
                <span className="text-gray-400">Already have an account? </span>
                <Link href="/auth/sign-in" className="text-red-500 hover:text-red-400">
                    Sign in
                </Link>
            </div>
        </div>
    )
}