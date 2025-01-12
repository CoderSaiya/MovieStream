import React from 'react'
import AuthLayout from '../AuthLayout'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'

export function ForgotForm({
    email,
    isLoading,
    setEmail,
    onSubmit,
}: {
    email: string,
    isLoading: boolean,
    setEmail: (email: string) => void,
    onSubmit: (event: React.FormEvent) => void
}) {
    return (
        <AuthLayout
            title="Quên mật khẩu"
            subtitle="Nhập email của bạn để đặt lại mật khẩu"
        >
            <div data-aos="fade-up">
                <form onSubmit={onSubmit} className="space-y-4 text-white">
                    <div className="space-y-2">
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                        {isLoading && (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}
                        Gửi hướng dẫn đặt lại
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <Link href="/sign-in" className="text-gray-400 hover:text-white">
                        Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}