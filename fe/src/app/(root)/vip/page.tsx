'use client'

import { PricingCard } from '@/components/Vip/PricingCard'
import { useState } from 'react'

export default function VipPage() {
    const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly')

    const plans = {
        free: {
            name: 'Free',
            price: '0đ',
            description: 'For Beginners',
            features: [
                { text: 'Watch movies with ads', included: true },
                { text: '480p video quality', included: true },
            ],
        },
        vip: {
            name: 'VIP',
            price: period === 'monthly' ? '49.000đ' : '499.000đ',
            description: 'The best movie viewing experience',
            features: [
                { text: 'No ads', included: true },
                { text: 'HD video quality', included: true },
                { text: 'Update new movie', included: true },
                { text: 'Create a favorites list', included: true },
                { text: 'Watch unlimited movies', included: true },
                { text: 'Preview upcoming movies', included: true },
                { text: 'Download movie to your device', included: true },
                { text: 'Priority Support', included: true },
            ],
        },
        svip: {
            name: 'SVIP',
            price: period === 'monthly' ? '79.000đ' : '799.000đ',
            description: 'For advanced users',
            features: [
                { text: 'No ads', included: true },
                { text: 'FHD video quality', included: true },
                { text: 'Update new movie', included: true },
                { text: 'Create a favorites list', included: true },
                { text: 'Watch unlimited movies', included: true },
                { text: 'Preview upcoming movies', included: true },
                { text: 'Download movie to your device', included: true },
                { text: 'Priority Support', included: true },
            ],
        },
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-20">
            <div className="container px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl" data-aos="fade-down">
                        Upgrade account
                    </h1>
                    <p className="mt-4 text-gray-600" data-aos="fade-left">
                        Experience movies in the best quality and without ads
                    </p>
                </div>

                <div className="mt-8 flex justify-center" data-aos="fade-right">
                    <div className="inline-flex items-center rounded-full border border-gray-300 bg-white p-1 shadow-md">
                        <button
                            onClick={() => setPeriod('monthly')}
                            className={`rounded-full px-4 py-2 text-sm transition-colors ${period === 'monthly'
                                ? 'bg-red-600 text-white'
                                : 'text-gray-400 hover:text-red-500'
                                }`}
                        >
                            By month
                        </button>
                        <button
                            onClick={() => setPeriod('yearly')}
                            className={`rounded-full px-4 py-2 text-sm transition-colors ${period === 'yearly'
                                ? 'bg-red-600 text-white'
                                : 'text-gray-400 hover:text-red-500'
                                }`}
                        >
                            By year{' '}
                            <span className={`text-xs ${period === 'monthly' ? ' text-red-500' : 'text-white'}`}>Save 15%</span>
                        </button>
                    </div>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div data-aos="fade-up" data-aos-delay={200}>
                        <PricingCard
                            {...plans.free}
                            period={period === 'monthly' ? 'month' : 'year'}
                            buttonText="In use"
                            buttonVariant="default"
                        />
                    </div>
                    <div data-aos="fade-up" data-aos-delay={400}>
                        <PricingCard
                            {...plans.vip}
                            period={period === 'monthly' ? 'month' : 'year'}
                            buttonVariant="premium"
                            popular
                        />
                    </div>
                    <div data-aos="fade-up" data-aos-delay={600}>
                        <PricingCard
                            {...plans.svip}
                            period={period === 'monthly' ? 'month' : 'year'}
                            buttonVariant="ultimate"
                        />
                    </div>
                </div>

                <div className="mt-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: 'No advertising',
                                description: 'Watch movies smoothly without being bothered by ads',
                            },
                            {
                                title: 'FHD Quality',
                                description: 'Experience movie in the best video quality',
                            },
                            {
                                title: 'Download',
                                description: 'Watch offline anytime, anywhere without internet',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 200}>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-sm text-gray-600" data-aos="zoom-in-up">
                        Have questions? {' '}
                        <a href="#" className="text-red-500 hover:text-red-400">
                            Contact us
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}