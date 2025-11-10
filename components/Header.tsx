"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User, Settings } from "lucide-react"

export function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="text-xl font-bold text-foreground">TickBuzz</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              href="/movies"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/theaters"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Theaters
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
            <Link href="/admin">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}
