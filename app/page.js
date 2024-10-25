"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { SearchIcon } from "@/components/ui/SearchIcon";
import { getAllEquipment } from "@/lib/api";
// Add the formatDate function
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const equipmentRefs = useRef([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setIsLoading(true);
        const data = await getAllEquipment();
        setEquipmentItems(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
        setError("Failed to load equipment. Please try again later.");
        setEquipmentItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token'); // Or your auth method
      setIsLoggedIn(!!token);
    };

    fetchEquipment();
    checkLoginStatus();
  }, []);

  const handleBooking = async (item) => {
    if (!isLoggedIn) {
      if (window.confirm('Please login to book equipment. Would you like to login now?')) {
        router.push('/login');
      }
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token
        },
        body: JSON.stringify({
          equipmentId: item._id,
          startDate: item.availabilityDateStart,
          endDate: item.availabilityDateEnd,
        })
      });

      if (response.ok) {
        alert('Booking successful!');
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      alert('Failed to book equipment. Please try again.');
      console.error('Booking error:', error);
    }
  };

  const filteredItems = equipmentItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imagePath}`;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const matchedIndex = equipmentItems.findIndex((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    if (matchedIndex !== -1) {
      equipmentRefs.current[matchedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleViewDetails = (item) => {
    setSelectedEquipment(item);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 shadow-md p-4 sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="AgriRent Logo" width="50" height="50" />
            <p className="font-bold text-black text-3xl">AgriRent</p>
          </div>

          <div className="hidden sm:flex flex-grow justify-center mx-28">
            <div className="relative w-full max-w-[24rem]">
              <input
                type="search"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white shadow-sm text-black focus:outline-none"
                placeholder="Search equipment, location..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm10.708-9.708l-5.25 5.25"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/about" className="font-bold">About Us</a>
            <a href="/contact" className="font-bold">Contact</a>
            <a href="/login" className="font-bold">Login</a>
            <a href="/register" className="font-bold">Register</a>
            <a href="/explore" className="font-bold">Equipment</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center pt-24"
        style={{ backgroundImage: "url('../pixelcut-export.jpeg')" }}
      >
        <section className="text-left">
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-10 pb-5 pt-24">
            <h1 className="text-[70px] font-bold leading-tight mb-4">
              Welcome to AgriRent
            </h1>
            <h3 className="text-[30px] font-semibold mb-4">
              Renting The Farm Equipment
            </h3>
            <p className="text-[22px] text-left max-w-lg">
              AgriRent offers hassle-free farm equipment rentals at competitive
              prices. Access high-quality tools with flexible terms to optimize
              your farming operations effortlessly. Join us today!
            </p>
          </div>
        </section>
      </main>

      <div className="bg-green-100 min-h-screen pt-16">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold">Loading equipment...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <Card
                  key={item._id}
                  ref={(el) => (equipmentRefs.current[index] = el)}
                  className="hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden"
                >
                  <CardHeader className="pb-0 pt-4 px-4">
                    <h4 className="font-bold text-xl text-center w-full">
                      {item.name}
                    </h4>
                  </CardHeader>
                  <CardBody className="py-4">
                    <div className="relative group">
                      <Image
                        alt={item.name}
                        className="object-cover rounded-xl w-full h-48 transition-transform duration-300 group-hover:scale-105"
                        src={getImageUrl(item.image)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl" />
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">Condition:</span> {item.condition}
                      </p>
                      <p className="text-green-600 font-bold">
                        ₹{item.rentalPrice}/day
                      </p>
                      <div className="flex gap-2 mt-4">
                        <button
                          className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                          onClick={() => handleViewDetails(item)}
                        >
                          View Details
                        </button>
                        <button
                          className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                          onClick={() => handleBooking(item)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
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


        {/* Detailed Modal */}
        {selectedEquipment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-300"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold mb-6 pr-8">
                {selectedEquipment.name}
              </h2>
              
              <Image
                alt={selectedEquipment.name}
                src={getImageUrl(selectedEquipment.image)}
                className="mx-auto mb-6 rounded-lg h-64 w-full object-cover"
              />
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700">{selectedEquipment.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold block">Condition:</span>
                      <span className="text-gray-700">{selectedEquipment.condition}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold block">Rental Price:</span>
                      <span className="text-green-600 font-bold">
                        ₹{selectedEquipment.rentalPrice}/day
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-semibold block">Available From:</span>
                      <span>{formatDate(selectedEquipment.availabilityDateStart)}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold block">Available Until:</span>
                      <span>{formatDate(selectedEquipment.availabilityDateEnd)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold block">Owner:</span>
                      <span className="text-gray-700">{selectedEquipment.ownerName}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold block">Contact Number:</span>
                      <span className="text-gray-700">{selectedEquipment.contactNumber}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold block">Address:</span>
                      <span className="text-gray-700">{selectedEquipment.address}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => handleBooking(selectedEquipment)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
   
 

      <footer className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left text-black">
            <p className="text-sm">
              &copy; 2024 AgriRent. All rights reserved.
            </p>
            <p className="text-sm mt-2">Contact: 9579112654</p>
            <p className="text-sm">Email: support@agrirent.com</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100 transition-colors"
            >
              <img src="/insta.png" alt="Instagram" className="w-10 h-10" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="hover:text-gray-100 transition-colors"
            >
              <img src="/twitter.png" alt="Twitter" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}