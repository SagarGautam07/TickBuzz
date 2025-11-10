"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import type { Movie, Theater, Showtime } from "@/context/BookingContext"

interface ShowTimeListProps {
  showtimes: Showtime[]
  theater: Theater
  movie: Movie
  onSelectShowtime: (showtime: Showtime) => void
}

export function ShowTimeList({ showtimes, theater, movie, onSelectShowtime }: ShowTimeListProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Group showtimes by date
  const showtimesByDate = showtimes.reduce(
    (acc, showtime) => {
      if (!acc[showtime.date]) {
        acc[showtime.date] = []
      }
      acc[showtime.date].push(showtime)
      return acc
    },
    {} as Record<string, Showtime[]>,
  )

  return (
    <div className="space-y-4">
      {Object.entries(showtimesByDate).map(([date, dateShowtimes]) => (
        <div key={date} className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {formatDate(date)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {dateShowtimes.map((showtime) => (
              <Link key={showtime.id} href={`/movie/${movie.id}/booking/${showtime.id}`}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-3 flex flex-col items-center gap-1 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors bg-transparent"
                  onClick={() => onSelectShowtime(showtime)}
                >
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{formatTime(showtime.time)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <span className="font-medium">{formatPrice(showtime.price)}</span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
