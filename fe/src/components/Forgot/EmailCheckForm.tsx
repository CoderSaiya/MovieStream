import React from 'react'
import AuthLayout from '../AuthLayout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function EmailCheckForm({
    onRetry,
}: { onRetry: () => void; }) {
    return (
        <AuthLayout
            title="Kiểm tra email của bạn"
            subtitle="Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn."
        >
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                    Không nhận được email? Kiểm tra thư mục spam hoặc{' '}
                    <button
                        onClick={onRetry}
                        className="text-red-500 hover:text-red-400"
                    >
                        thử lại
                    </button>
                </p>
            </div>
            <div className="mt-6">
                <Link
                    href="/sign-in"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại đăng nhập
                </Link>
            </div>
        </AuthLayout>
    )
}