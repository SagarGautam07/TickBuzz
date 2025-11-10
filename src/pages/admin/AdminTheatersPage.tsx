"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Plus } from "lucide-react"
import { AdminLayout } from "../../components/AdminLayout"
import { theaterService, type Theater } from "../../services/theaterService"

export default function AdminTheatersPage() {
  const [theaters, setTheaters] = useState<Theater[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTheaters()
  }, [])

  const fetchTheaters = async () => {
    try {
      const data = await theaterService.getAllTheaters()
      setTheaters(data)
    } catch (error) {
      console.error("Failed to fetch theaters:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTheater = async (theaterId: string) => {
    try {
      const success = await theaterService.deleteTheater(theaterId)
      if (success) {
        setTheaters(theaters.filter((theater) => theater.id !== theaterId))
      }
    } catch (error) {
      console.error("Failed to delete theater:", error)
    }
  }

  const filteredTheaters = theaters.filter(
    (theater) =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">Loading theaters...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Theater Management</h1>
            <p className="text-muted-foreground">Manage your theater locations</p>
          </div>
          <Button asChild>
            <Link to="/admin/theaters/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Theater
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTheaters.map((theater) => (
            <Card key={theater.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={theater.image || "/modern-cinema-theater-interior.jpg"}
                  alt={theater.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={theater.status === "active" ? "default" : "secondary"}>{theater.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
