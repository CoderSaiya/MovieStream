import Image from 'next/image'
import { Card } from "@/components/ui/card"

interface PaymentMethodCardProps {
    type: 'visa' | 'mastercard'
    last4: string
    expiry: string
}

export function PaymentMethodCard({ type, last4, expiry }: PaymentMethodCardProps) {
    return (
        <Card className="relative flex h-[120px] w-[220px] items-end overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"
                style={{
                    maskImage: 'radial-gradient(circle at 50% 0%, black 40%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black 40%, transparent 70%)'
                }}
            />
            <div className="relative flex w-full items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                        {type === 'visa' ? 'Visa' : 'Mastercard'} •••• {last4}
                    </p>
                    <p className="text-xs text-gray-500">Hết hạn {expiry}</p>
                </div>
                <Image
                    src={type === 'visa' ? '/images/visa.png' : '/images/mastercard.png'}
                    alt={type === 'visa' ? 'Visa' : 'Mastercard'}
                    width={40}
                    height={25}
                    className="h-auto w-10"
                />
            </div>
        </Card>
    )
}