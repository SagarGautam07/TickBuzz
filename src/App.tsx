import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BookingProvider } from "./context/BookingContext"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import BookingPage from "./pages/BookingPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import AdminLoginPage from "./pages/admin/AdminLoginPage"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import AdminMoviesPage from "./pages/admin/AdminMoviesPage"
import AdminTheatersPage from "./pages/admin/AdminTheatersPage"
import AdminBookingsPage from "./pages/admin/AdminBookingsPage"
import "./globals.css"

function App() {
  return (
    <div className="dark">
      <BookingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/booking/:movieId" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/movies" element={<AdminMoviesPage />} />
            <Route path="/admin/theaters" element={<AdminTheatersPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          </Routes>
        </Router>
      </BookingProvider>
    </div>
  )
}

export default App
