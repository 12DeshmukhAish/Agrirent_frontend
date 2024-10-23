'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import { SearchIcon } from "@/components/ui/SearchIcon"
import { getAllEquipment } from '@/lib/api'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [equipmentItems, setEquipmentItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const equipmentRefs = useRef([])

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setIsLoading(true)
        const data = await getAllEquipment()
        setEquipmentItems(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch equipment:', err)
        setError('Failed to load equipment. Please try again later.')
        setEquipmentItems([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchEquipment()
  }, [])

  const filteredItems = equipmentItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imagePath}`
  }

  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    const matchedIndex = equipmentItems.findIndex(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    )

    if (matchedIndex !== -1) {
      equipmentRefs.current[matchedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleViewDetails = (item) => {
    setSelectedEquipment(item)
  }

  const closeModal = () => {
    setSelectedEquipment(null)
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 shadow-md p-4 sticky top-0 z-25">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Brand Section on the Left */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png" // Replace with the path to your logo
              alt="AgriRent Logo"
              width={50}
              height={50}
            />
            <p className="font-bold text-black text-3xl">AgriRent</p>
          </div>

          {/* Search Bar Section at the Center */}
          <div className="hidden sm:flex flex-grow justify-center mx-28">
            <div className="relative w-full max-w-[24rem]">
              <input
                type="search"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white shadow-sm text-black focus:outline-none"
                placeholder="Search equipment, location..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Navigation Links Section on the Right */}
          <div className="flex items-center space-x-4">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contacts</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Sign Up</Link>
          </div>
        </div>
      </nav>
      
      <main className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center pt-24" style={{ backgroundImage: "url('../pixelcut-export.jpeg')" }}>
        <section className="text-left">
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-10 pb-5">
            <h1 className="text-[70px] font-bold leading-tight mb-4">Welcome to AgriRent</h1>
            <h3 className="text-[30px] font-semibold mb-4">Renting The Farm Equipment</h3>
            <p className="text-[22px] text-left max-w-lg">
              AgriRent offers hassle-free farm equipment rentals at competitive prices. Access high-quality tools with flexible terms to optimize your farming operations effortlessly. Join us today!
            </p>
          </div>
        </section>
      </main>

      <div className="bg-green-100 min-h-screen pt-16"> {/* Adjusted padding-top to avoid overlap */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold">Loading equipment...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <Card
                  key={item._id}
                  ref={el => equipmentRefs.current[index] = el}
                  className={`py-4 shadow-lg shadow-black flex flex-col justify-between ${searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 'bg-yellow-300' : ''}`}
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <h4 className="font-bold text-large text-black text-center">{item.name}</h4>
                  </CardHeader>
                  <CardBody className="flex-grow flex flex-col items-center justify-center">
                    <Image
                      alt={item.name}
                      className="object-cover rounded-xl mx-auto"
                      src={getImageUrl(item.image)} 
                      width={150}
                      height={150}
                    />
                    <button
                      className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-green-700 transition duration-300"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </button>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-xl font-semibold">No equipment found.</p>
              </div>
            )}
          </div>
        )}

        {selectedEquipment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
              <button
                className="absolute top-2 right-2 text-black hover:text-red-600"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedEquipment.name}</h2>
              <Image
                alt={selectedEquipment.name}
                src={getImageUrl(selectedEquipment.image)}
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <p>{selectedEquipment.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
