import { Card } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
    { month: "Jan", newVisitor: 4, oldVisitor: 2 },
    { month: "Feb", newVisitor: 8, oldVisitor: 3 },
    { month: "Mar", newVisitor: 12, oldVisitor: 4 },
    { month: "Apr", newVisitor: 9, oldVisitor: 5 },
    { month: "May", newVisitor: 14, oldVisitor: 6 },
    { month: "Jun", newVisitor: 11, oldVisitor: 4 },
    { month: "Jul", newVisitor: 13, oldVisitor: 5 },
    { month: "Aug", newVisitor: 10, oldVisitor: 3 },
    { month: "Sep", newVisitor: 12, oldVisitor: 4 },
]

export function TrafficChart() {
    return (
        <Card className="bg-white/10 backdrop-blur-lg border-0 text-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Site Traffic</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-400" />
                        <span className="text-sm">New Visitor</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-200" />
                        <span className="text-sm">Old Visitor</span>
                    </div>
                </div>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(0,0,0,0.8)",
                                border: "none",
                                borderRadius: "4px",
                                color: "white",
                            }}
                        />
                        <Area type="monotone" dataKey="newVisitor" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="oldVisitor" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}