"use client"
import { useParams } from "react-router-dom"
import { SeatSelectionClient } from "../components/SeatSelectionClient"
import { moviesData } from "../data/movies"
import { theatersData } from "../data/theaters"
import { showtimesData } from "../data/showtimes"

export default function BookingPage() {
  const { movieId, showId } = useParams<{ movieId: string; showId: string }>()

  const movie = moviesData.find((m) => m.id === movieId)
  const showtime = showtimesData.find((s) => s.id === showId)
  const theater = showtime ? theatersData.find((t) => t.id === showtime.theaterId) : null

  if (!movie || !showtime || !theater) {
    return <div>Booking not found</div>
  }

  return <SeatSelectionClient movie={movie} showtime={showtime} theater={theater} movieId={movieId!} showId={showId!} />
}
