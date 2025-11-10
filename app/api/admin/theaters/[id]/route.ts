import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const THEATERS_FILE = path.join(process.cwd(), "data", "theaters.json")

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const data = await fs.readFile(THEATERS_FILE, "utf8")
    const theaters = JSON.parse(data)

    const updatedTheaters = theaters.filter((theater: any) => theater.id !== id)

    if (updatedTheaters.length === theaters.length) {
      return NextResponse.json({ error: "Theater not found" }, { status: 404 })
    }

    await fs.writeFile(THEATERS_FILE, JSON.stringify(updatedTheaters, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete theater" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const theaterData = await request.json()

    const data = await fs.readFile(THEATERS_FILE, "utf8")
    const theaters = JSON.parse(data)

    const theaterIndex = theaters.findIndex((theater: any) => theater.id === id)

    if (theaterIndex === -1) {
      return NextResponse.json({ error: "Theater not found" }, { status: 404 })
    }

    theaters[theaterIndex] = { id, ...theaterData }

    await fs.writeFile(THEATERS_FILE, JSON.stringify(theaters, null, 2))

    return NextResponse.json(theaters[theaterIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update theater" }, { status: 500 })
  }
}
