"use client"

import { useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Share2, Calendar, Clock, MapPin, Ticket, Mail, Smartphone, Home } from "lucide-react"
import Link from "next/link"
import { useBooking } from "@/context/BookingContext"
import { formatPrice } from "@/lib/utils"
import { notFound } from "next/navigation"

interface ConfirmationClientProps {
  bookingId: string
}

export function ConfirmationClient({ bookingId }: ConfirmationClientProps) {
  const { state, dispatch } = useBooking()

  // Redirect if no booking data
  useEffect(() => {
    if (!state.bookingId || state.bookingId !== bookingId) {
      // In a real app, you might fetch booking data from an API here
      if (!state.selectedMovie || !state.selectedShowtime || state.selectedSeats.length === 0) {
        notFound()
      }
    }
  }, [bookingId, state])

  if (!state.selectedMovie || !state.selectedShowtime || !state.selectedTheater || state.selectedSeats.length === 0) {
    notFound()
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleNewBooking = () => {
    dispatch({ type: "RESET_BOOKING" })
  }

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert("Ticket download feature would be implemented here")
  }

  const handleShareBooking = () => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: `TickBuzz - ${state.selectedMovie.title}`,
        text: `I just booked tickets for ${state.selectedMovie.title}!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Booking link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your movie tickets have been successfully booked</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Movie & Show Info */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Movie Info */}
                  <div className="flex gap-4">
                    <div className="h-24 w-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={state.selectedMovie.poster || "/placeholder.svg"}
                        alt={state.selectedMovie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-1">{state.selectedMovie.title}</h3>
                      <p className="text-muted-foreground mb-2">{state.selectedMovie.genre.join(", ")}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary">{state.selectedMovie.rating}</Badge>
                        <span className="text-muted-foreground">{state.selectedMovie.duration} minutes</span>
                        <span className="text-muted-foreground">{state.selectedMovie.language}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Show Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{state.selectedTheater.name}</p>
                          <p className="text-sm text-muted-foreground">{state.selectedTheater.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{formatDate(state.selectedShowtime.date)}</p>
                          <p className="text-sm text-muted-foreground">Show Date</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{formatTime(state.selectedShowtime.time)}</p>
                          <p className="text-sm text-muted-foreground">Show Time</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">
                            {state.selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(", ")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {state.selectedSeats.length} Seat{state.selectedSeats.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Before You Go</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Arrive 15 minutes before showtime</li>
                        <li>• Bring a valid ID for verification</li>
                        <li>• No outside food or drinks allowed</li>
                        <li>• Mobile tickets accepted</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Cancellation Policy</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Free cancellation up to 2 hours before show</li>
                        <li>• Refunds processed within 3-5 business days</li>
                        <li>• Contact support for assistance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Summary */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Booking ID</span>
                        <span className="font-mono text-foreground">{bookingId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Booking Date</span>
                        <span className="text-foreground">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      {state.selectedSeats.map((seat) => (
                        <div key={seat.id} className="flex justify-between text-sm">
                          <span className="text-foreground">
                            Seat {seat.row}
                            {seat.number}
                          </span>
                  <span className="text-foreground">{formatPrice(seat.price)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total Paid</span>
                      <span className="text-foreground">{formatPrice(state.totalPrice)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button onClick={handleDownloadTicket} className="w-full bg-red-600 hover:bg-red-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Tickets
                  </Button>

                  <Button onClick={handleShareBooking} variant="outline" className="w-full bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Booking
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/" onClick={handleNewBooking}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </Button>
                    </Link>
                    <Link href="/movies" onClick={handleNewBooking}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Ticket className="h-4 w-4 mr-2" />
                        Book More
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Contact Info */}
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-3">Need Help?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">support@tickbuzz.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">1-800-TICKBUZZ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
