import Link from 'next/link'
import React from 'react'


export function Footer() {
    return (
        <div className="text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link href="/sign-in" className="text-red-500 hover:text-red-400">
                Sign in
            </Link>
        </div>
    )
}