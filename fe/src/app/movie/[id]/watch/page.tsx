'use client'

import { AOSInit } from '@/components/AOSInit'
import { VideoPlayer } from '@/components/Playback/VideoPlayer'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'

export default function PlaybackPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <AOSInit />
            <main className="flex-1 py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-9">
                            <VideoPlayer />
                        </div>

                        <aside className="lg:col-span-3">
                            <Sidebar />
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    )
}