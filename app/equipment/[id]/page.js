'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getEquipment, createBooking } from '../../../lib/api'

export default function EquipmentDetail({ params }) {
  const [equipment, setEquipment] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await getEquipment()
        const selectedEquipment = equipmentData.find(e => e._id === params.id)
        setEquipment(selectedEquipment)
      } catch (error) {
        console.error('Failed to fetch equipment:', error)
      }
    }
    fetchEquipment()
  }, [params.id])

  const handleBooking = async (e) => {
    e.preventDefault()
    try {
      await createBooking({ equipmentId: equipment._id, rentalDate: bookingDate })
      router.push('/bookings')
    } catch (error) {
      console.error('Failed to create booking:', error)
    }
  }

  if (!equipment) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{equipment.name}</h1>
      <img src={equipment.image} alt={equipment.name} className="w-full max-w-md mb-4" />
      <p className="mb-2"><strong>Description:</strong> {equipment.description}</p>
      <p className="mb-2"><strong>Condition:</strong> {equipment.condition}</p>
      <p className="mb-2"><strong>Rental Price:</strong> ${equipment.rentalPrice}</p>
      <p className="mb-2"><strong>Available from:</strong> {new Date(equipment.availabilityDate).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Owner:</strong> {equipment.ownerName}</p>
      <p className="mb-4"><strong>Contact:</strong> {equipment.contactNumber}</p>

      <form onSubmit={handleBooking} className="space-y-4">
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Book Now
        </button>
      </form>
    </div>
  )
}