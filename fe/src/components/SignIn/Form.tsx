'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Mail } from 'lucide-react'

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
                            autoComplete="current-password"
                            disabled={isLoading}
                            className="bg-gray-800/50"
                        />
                        <Button className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                            {isLoading && (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            )}
                            Sign in
                        </Button>
                    </div>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-gray-400">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-4 text-white">
                <Button className="bg-gray-800/50 hover:bg-gray-800">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                </Button>
                <Button className="bg-gray-800/50 hover:bg-gray-800">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                <Link href="/auth/reset-password" className="text-gray-400 hover:text-white">
                    Forgot password?
                </Link>
            </div>
            <div className="text-center text-sm">
                <span className="text-gray-400">Don&apos;t have an account? </span>
                <Link href="/auth/sign-up" className="text-red-500 hover:text-red-400">
                    Sign up now
                </Link>
            </div>
        </div>
    )
}