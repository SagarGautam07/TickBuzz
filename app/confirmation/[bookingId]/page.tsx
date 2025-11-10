import { ConfirmationClient } from "./ConfirmationClient"

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params

  return <ConfirmationClient bookingId={bookingId} />
}
