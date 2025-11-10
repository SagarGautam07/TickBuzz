import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const MOVIES_FILE = path.join(process.cwd(), "data", "movies.json")

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const data = await fs.readFile(MOVIES_FILE, "utf8")
    const movies = JSON.parse(data)

    const updatedMovies = movies.filter((movie: any) => movie.id !== id)

    if (updatedMovies.length === movies.length) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    await fs.writeFile(MOVIES_FILE, JSON.stringify(updatedMovies, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const movieData = await request.json()

    const data = await fs.readFile(MOVIES_FILE, "utf8")
    const movies = JSON.parse(data)

    const movieIndex = movies.findIndex((movie: any) => movie.id === id)

    if (movieIndex === -1) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    movies[movieIndex] = { id, ...movieData }

    await fs.writeFile(MOVIES_FILE, JSON.stringify(movies, null, 2))

    return NextResponse.json(movies[movieIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update movie" }, { status: 500 })
  }
}
