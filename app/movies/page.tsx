"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MovieGrid } from "@/components/MovieGrid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import moviesData from "@/data/movies.json"

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [showFilters, setShowFilters] = useState(false)

  // Get all unique genres and languages
  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    moviesData.forEach((movie) => {
      movie.genre.forEach((g) => genres.add(g))
    })
    return Array.from(genres).sort()
  }, [])

  const allLanguages = useMemo(() => {
    const languages = new Set(moviesData.map((movie) => movie.language))
    return Array.from(languages).sort()
  }, [])

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    const filtered = moviesData.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre)
      const matchesLanguage = selectedLanguage === "all" || movie.language === selectedLanguage

      return matchesSearch && matchesGenre && matchesLanguage
    })

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "rating":
          return b.rating - a.rating
        case "duration":
          return b.duration - a.duration
        case "release":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedGenre, selectedLanguage, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("all")
    setSelectedLanguage("all")
    setSortBy("title")
  }

  const activeFiltersCount = [selectedGenre !== "all", selectedLanguage !== "all", searchQuery !== ""].filter(
    Boolean,
  ).length

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-2xl px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">All Movies</h1>
            <p className="text-muted-foreground">Discover and book tickets for the latest movies</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6 relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {allGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {allLanguages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    <SelectItem value="duration">Duration (Long to Short)</SelectItem>
                    <SelectItem value="release">Release Date (Newest)</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredMovies.length} of {moviesData.length} movies
            </p>
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedGenre !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedGenre}
                  </Badge>
                )}
                {selectedLanguage !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedLanguage}
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="text-xs">
                    "{searchQuery}"
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Movies Grid */}
          {filteredMovies.length > 0 ? (
            <MovieGrid movies={filteredMovies} />
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No movies found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </div>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
