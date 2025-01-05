'use client'

import { useState } from "react"
import { FileText, Users, Play, ImageIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

const tabs = [
  { id: 'info', label: 'Movie information', icon: FileText },
  { id: 'characters', label: 'Characters', icon: Users },
  { id: 'trailer', label: 'Trailer', icon: Play },
  { id: 'images', label: 'Images', icon: ImageIcon },
]

export function MovieTab() {
  const [activeTab, setActiveTab] = useState('info')

  return (
    <div className="border-b border-gray-800">
      <div className="container">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium",
                  activeTab === tab.id
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}