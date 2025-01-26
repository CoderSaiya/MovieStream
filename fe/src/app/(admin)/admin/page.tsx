"use client"

import {WatchTimeChart} from "@/components/Admin/Dashboard/WatchTimeChart";
import {TrendingMovies} from "@/components/Admin/Dashboard/TrendingMovie";
import {MetricCards} from "@/components/Admin/Dashboard/MetricCard";

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
            <MetricCards/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WatchTimeChart/>
                </div>
                <div>
                    <TrendingMovies/>
                </div>
            </div>
        </div>
    )
}