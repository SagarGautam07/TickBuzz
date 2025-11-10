import { SeatSelectionClient } from "./SeatSelectionClient"
import moviesData from "@/data/movies.json"
import theatersData from "@/data/theaters.json"
import showtimesData from "@/data/showtimes.json"
import { notFound } from "next/navigation"

interface SeatSelectionPageProps {
  params: Promise<{ id: string; showId: string }>
}

export default async function SeatSelectionPage({ params }: SeatSelectionPageProps) {
  const { id: movieId, showId } = await params

  const movie = moviesData.find((m) => m.id === movieId)
  const showtime = showtimesData.find((s) => s.id === showId)
  const theater = showtime ? theatersData.find((t) => t.id === showtime.theaterId) : null

  if (!movie || !showtime || !theater) {
    notFound()
  }

  return <SeatSelectionClient movie={movie} showtime={showtime} theater={theater} movieId={movieId} showId={showId} />
}
