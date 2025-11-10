import { type NextRequest, NextResponse } from "next/server"

const theatersData = [
  {
    id: "1",
    name: "Cineplex Downtown",
    location: "123 Main Street, Downtown",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "(555) 123-4567",
    email: "downtown@cineplex.com",
    capacity: 250,
    screens: 8,
    amenities: ["IMAX", "Dolby Atmos", "Reclining Seats", "Concessions"],
    parkingAvailable: true,
    accessibilityFeatures: ["Wheelchair Access", "Audio Description", "Closed Captions"],
  },
  {
    id: "2",
    name: "Metro Cinema",
    location: "456 Oak Avenue, Midtown",
    city: "New York",
    state: "NY",
    zipCode: "10018",
    phone: "(555) 234-5678",
    email: "info@metrocinema.com",
    capacity: 180,
    screens: 6,
    amenities: ["Premium Sound", "Comfortable Seating", "Snack Bar"],
    parkingAvailable: false,
    accessibilityFeatures: ["Wheelchair Access", "Closed Captions"],
  },
  {
    id: "3",
    name: "Starlight Theater",
    location: "789 Pine Street, Uptown",
    city: "New York",
    state: "NY",
    zipCode: "10025",
    phone: "(555) 345-6789",
    email: "contact@starlighttheater.com",
    capacity: 320,
    screens: 10,
    amenities: ["IMAX", "4DX", "VIP Lounge", "Full Bar", "Gourmet Concessions"],
    parkingAvailable: true,
    accessibilityFeatures: [
      "Wheelchair Access",
      "Audio Description",
      "Closed Captions",
      "Sign Language Interpretation",
    ],
  },
]

export async function GET() {
  try {
    console.log("[v0] Successfully loaded", theatersData.length, "theaters")
    return NextResponse.json(theatersData)
  } catch (error) {
    console.error("[v0] Error in GET /api/admin/theaters:", error)
    return NextResponse.json(
      { error: "Failed to fetch theaters", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const theaterData = await request.json()

    const newId = (Math.max(...theatersData.map((t: any) => Number.parseInt(t.id))) + 1).toString()

    const newTheater = {
      id: newId,
      ...theaterData,
    }

    theatersData.push(newTheater)

    return NextResponse.json(newTheater, { status: 201 })
  } catch (error) {
    console.error("[v0] Error in POST /api/admin/theaters:", error)
    return NextResponse.json({ error: "Failed to add theater" }, { status: 500 })
  }
}
