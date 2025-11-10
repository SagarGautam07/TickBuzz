"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Movie {
  id: string
  title: string
  poster: string
  genre: string[]
  duration: number
  language: string
  rating: number
  description: string
  releaseDate: string
}

export interface Theater {
  id: string
  name: string
  location: string
}

export interface Showtime {
  id: string
  movieId: string
  theaterId: string
  time: string
  date: string
  price: number
}

export interface Seat {
  id: string
  row: string
  number: number
  status: "available" | "booked" | "selected"
  price: number
}

export interface BookingState {
  selectedMovie: Movie | null
  selectedShowtime: Showtime | null
  selectedTheater: Theater | null
  selectedSeats: Seat[]
  totalPrice: number
  bookingId: string | null
}

type BookingAction =
  | { type: "SELECT_MOVIE"; payload: Movie }
  | { type: "SELECT_SHOWTIME"; payload: { showtime: Showtime; theater: Theater } }
  | { type: "SELECT_SEAT"; payload: Seat }
  | { type: "DESELECT_SEAT"; payload: string }
  | { type: "CLEAR_SEATS" }
  | { type: "CONFIRM_BOOKING"; payload: string }
  | { type: "RESET_BOOKING" }

const initialState: BookingState = {
  selectedMovie: null,
  selectedShowtime: null,
  selectedTheater: null,
  selectedSeats: [],
  totalPrice: 0,
  bookingId: null,
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SELECT_MOVIE":
      return {
        ...state,
        selectedMovie: action.payload,
        selectedShowtime: null,
        selectedTheater: null,
        selectedSeats: [],
        totalPrice: 0,
      }
    case "SELECT_SHOWTIME":
      return {
        ...state,
        selectedShowtime: action.payload.showtime,
        selectedTheater: action.payload.theater,
        selectedSeats: [],
        totalPrice: 0,
      }
    case "SELECT_SEAT":
      const newSeats = [...state.selectedSeats, { ...action.payload, status: "selected" as const }]
      return {
        ...state,
        selectedSeats: newSeats,
        totalPrice: newSeats.reduce((total, seat) => total + seat.price, 0),
      }
    case "DESELECT_SEAT":
      const filteredSeats = state.selectedSeats.filter((seat) => seat.id !== action.payload)
      return {
        ...state,
        selectedSeats: filteredSeats,
        totalPrice: filteredSeats.reduce((total, seat) => total + seat.price, 0),
      }
    case "CLEAR_SEATS":
      return {
        ...state,
        selectedSeats: [],
        totalPrice: 0,
      }
    case "CONFIRM_BOOKING":
      return {
        ...state,
        bookingId: action.payload,
      }
    case "RESET_BOOKING":
      return initialState
    default:
      return state
  }
}

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
} | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
