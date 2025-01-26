'use client'

import Link from "next/link";
import {Menu, Search, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
            data-aos="fade-down">
            <div className="container px-4 mx-auto">
                {/* Desktop Navigation */}
                <div className="flex h-14 items-center justify-between lg:justify-start">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">MovieFlix</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-4 lg:hidden">
                        <Button variant="ghost" size="icon">
                            <Search className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <X className="h-4 w-4"/>
                            ) : (
                                <Menu className="h-4 w-4"/>
                            )}
                        </Button>
                    </div>

                    {/* Desktop Menu Items */}
                    <div className="hidden lg:flex flex-1 items-center">
                        <div className="flex items-center space-x-6 text-sm font-medium ml-8">
                            <Link
                                href="/movie"
                                className="transition hover:text-foreground/80"
                            >
                                Movies
                            </Link>
                            <Link
                                href="/tv-shows"
                                className="transition hover:text-foreground/80"
                            >
                                TV Shows
                            </Link>
                            <Link href="/new" className="transition hover:text-foreground/80">
                                New & Popular
                            </Link>
                            <Link
                                href="/my-list"
                                className="transition hover:text-foreground/80"
                            >
                                My List
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Right Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Search className="h-4 w-4"/>
                        </Button>
                        <Link href="/sign-in">
                            <Button>Sign In</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/movies"
                                className="text-sm font-medium transition hover:text-foreground/80"
                                onClick={() => setIsOpen(false)}
                            >
                                Movies
                            </Link>
                            <Link
                                href="/tv-shows"
                                className="text-sm font-medium transition hover:text-foreground/80"
                                onClick={() => setIsOpen(false)}
                            >
                                TV Shows
                            </Link>
                            <Link
                                href="/new"
                                className="text-sm font-medium transition hover:text-foreground/80"
                                onClick={() => setIsOpen(false)}
                            >
                                New & Popular
                            </Link>
                            <Link
                                href="/my-list"
                                className="text-sm font-medium transition hover:text-foreground/80"
                                onClick={() => setIsOpen(false)}
                            >
                                My List
                            </Link>
                            <div className="pt-4">
                                <Link href="/sign-in">
                                    <Button className="w-full">Sign In</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
