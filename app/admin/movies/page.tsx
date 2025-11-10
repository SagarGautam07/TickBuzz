"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Search, Edit, Trash2, Star, Clock } from "lucide-react"
import Image from "next/image"

interface Movie {
  id: string
  title: string
  poster: string
  backgroundImage: string
  genre: string[]
  duration: number
  language: string
  rating: number
  description: string
  releaseDate: string
  studio: string
}

export default function MoviesManagement() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      console.log("[v0] Fetching movies from API...")
      const response = await fetch("/api/admin/movies")

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] API response not ok:", response.status, errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error("[v0] Response is not JSON:", responseText)
        throw new Error("Response is not JSON")
      }

      const data = await response.json()
      console.log("[v0] Successfully fetched", data.length, "movies")
      setMovies(data)
    } catch (error) {
      console.error("[v0] Failed to fetch movies:", error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMovie = async (movieId: string) => {
    try {
      const response = await fetch(`/api/admin/movies/${movieId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMovies(movies.filter((movie) => movie.id !== movieId))
      }
    } catch (error) {
      console.error("Failed to delete movie:", error)
    }
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
      movie.studio.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading movies...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Movie Management</h1>
          <p className="text-muted-foreground">Manage your movie catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/movies/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Movie
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredMovies.length} of {movies.length} movies
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {movie.rating}
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{movie.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{movie.studio}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {movie.duration} min
                <span>•</span>
                {movie.language}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {movie.genre.slice(0, 3).map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs">
                    {g}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{movie.description}</p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/admin/movies/edit/${movie.id}`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Movie</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{movie.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No movies found matching your search.</p>
        </div>
      )}
    </div>
  )
}
