import { MapPin, Clock, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import theaters from "@/data/theaters.json"

export default function TheatersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Theaters</h1>
          <p className="text-gray-400 text-lg">Find the perfect cinema location near you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {theaters.map((theater) => (
            <Card key={theater.id} className="bg-gray-900 border-gray-800 hover:border-red-600 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-xl">{theater.name}</CardTitle>
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    Open
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">{theater.location}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">Open 10:00 AM - 11:00 PM</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">(555) 123-4567</span>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h4 className="text-white font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                      Dolby Atmos
                    </Badge>
                    <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                      IMAX
                    </Badge>
                    <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                      Reclining Seats
                    </Badge>
                    <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                      Concessions
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Theaters?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">Prime Locations</h3>
              <p className="text-gray-400 text-sm">Conveniently located across the city</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">Flexible Showtimes</h3>
              <p className="text-gray-400 text-sm">Multiple shows throughout the day</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Customer service always available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
