import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HeroBanner } from "@/components/HeroBanner"
import { SearchBar } from "@/components/SearchBar"
import { MovieGrid } from "@/components/MovieGrid"
import moviesData from "@/data/movies.json"

export default function HomePage() {
  const allMovies = moviesData // All movies for hero banner carousel
  const upcomingMovies = moviesData.slice(1, 5) // Next 4 movies for grid

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroBanner movies={allMovies} />
        <div className="container max-w-screen-2xl px-4 py-8 space-y-12">
          <SearchBar />
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Now Showing</h2>
            <MovieGrid movies={upcomingMovies} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
