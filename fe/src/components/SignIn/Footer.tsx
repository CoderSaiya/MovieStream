'use client'

import Link from 'next/link'
import React from 'react'

export function Footer() {
    return (
        <>
            <div className="mt-4 text-center text-sm">
                <Link href="/reset-password" className="text-gray-400 hover:text-white">
                    Forgot password?
                </Link>
            </div>
            <div className="text-center text-sm">
                <span className="text-gray-400">Don&apos;t have an account? </span>
                <Link href="/sign-up" className="text-red-500 hover:text-red-400">
                    Sign up now
                </Link>
            </div>
        </>
    )
}