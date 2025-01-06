'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Download } from 'lucide-react'

const servers = [
    { id: 'du', name: 'DU', color: 'bg-red-600 hover:bg-red-700' },
    { id: 'fb', name: 'FB', color: 'bg-green-600 hover:bg-green-700' },
    { id: 'hdx', name: 'HDX(ADS)', color: 'bg-green-500 hover:bg-green-600' },
]

export function ServerSelection() {
    const [activeServer, setActiveServer] = useState('du')

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-center gap-4">
                <Download className="h-5 w-5" />
                <span className="text-lg font-medium">Downloads</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {servers.map((server) => (
                    <button
                        key={server.id}
                        onClick={() => setActiveServer(server.id)}
                        className={cn(
                            "rounded px-4 py-2 font-medium text-white transition-colors",
                            server.color,
                            activeServer === server.id ? 'ring-2 ring-white' : ''
                        )}
                    >
                        {server.name}
                    </button>
                ))}
            </div>
            <div className="rounded-lg bg-red-600 p-4 text-center text-sm text-white">
                Save the address bit.ly/movieflix to access the website fastest when blocked
            </div>
        </div>
    )
}