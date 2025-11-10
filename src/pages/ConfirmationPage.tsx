"use client"
import { useParams } from "react-router-dom"
import { ConfirmationClient } from "../components/ConfirmationClient"

export default function ConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>()

  return <ConfirmationClient bookingId={bookingId!} />
}
