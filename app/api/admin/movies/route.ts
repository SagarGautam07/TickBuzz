import { type NextRequest, NextResponse } from "next/server"

const moviesData = [
  {
    id: "1",
    title: "Guardians of the Galaxy Vol. 3",
    poster: "/guardians-of-the-galaxy-vol--3-movie-poster.jpg",
    backgroundImage: "/guardians-of-the-galaxy-vol--3-space-background.jpg",
    genre: ["Action", "Adventure", "Comedy"],
    duration: 150,
    language: "English",
    rating: 8.2,
    description:
      "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.",
    releaseDate: "2023-05-05",
    studio: "Marvel Studios",
  },
  {
    id: "2",
    title: "The Dark Knight",
    poster: "/the-dark-knight-batman-movie-poster.jpg",
    backgroundImage: "/gotham-city-dark-night-background.jpg",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    language: "English",
    rating: 9.0,
    description:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
    releaseDate: "2008-07-18",
    studio: "Warner Bros.",
  },
  {
    id: "3",
    title: "Inception",
    poster: "/inception-movie-poster-with-spinning-top.jpg",
    backgroundImage: "/inception-dream-layers-background.jpg",
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: 148,
    language: "English",
    rating: 8.8,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    releaseDate: "2010-07-16",
    studio: "Warner Bros.",
  },
  {
    id: "4",
    title: "Interstellar",
    poster: "/interstellar-space-movie-poster.jpg",
    backgroundImage: "/interstellar-space-wormhole-background.jpg",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    language: "English",
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2014-11-07",
    studio: "Paramount Pictures",
  },
  {
    id: "5",
    title: "Avatar: The Way of Water",
    poster: "/avatar-way-of-water-movie-poster.jpg",
    backgroundImage: "/avatar-pandora-ocean-underwater-background.jpg",
    genre: ["Action", "Adventure", "Fantasy"],
    duration: 192,
    language: "English",
    rating: 7.6,
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    releaseDate: "2022-12-16",
    studio: "20th Century Studios",
  },
  {
    id: "6",
    title: "Top Gun: Maverick",
    poster: "/top-gun-maverick-movie-poster.jpg",
    backgroundImage: "/top-gun-fighter-jets-sky-background.jpg",
    genre: ["Action", "Drama"],
    duration: 130,
    language: "English",
    rating: 8.3,
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    releaseDate: "2022-05-27",
    studio: "Paramount Pictures",
  },
]

export async function GET() {
  try {
    console.log("[v0] Successfully loaded", moviesData.length, "movies")
    return NextResponse.json(moviesData)
  } catch (error) {
    console.error("[v0] Error in GET /api/admin/movies:", error)
    return NextResponse.json(
      { error: "Failed to fetch movies", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const movieData = await request.json()

    const newId = (Math.max(...moviesData.map((m: any) => Number.parseInt(m.id))) + 1).toString()

    const newMovie = {
      id: newId,
      ...movieData,
    }

    moviesData.push(newMovie)

    return NextResponse.json(newMovie, { status: 201 })
  } catch (error) {
    console.error("[v0] Error in POST /api/admin/movies:", error)
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 })
  }
}
