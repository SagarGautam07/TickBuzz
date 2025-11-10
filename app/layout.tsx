import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { BookingProvider } from "@/context/BookingContext"

export const metadata: Metadata = {
  title: "TickBuzz - Movie Ticket Booking",
  description: "Book your favorite movies with TickBuzz",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <BookingProvider>{children}</BookingProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
