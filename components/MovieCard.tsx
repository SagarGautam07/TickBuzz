"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star } from "lucide-react"
import Link from "next/link"
import type { Movie } from "@/context/BookingContext"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {movie.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-red-600 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground">{movie.genre.join(", ")}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{movie.rating}</span>
          </div>
        </div>

        <Link href={`/movie/${movie.id}`} className="block">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Book Now</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
