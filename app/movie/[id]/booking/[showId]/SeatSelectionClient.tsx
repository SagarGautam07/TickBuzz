"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useBooking, type Seat } from "@/context/BookingContext"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils"
import seatsData from "@/data/seats.json"

interface SeatSelectionClientProps {
  movie: any
  showtime: any
  theater: any
  movieId: string
  showId: string
}

export function SeatSelectionClient({ movie, showtime, theater, movieId, showId }: SeatSelectionClientProps) {
  const router = useRouter()
  const { state, dispatch } = useBooking()
  const [availableSeats, setAvailableSeats] = useState<any[]>([])

  // Load seats data
  useEffect(() => {
    const seats = (seatsData as any)[showId] || (seatsData as any)["1"]
    setAvailableSeats(seats)
  }, [showId])

  // Set movie and showtime in context if not already set
  useEffect(() => {
    if (!state.selectedMovie || state.selectedMovie.id !== movieId) {
      dispatch({ type: "SELECT_MOVIE", payload: movie })
    }
    if (!state.selectedShowtime || state.selectedShowtime.id !== showId) {
      dispatch({
        type: "SELECT_SHOWTIME",
        payload: { showtime, theater },
      })
    }
  }, [movie, showtime, theater, movieId, showId, state, dispatch])

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return

    const isSelected = state.selectedSeats.some((s) => s.id === seat.id)

    if (isSelected) {
      dispatch({ type: "DESELECT_SEAT", payload: seat.id })
    } else {
      dispatch({ type: "SELECT_SEAT", payload: seat })
    }
  }

  const getSeatStatus = (seat: Seat) => {
    if (seat.status === "booked") return "booked"
    if (state.selectedSeats.some((s) => s.id === seat.id)) return "selected"
    return "available"
  }

  const getSeatClassName = (seat: Seat) => {
    const status = getSeatStatus(seat)
    return cn(
      "w-8 h-8 rounded border border-gray-600 text-xs font-medium transition-all duration-200 flex items-center justify-center",
      {
        "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer": status === "available",
        "bg-red-600 border-red-500 text-white cursor-not-allowed": status === "booked",
        "bg-pink-500 border-pink-400 text-white hover:bg-pink-600 cursor-pointer": status === "selected",
      },
    )
  }

  const handleProceedToCheckout = () => {
    if (state.selectedSeats.length === 0) return

    const bookingId = `TB${Date.now()}`
    dispatch({ type: "CONFIRM_BOOKING", payload: bookingId })
    router.push(`/confirmation/${bookingId}`)
  }

  const renderSeatLayout = () => {
    const seatsByRow = availableSeats.reduce(
      (acc, seat) => {
        if (!acc[seat.row]) {
          acc[seat.row] = []
        }
        acc[seat.row].push(seat)
        return acc
      },
      {} as Record<string, Seat[]>,
    )

    return (
      <div className="space-y-6">
        {/* Top rows A and B - straight layout */}
        <div className="space-y-3">
          {["A", "B"].map((row) => (
            <div key={row} className="flex justify-center gap-1">
              {(seatsByRow[row] || [])
                .sort((a, b) => a.number - b.number)
                .map((seat) => (
                  <button
                    key={seat.id}
                    className={getSeatClassName(seat)}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === "booked"}
                    title={`Seat ${seat.row}${seat.number} - ${formatPrice(seat.price)}`}
                  >
                    {seat.row}
                    {seat.number}
                  </button>
                ))}
            </div>
          ))}
        </div>

        {/* Middle section with center aisle - C/D on left, E/F on right */}
        <div className="flex justify-center gap-20 mt-8">
          {/* Left section - C and D rows */}
          <div className="space-y-3">
            {["C", "D"].map((row) => (
              <div key={row} className="flex gap-1">
                {(seatsByRow[row] || [])
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      className={getSeatClassName(seat)}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === "booked"}
                      title={`Seat ${seat.row}${seat.number} - ${formatPrice(seat.price)}`}
                    >
                      {seat.row}
                      {seat.number}
                    </button>
                  ))}
              </div>
            ))}
          </div>

          {/* Right section - E and F rows */}
          <div className="space-y-3">
            {["E", "F"].map((row) => (
              <div key={row} className="flex gap-1">
                {(seatsByRow[row] || [])
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      className={getSeatClassName(seat)}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === "booked"}
                      title={`Seat ${seat.row}${seat.number} - ${formatPrice(seat.price)}`}
                    >
                      {seat.row}
                      {seat.number}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with wider gap - G/H on left, I/J on right */}
        <div className="flex justify-center gap-32 mt-8">
          {/* Left side - G and H rows */}
          <div className="space-y-3">
            {["G", "H"].map((row) => (
              <div key={row} className="flex gap-1">
                {(seatsByRow[row] || [])
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      className={getSeatClassName(seat)}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === "booked"}
                      title={`Seat ${seat.row}${seat.number} - ${formatPrice(seat.price)}`}
                    >
                      {seat.row}
                      {seat.number}
                    </button>
                  ))}
              </div>
            ))}
          </div>

          {/* Right side - I and J rows */}
          <div className="space-y-3">
            {["I", "J"].map((row) => (
              <div key={row} className="flex gap-1">
                {(seatsByRow[row] || [])
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      className={getSeatClassName(seat)}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === "booked"}
                      title={`Seat ${seat.row}${seat.number} - ${formatPrice(seat.price)}`}
                    >
                      {seat.row}
                      {seat.number}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/movie/${movieId}`}>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Movie Details
            </Button>
          </Link>
        </div>

        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - Available Timings */}
          <div className="w-80">
            <Card className="bg-red-900/30 border-red-800/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Available Timings</h3>
                <div className="flex items-center gap-3 p-4 bg-red-800/30 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                  <span className="text-lg font-medium text-white">{formatTime(showtime.time)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Content - Seat Selection */}
          <div className="flex-1">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-8">Select your seat</h1>

              <div className="relative mb-12">
                <div className="w-full max-w-4xl mx-auto">
                  <div className="relative">
                    <div
                      className="h-6 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #dc2626 10%, #dc2626 90%, transparent 100%)",
                        width: "700px",
                        borderRadius: "350px 350px 0 0",
                        transform: "perspective(600px) rotateX(60deg)",
                        transformOrigin: "bottom center",
                        boxShadow: "0 4px 20px rgba(220, 38, 38, 0.3)",
                      }}
                    />
                    <div
                      className="absolute top-1 left-1/2 transform -translate-x-1/2 h-4 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #ef4444 15%, #ef4444 85%, transparent 100%)",
                        width: "600px",
                        borderRadius: "300px 300px 0 0",
                        transform: "perspective(500px) rotateX(60deg)",
                        transformOrigin: "bottom center",
                        boxShadow: "0 2px 15px rgba(239, 68, 68, 0.4)",
                      }}
                    />
                    <div
                      className="absolute top-2 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-transparent via-red-400 to-transparent"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #f87171 20%, #f87171 80%, transparent 100%)",
                        width: "500px",
                        borderRadius: "250px 250px 0 0",
                        transform: "perspective(400px) rotateX(60deg)",
                        transformOrigin: "bottom center",
                        boxShadow: "0 1px 10px rgba(248, 113, 113, 0.5)",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 font-medium mt-6">SCREEN SIDE</p>
                </div>
              </div>

              {/* Seat Layout */}
              <div className="mb-12">{renderSeatLayout()}</div>

              {/* Proceed to Checkout Button */}
              <Button
                onClick={handleProceedToCheckout}
                disabled={state.selectedSeats.length === 0}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed min-w-64"
              >
                Proceed to Checkout →
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
