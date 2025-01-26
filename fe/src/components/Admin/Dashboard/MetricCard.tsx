import { Card } from "@/components/ui/card"
import { Film, PlayCircle, Users, Clock } from "lucide-react"

const metrics = [
    {
        label: "Total Movies",
        value: "2,526",
        change: "+24 new",
        icon: Film,
    },
    {
        label: "TV Series",
        value: "832",
        change: "+12 new",
        icon: PlayCircle,
    },
    {
        label: "Active Users",
        value: "45.2K",
        change: "+5.2%",
        icon: Users,
    },
    {
        label: "Watch Time",
        value: "125K hrs",
        change: "+12.3%",
        icon: Clock,
    },
]

export function MetricCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, key) => (
                <Card key={metric.label} className="bg-black/20 backdrop-blur-xl border-0 text-white p-4" data-aos="fade-down" data-aos-delay={key * 200} >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-400">{metric.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                            <p className="text-sm text-purple-400 mt-1">{metric.change}</p>
                        </div>
                        <metric.icon className="h-5 w-5 text-purple-400" />
                    </div>
                </Card>
            ))}
        </div>
    )
}