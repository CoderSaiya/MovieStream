'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/AuthLayout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { notification } from 'antd'
import '@ant-design/v5-patch-for-react-19'

export default function ResetPasswordClient() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (password !== confirmPassword) {
            notification.warning({
                message: 'Password does not match',
                showProgress: true,
                pauseOnHover: true,
            });
            return
        }
        setIsLoading(true)

        // call api (update sau)

        setIsLoading(false)
        router.push('/reset-confirmation')
    }

    return (
        <AuthLayout
            title="Reset password"
            subtitle="Enter your new password"
        >
            <form onSubmit={onSubmit} className="space-y-4 text-white" data-aos="fade-up">
                <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm new password</Label>
                    <Input
                        id="confirmPassword"
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}
                    Continue
                </Button>
            </form>
        </AuthLayout>
    )
}