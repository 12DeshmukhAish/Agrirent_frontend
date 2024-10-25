"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getAllEquipment } from "@/lib/api";

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const equipmentRefs = useRef([]);

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
    fetchEquipment();
  }, []);

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
    <div className="min-h-screen bg-green-100">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Available Equipment
          </h1>
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="search"
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white shadow-lg text-black focus:outline-none"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold">Loading equipment...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <Card
                  key={item._id}
                  ref={(el) => (equipmentRefs.current[index] = el)}
                  className="py-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <h4 className="font-bold text-large">{item.name}</h4>
                  </CardHeader>
                  <CardBody className="flex-grow flex flex-col items-center justify-center">
                    <Image
                      alt={item.name}
                      className="object-cover rounded-xl"
                      src={getImageUrl(item.image)}
                      width={200}
                      height={200}
                    />
                    <div className="mt-4 text-center">
                      <p className="text-gray-600 mb-2">
                        Condition: {item.condition}
                      </p>
                      <p className="text-green-600 font-bold mb-4">
                        Rental Price: {item.rentalPrice}
                      </p>
                      <button
                        className="bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-green-700 transition duration-300"
                        onClick={() => handleViewDetails(item)}
                      >
                        View Details
                      </button>
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
      </div>

      {/* Modal for Selected Equipment */}
      {selectedEquipment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
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
            <h2 className="text-2xl font-bold mb-4">{selectedEquipment.name}</h2>
            <Image
              alt={selectedEquipment.name}
              src={getImageUrl(selectedEquipment.image)}
              width={200}
              height={200}
              className="mx-auto mb-6 rounded-lg"
            />
            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="font-semibold">Condition:</span>
                <span>{selectedEquipment.condition}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Rental Price:</span>
                <span className="text-green-600 font-bold">
                  {selectedEquipment.rentalPrice}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Available From:</span>
                <span>{selectedEquipment.availabilityDateStart}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Available Until:</span>
                <span>{selectedEquipment.availabilityDateEnd}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}