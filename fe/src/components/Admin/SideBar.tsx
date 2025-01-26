'use client'

import Link from "next/link"
import {Home, PlayCircle, Film, TrendingUp, Bookmark, History, Star, Settings, Search, Menu, X} from "lucide-react"
import {useState} from "react";

const menuItems = [
    {
        section: "Menu",
        items: [
            {name: "Home", icon: Home, path: "/admin"},
            {name: "Discover", icon: Search, path: "/admin/discover"},
            {name: "Trending", icon: TrendingUp, path: "/admin/trending"},
        ],
    },
    {
        section: "Library",
        items: [
            {name: "Movies", icon: Film, path: "/admin/movies"},
            {name: "TV Series", icon: PlayCircle, path: "/admin/tv-series"},
            {name: "Watchlist", icon: Bookmark, path: "/admin/watchlist"},
        ],
    },
    {
        section: "Personal",
        items: [
            {name: "History", icon: History, path: "/admin/history"},
            {name: "Favorites", icon: Star, path: "/admin/favorites"},
            {name: "Settings", icon: Settings, path: "/admin/settings"},
        ],
    },
]

export function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-500 rounded-full text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
            </button>
            <div
                className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-black/20 backdrop-blur-xl text-white border-r border-white/10 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `} data-aos="fade-right"
            >
                <div className="flex items-center gap-2 p-4">
                    <div className="h-8 w-8 rounded bg-purple-500">
                        <Film className="h-8 w-8 p-1.5 text-white"/>
                    </div>
                    <h1 className="text-xl font-bold">MovieFlix</h1>
                </div>
                <nav className="space-y-6 p-4">
                    {menuItems.map((section) => (
                        <div key={section.section}>
                            <h2 className="text-xs uppercase text-gray-400 font-semibold px-3 mb-2">{section.section}</h2>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <item.icon
                                            className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors"/>
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    )
}