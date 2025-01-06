import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PricingFeature {
    text: string
    included: boolean
}

interface PricingCardProps {
    name: string
    price: string
    period: string
    description: string
    features: PricingFeature[]
    popular?: boolean
    buttonText?: string
    buttonVariant?: 'default' | 'premium' | 'ultimate'
}

export function PricingCard({
    name,
    price,
    period,
    description,
    features,
    popular,
    buttonText = "Upgrade now",
    buttonVariant = 'default'
}: PricingCardProps) {
    return (
        <Card className={`relative flex flex-col bg-white ${popular ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-gray-200 shadow-md'}`}>
            {popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold">
                        Most popular
                    </span>
                </div>
            )}
            <CardHeader className="flex flex-col items-center space-y-2 pb-6 pt-8 text-center">
                <h3 className="text-2xl font-bold">{name}</h3>
                <div className="space-y-1">
                    <p className="text-4xl font-bold">
                        {price}
                        <span className="text-lg font-normal text-gray-400">/{period}</span>
                    </p>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
                <ul className="flex flex-1 flex-col gap-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className={`h-5 w-5 ${feature.included ? 'text-green-500' : 'text-gray-600'}`} />
                            <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    className={`w-full ${buttonVariant === 'premium'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : buttonVariant === 'ultimate'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                >
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    )
}