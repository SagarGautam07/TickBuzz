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
import { Plus, Search, Edit, Trash2, MapPin, Phone, Mail, Users, Monitor } from "lucide-react"
import Image from "next/image"

interface Theater {
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

export default function TheatersManagement() {
  const [theaters, setTheaters] = useState<Theater[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTheaters()
  }, [])

  const fetchTheaters = async () => {
    try {
      const response = await fetch("/api/admin/theaters")
      const data = await response.json()
      setTheaters(data)
    } catch (error) {
      console.error("Failed to fetch theaters:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTheater = async (theaterId: string) => {
    try {
      const response = await fetch(`/api/admin/theaters/${theaterId}`, {
        method: "DELETE",
      })

      if (response.ok) {
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
    return <div className="flex items-center justify-center h-64">Loading theaters...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Theater Management</h1>
          <p className="text-muted-foreground">Manage your theater locations</p>
        </div>
        <Button asChild>
          <Link href="/admin/theaters/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Theater
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search theaters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredTheaters.length} of {theaters.length} theaters
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTheaters.map((theater) => (
          <Card key={theater.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={theater.image || "/placeholder.svg?height=200&width=400&query=modern cinema theater interior"}
                alt={theater.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={theater.status === "active" ? "default" : "secondary"}>{theater.status}</Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-1">{theater.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {theater.city}, {theater.state}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-3 w-3" />
                  {theater.phone}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="h-3 w-3" />
                  {theater.email}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{theater.capacity} seats</span>
                </div>
                <div className="flex items-center gap-1">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span>{theater.screens} screens</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {theater.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {theater.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{theater.features.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/admin/theaters/edit/${theater.id}`}>
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
                      <AlertDialogTitle>Delete Theater</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{theater.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteTheater(theater.id)}
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

      {filteredTheaters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No theaters found matching your search.</p>
        </div>
      )}
    </div>
  )
}
