import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center" data-aos="fade-down">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">MovieFlix</span>
        </Link>
        <div className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/movies" className="transition hover:text-foreground/80">
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
          <Link href="/my-list" className="transition hover:text-foreground/80">
            My List
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button>Sign In</Button>
        </div>
      </div>
    </nav>
  );
}
