"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
    { day: "Mon", movies: 4.5, series: 2.5 },
    { day: "Tue", movies: 3.8, series: 3.2 },
    { day: "Wed", movies: 5.2, series: 4.1 },
    { day: "Thu", movies: 4.8, series: 3.8 },
    { day: "Fri", movies: 6.5, series: 5.2 },
    { day: "Sat", movies: 7.2, series: 6.8 },
    { day: "Sun", movies: 6.8, series: 6.2 },
]

export function WatchTimeChart() {
    return (
        <Card className="bg-black/20 backdrop-blur-xl border-0 text-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Watch Time (Hours)</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500" />
                        <span className="text-sm">Movies</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-300" />
                        <span className="text-sm">TV Series</span>
                    </div>
                </div>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(0,0,0,0.8)",
                                border: "none",
                                borderRadius: "4px",
                                color: "white",
                            }}
                        />
                        <Area type="monotone" dataKey="movies" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="series" stroke="#d8b4fe" fill="#d8b4fe" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}