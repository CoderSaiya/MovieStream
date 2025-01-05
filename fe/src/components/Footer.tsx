'use client'

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react'

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="bg-[#1a1a1a] text-gray-400 w-full" data-aos="fade-right">
            <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
                {/* Navigation and Social Links */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <nav className="flex flex-wrap gap-6">
                        <Link href="/watch" className="hover:text-white">WATCH</Link>
                        <Link href="/donate" className="hover:text-white">DONATE</Link>
                        <Link href="/discord" className="hover:text-white">DISCORD</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="https://facebook.com" className="hover:text-white">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="https://instagram.com" className="hover:text-white">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com" className="hover:text-white">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="https://youtube.com" className="hover:text-white">
                            <Youtube className="h-5 w-5" />
                        </Link>
                        <button
                            onClick={scrollToTop}
                            className="rounded bg-[#95c840] p-2 text-white hover:bg-[#7ba834]"
                        >
                            <ArrowUp className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Tags */}
                {/* <div className="mb-6 text-center text-sm">
                    <span className="text-gray-500">
                        kanefusa fansub , one piece, vua hải tặc đảo hải tặc, thám tử lừng danh conan, hoạt hình trung quốc
                    </span>
                </div> */}

                {/* Contact Info */}
                <div className="mb-4 text-center text-sm">
                    <p>Contact Advertising: <a href="mailto:movieflix@gmail.com" className="hover:text-white">movieflix@gmail.com</a></p>
                </div>

                {/* Copyright */}
                <div className="mb-6 text-center text-sm">
                    <p>© Copyright 2025 MovieFlix.Net. All rights reserved.</p>
                </div>

                {/* Disclaimer */}
                <div className="space-y-4 text-center text-sm">
                    <h3 className="text-lg font-semibold text-gray-300">Disclaimer</h3>
                    <p>
                        This website provides anime content for entertainment purposes only and is{" "}
                        <span className="text-gray-300">not responsible</span> for any advertising content, third party links displayed on our website.
                    </p>
                    <p>
                        All information and images on the website are collected from the internet. We are not responsible for any content. If you or your organization has any problems related to the content displayed on the website, please contact us for resolution.
                    </p>
                </div>
            </div>
        </footer>
    )
}