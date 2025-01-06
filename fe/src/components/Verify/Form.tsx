'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Form() {
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                nextInput?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            prevInput?.focus()
        }
    }

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }
    return (
        <form onSubmit={onSubmit} className="space-y-6 text-white" data-aos="fade-up" data-aos-delay="200">
            <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="h-12 w-12 text-center text-lg bg-gray-800/50"
                        disabled={isLoading}
                    />
                ))}
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                Xác nhận
            </Button>
            <div className="text-center text-sm">
                <span className="text-gray-400">Không nhận được mã? </span>
                <button
                    type="button"
                    className="text-red-500 hover:text-red-400"
                    onClick={() => { }}
                    disabled={isLoading}
                >
                    Gửi lại
                </button>
            </div>
        </form>
    )
}