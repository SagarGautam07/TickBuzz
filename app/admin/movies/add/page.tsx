"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function AddMovie() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [genreInput, setGenreInput] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    backgroundImage: "",
    genre: [] as string[],
    duration: "",
    language: "English",
    rating: "",
    description: "",
    releaseDate: "",
    studio: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addGenre = () => {
    if (genreInput.trim() && !formData.genre.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, genreInput.trim()],
      }))
      setGenreInput("")
    }
  }

  const removeGenre = (genreToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const movieData = {
        ...formData,
        duration: Number.parseInt(formData.duration),
        rating: Number.parseFloat(formData.rating),
      }

      const response = await fetch("/api/admin/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      })

      if (response.ok) {
        router.push("/admin/movies")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add movie")
      }
    } catch (err) {
      setError("Failed to add movie. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/movies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Movie</h1>
          <p className="text-muted-foreground">Add a new movie to your catalog</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movie Details</CardTitle>
          <CardDescription>Fill in the information for the new movie</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Movie title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studio">Studio *</Label>
                <Input
                  id="studio"
                  name="studio"
                  value={formData.studio}
                  onChange={handleInputChange}
                  placeholder="Production studio"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="poster">Poster URL</Label>
                <Input
                  id="poster"
                  name="poster"
                  value={formData.poster}
                  onChange={handleInputChange}
                  placeholder="/movies/movie-poster.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image URL</Label>
                <Input
                  id="backgroundImage"
                  name="backgroundImage"
                  value={formData.backgroundImage}
                  onChange={handleInputChange}
                  placeholder="/movies/backgrounds/movie-bg.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Genres</Label>
              <div className="flex gap-2">
                <Input
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  placeholder="Add genre"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addGenre())}
                />
                <Button type="button" onClick={addGenre} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.genre.map((genre) => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeGenre(genre)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="120"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Input
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  placeholder="English"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.rating}
                  onChange={handleInputChange}
                  placeholder="8.5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseDate">Release Date *</Label>
                <Input
                  id="releaseDate"
                  name="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Movie description..."
                rows={4}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding Movie..." : "Add Movie"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/movies">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
