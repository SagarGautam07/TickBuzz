import { moviesData } from "../data/movies"

export interface Movie {
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

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return moviesData
  },

  async getMovieById(id: string): Promise<Movie | null> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return moviesData.find((movie) => movie.id === id) || null
  },

  async createMovie(movieData: Omit<Movie, "id">): Promise<Movie> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const newMovie = {
      ...movieData,
      id: (moviesData.length + 1).toString(),
    }
    moviesData.push(newMovie)
    return newMovie
  },

  async updateMovie(id: string, movieData: Partial<Movie>): Promise<Movie | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const index = moviesData.findIndex((movie) => movie.id === id)
    if (index === -1) return null

    moviesData[index] = { ...moviesData[index], ...movieData }
    return moviesData[index]
  },

  async deleteMovie(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const index = moviesData.findIndex((movie) => movie.id === id)
    if (index === -1) return false

    moviesData.splice(index, 1)
    return true
  },
}
