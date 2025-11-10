import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Film } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <Film className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Movie Not Found</h1>
            <p className="text-muted-foreground">The movie you're looking for doesn't exist or has been removed.</p>
          </div>
          <div className="space-y-3">
            <Link href="/movies">
              <Button className="bg-red-600 hover:bg-red-700">Browse All Movies</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
