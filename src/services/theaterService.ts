import { theatersData } from "../data/theaters"

export interface Theater {
  id: string
  name: string
  location: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  capacity: number
  screens: number
  features: string[]
  operatingHours: Record<string, string>
  image: string
  status: string
}

export const theaterService = {
  async getAllTheaters(): Promise<Theater[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return theatersData
  },

  async getTheaterById(id: string): Promise<Theater | null> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return theatersData.find((theater) => theater.id === id) || null
  },

  async createTheater(theaterData: Omit<Theater, "id">): Promise<Theater> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const newTheater = {
      ...theaterData,
      id: (theatersData.length + 1).toString(),
    }
    theatersData.push(newTheater)
    return newTheater
  },

  async updateTheater(id: string, theaterData: Partial<Theater>): Promise<Theater | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const index = theatersData.findIndex((theater) => theater.id === id)
    if (index === -1) return null

    theatersData[index] = { ...theatersData[index], ...theaterData }
    return theatersData[index]
  },

  async deleteTheater(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const index = theatersData.findIndex((theater) => theater.id === id)
    if (index === -1) return false

    theatersData.splice(index, 1)
    return true
  },
}
