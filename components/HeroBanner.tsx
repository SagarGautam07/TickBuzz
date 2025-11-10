"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Movie } from "@/context/BookingContext"

interface HeroBannerProps {
  movies: Movie[]
}

export function HeroBanner({ movies }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000) // Change movie every 5 seconds

    return () => clearInterval(interval)
  }, [movies.length])

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % movies.length
    goToSlide(newIndex)
  }

  if (!movies.length) return null

  const currentMovie = movies[currentIndex]

  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 ${
          isTransitioning ? "scale-110 opacity-70" : "scale-100 opacity-100"
        }`}
        style={{
          backgroundImage: `url('${currentMovie.backgroundImage || currentMovie.poster}')`,
          filter: "blur(1px) brightness(0.3)",
        }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Previous movie"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Next movie"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-20 container max-w-screen-2xl px-4">
        <div
          className={`max-w-2xl space-y-6 transition-all duration-500 ${
            isTransitioning ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
          }`}
        >
          {/* Movie Studio Badge */}
          <Badge variant="secondary" className="bg-red-600 text-white hover:bg-red-700">
            {currentMovie.studio || "STUDIOS"}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight text-balance">{currentMovie.title}</h1>

          {/* Movie Details */}
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{currentMovie.genre.join(" | ")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{currentMovie.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{currentMovie.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg leading-relaxed max-w-xl">{currentMovie.description}</p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href={`/movie/${currentMovie.id}`}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
                <Play className="h-5 w-5 mr-2" />
                Explore Movie
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-red-600 scale-110" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
