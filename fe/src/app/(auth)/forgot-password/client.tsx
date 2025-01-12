'use client'

import { EmailCheckForm } from '@/components/Forgot/EmailCheckForm'
import { ForgotForm } from '@/components/Forgot/ForgotForm'
import React, { useState } from 'react'

export function ForgotClient() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        // gọi api mẫu (update sau)
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsLoading(false)
        setIsSubmitted(true)
    }

    const handleRetry = () => {
        setEmail('')
        setIsSubmitted(false)
    };

    if (isSubmitted) {
        return (
            <EmailCheckForm onRetry={handleRetry} />
        )
    }
    return (
        <ForgotForm setEmail={setEmail} onSubmit={handleSubmit} email={email} isLoading={isLoading} />
    )
}