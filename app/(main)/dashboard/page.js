'use client'

import { useEffect, useState } from 'react'
// import { getUserBookings } from '../../lib/api'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings()
        setBookings(userBookings)
      } catch (error) {
        console.error('Failed to fetch bookings:', error)
      }
    }
    fetchBookings()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id}>
          <h3>Equipment: {booking.equipmentId.name}</h3>
          <p>Type: {booking.equipmentId.type}</p>
        </div>
      ))}
    </div>
  )
}
