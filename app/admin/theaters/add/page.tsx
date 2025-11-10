"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const COMMON_FEATURES = [
  "IMAX",
  "Dolby Atmos",
  "Dolby Digital",
  "4DX",
  "Premium Seating",
  "Reclining Seats",
  "VIP Lounge",
  "Concessions",
  "Bar",
  "Parking",
  "Gift Shop",
  "Planetarium",
  "Educational Films",
]

export default function AddTheater() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [featureInput, setFeatureInput] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    capacity: "",
    screens: "",
    features: [] as string[],
    operatingHours: {
      monday: "10:00 AM - 10:00 PM",
      tuesday: "10:00 AM - 10:00 PM",
      wednesday: "10:00 AM - 10:00 PM",
      thursday: "10:00 AM - 10:00 PM",
      friday: "10:00 AM - 11:00 PM",
      saturday: "9:00 AM - 11:00 PM",
      sunday: "10:00 AM - 9:00 PM",
    },
    image: "",
    status: "active",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHoursChange = (day: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: { ...prev.operatingHours, [day]: value },
    }))
  }

  const addFeature = (feature: string) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }))
    }
    setFeatureInput("")
  }

  const removeFeature = (featureToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== featureToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const theaterData = {
        ...formData,
        capacity: Number.parseInt(formData.capacity),
        screens: Number.parseInt(formData.screens),
      }

      const response = await fetch("/api/admin/theaters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theaterData),
      })

      if (response.ok) {
        router.push("/admin/theaters")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add theater")
      }
    } catch (err) {
      setError("Failed to add theater. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/theaters">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Theaters
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Theater</h1>
          <p className="text-muted-foreground">Add a new theater location</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Theater name and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Theater Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Theater name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Address *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="theater@example.com"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theater Details</CardTitle>
            <CardDescription>Capacity, screens, and features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="capacity">Total Capacity *</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="250"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="screens">Number of Screens *</Label>
                <Input
                  id="screens"
                  name="screens"
                  type="number"
                  value={formData.screens}
                  onChange={handleInputChange}
                  placeholder="8"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/theaters/theater-image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add custom feature"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature(featureInput))}
                />
                <Button type="button" onClick={() => addFeature(featureInput)} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {COMMON_FEATURES.map((feature) => (
                  <Button
                    key={feature}
                    type="button"
                    variant={formData.features.includes(feature) ? "default" : "outline"}
                    size="sm"
                    onClick={() => (formData.features.includes(feature) ? removeFeature(feature) : addFeature(feature))}
                  >
                    {feature}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operating Hours</CardTitle>
            <CardDescription>Set operating hours for each day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {DAYS.map((day) => (
                <div key={day} className="space-y-2">
                  <Label htmlFor={day} className="capitalize">
                    {day}
                  </Label>
                  <Input
                    id={day}
                    value={formData.operatingHours[day]}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                    placeholder="10:00 AM - 10:00 PM"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding Theater..." : "Add Theater"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/theaters">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
