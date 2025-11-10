import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Star, Calendar, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"
import moviesData from "@/data/movies.json"
import theatersData from "@/data/theaters.json"
import showtimesData from "@/data/showtimes.json"
import { notFound } from "next/navigation"
import { MovieDetailClient } from "./MovieDetailClient"

interface MovieDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params

  const movie = moviesData.find((m) => m.id === id)
  if (!movie) {
    notFound()
  }

  // Get showtimes for this movie
  const movieShowtimes = showtimesData.filter((showtime) => showtime.movieId === id)

  // Group showtimes by theater
  const showtimesByTheater = movieShowtimes.reduce(
    (acc, showtime) => {
      const theater = theatersData.find((t) => t.id === showtime.theaterId)
      if (theater) {
        if (!acc[theater.id]) {
          acc[theater.id] = {
            theater,
            showtimes: [],
          }
        }
        acc[theater.id].showtimes.push(showtime)
      }
      return acc
    },
    {} as Record<string, { theater: any; showtimes: any[] }>,
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="container max-w-screen-2xl px-4 py-4">
          <Link href="/movies">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Movies
            </Button>
          </Link>
        </div>

        {/* Movie Hero Section */}
        <section className="relative">
          <div className="container max-w-screen-2xl px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="lg:col-span-1">
                <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{movie.title}</h1>

                  {/* Movie Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{movie.rating}</span>
                      <span className="text-muted-foreground">/10</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{movie.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span>{movie.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genre.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed">{movie.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showtimes Section */}
        <section className="bg-muted/30 py-12">
          <div className="container max-w-screen-2xl px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Showtimes & Theaters</h2>

            {Object.keys(showtimesByTheater).length > 0 ? (
              <div className="space-y-6">
                {Object.values(showtimesByTheater).map(({ theater, showtimes }) => (
                  <Card key={theater.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground">{theater.name}</h3>
                        <p className="text-muted-foreground">{theater.location}</p>
                      </div>
                      <MovieDetailClient showtimes={showtimes} theater={theater} movie={movie} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No showtimes available</h3>
                  <p className="text-muted-foreground">Check back later for updated showtimes</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
