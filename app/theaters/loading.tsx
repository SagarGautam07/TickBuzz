import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TheatersLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-10 bg-gray-800 rounded animate-pulse mb-4 w-64"></div>
          <div className="h-6 bg-gray-800 rounded animate-pulse w-96"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="h-6 bg-gray-800 rounded animate-pulse w-48"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-gray-800 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2"></div>
                <div className="flex gap-2 pt-4">
                  <div className="h-6 bg-gray-800 rounded animate-pulse w-20"></div>
                  <div className="h-6 bg-gray-800 rounded animate-pulse w-16"></div>
                  <div className="h-6 bg-gray-800 rounded animate-pulse w-24"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
