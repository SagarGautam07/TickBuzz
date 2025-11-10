import { AdminLayout } from "../../components/AdminLayout"

export default function AdminBookingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground">Manage customer bookings and reservations</p>
        </div>

        <div className="text-center py-12">
          <p className="text-muted-foreground">Booking management features coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  )
}
