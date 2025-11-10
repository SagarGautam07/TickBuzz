"use client"

import { ShowTimeList } from "@/components/ShowTimeList"
import { useBooking } from "@/context/BookingContext"

interface MovieDetailClientProps {
  showtimes: any[]
  theater: any
  movie: any
}

export function MovieDetailClient({ showtimes, theater, movie }: MovieDetailClientProps) {
  const { dispatch } = useBooking()

  const handleSelectMovie = () => {
    dispatch({ type: "SELECT_MOVIE", payload: movie })
  }

  return (
    <ShowTimeList
      showtimes={showtimes}
      theater={theater}
      movie={movie}
      onSelectShowtime={(showtime) => {
        handleSelectMovie()
        dispatch({
          type: "SELECT_SHOWTIME",
          payload: { showtime, theater },
        })
      }}
    />
  )
}
