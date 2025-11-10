"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Ticket, Clock, MapPin, Calendar, Trash2 } from "lucide-react"
import { useBooking } from "@/context/BookingContext"
import { formatPrice } from "@/lib/utils"

export function BookingSummary() {
  const { state, dispatch } = useBooking()

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

  const clearAllSeats = () => {
    dispatch({ type: "CLEAR_SEATS" })
  }

  if (!state.selectedMovie || !state.selectedShowtime || !state.selectedTheater) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-6 text-center">
          <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select a movie and showtime to continue</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Booking Summary</span>
          {state.selectedSeats.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllSeats}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Movie Info */}
        <div className="flex gap-3">
          <div className="h-16 w-12 rounded overflow-hidden flex-shrink-0">
            <img
              src={state.selectedMovie.poster || "/placeholder.svg"}
              alt={state.selectedMovie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{state.selectedMovie.title}</h3>
            <p className="text-sm text-muted-foreground">{state.selectedMovie.genre.join(", ")}</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {state.selectedMovie.rating}
              </Badge>
              <span className="text-xs text-muted-foreground">• {state.selectedMovie.duration} min</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Show Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{state.selectedTheater.name}</p>
              <p className="text-muted-foreground">{state.selectedTheater.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{formatDate(state.selectedShowtime.date)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{formatTime(state.selectedShowtime.time)}</span>
          </div>
        </div>

        <Separator />

        {/* Selected Seats */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Selected Seats</h4>
          {state.selectedSeats.length > 0 ? (
            <div className="space-y-2">
              {state.selectedSeats.map((seat) => (
                <div key={seat.id} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">
                    Seat {seat.row}
                    {seat.number}
                  </span>
                  <span className="font-medium text-foreground">{formatPrice(seat.price)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No seats selected</p>
          )}
        </div>

        {state.selectedSeats.length > 0 && (
          <>
            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-lg text-foreground">{formatPrice(state.totalPrice)}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
