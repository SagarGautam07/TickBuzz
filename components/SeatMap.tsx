"use client"

import { Button } from "@/components/ui/button"
import { cn, formatPrice } from "@/lib/utils"
import { useBooking, type Seat } from "@/context/BookingContext"

interface SeatMapProps {
  seats: Seat[]
}

export function SeatMap({ seats }: SeatMapProps) {
  const { state, dispatch } = useBooking()

  // Group seats by row
  const seatsByRow = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = []
      }
      acc[seat.row].push(seat)
      return acc
    },
    {} as Record<string, Seat[]>,
  )

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
    return cn("w-8 h-8 rounded-t-lg border-2 text-xs font-medium transition-all duration-200", {
      "bg-green-600 border-green-700 text-white hover:bg-green-700 cursor-pointer": status === "available",
      "bg-red-600 border-red-700 text-white cursor-not-allowed": status === "booked",
      "bg-blue-600 border-blue-700 text-white hover:bg-blue-700 cursor-pointer": status === "selected",
    })
  }

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="text-center">
        <div className="mx-auto w-3/4 h-2 bg-gradient-to-r from-transparent via-muted-foreground to-transparent rounded-full mb-2" />
        <p className="text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seat Grid */}
      <div className="space-y-3">
        {Object.entries(seatsByRow)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([row, rowSeats]) => (
            <div key={row} className="flex items-center justify-center gap-2">
              {/* Row Label */}
              <div className="w-6 text-center text-sm font-medium text-muted-foreground">{row}</div>

              {/* Seats */}
              <div className="flex gap-1">
                {rowSeats
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <Button
                      key={seat.id}
                      variant="ghost"
                      size="sm"
                      className={getSeatClassName(seat)}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === "booked"}
                      title={`Seat ${seat.row}${seat.number} - ${formatPrice(seat.price)}`}
                    >
                      {seat.number}
                    </Button>
                  ))}
              </div>

              {/* Row Label (Right) */}
              <div className="w-6 text-center text-sm font-medium text-muted-foreground">{row}</div>
            </div>
          ))}
      </div>

      {/* Seat Count Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Click on available seats to select them</p>
        <p className="mt-1">
          {state.selectedSeats.length > 0
            ? `${state.selectedSeats.length} seat${state.selectedSeats.length !== 1 ? "s" : ""} selected`
            : "No seats selected"}
        </p>
      </div>
    </div>
  )
}
