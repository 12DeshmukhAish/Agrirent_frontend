"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/ui/SearchIcon";
import { getAllEquipment } from "@/lib/api";

export default function Home() {
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
    <>
      <Navbar
        isBordered
        className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 shadow-md p-2 sticky top-0 z-50"
        isSticky
      >
        <div className="flex justify-between items-center w-full">
          {/* Left - Logo and Name */}
          <NavbarBrand className="flex items-center pl-2">
            <Image
              src="/logo.jpg"
              alt="AgriRent Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <p className="font-bold text-inherit text-3xl">AgriRent</p>
          </NavbarBrand>

          {/* Center - Search Bar */}
          <div className="flex-grow flex justify-center">
            <NavbarContent className="hidden sm:flex">
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[20rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small text-black",
                  inputWrapper: "h-full font-normal bg-white",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </NavbarContent>
          </div>


          <NavbarContent justify="end" className="ml-auto flex items-center space-x-3">
  <NavbarItem className="font-bold">
    <Link href="/about">About Us</Link>
  </NavbarItem>
  <NavbarItem className="font-bold">
    <Link href="/contact">Contacts</Link>
  </NavbarItem>
  <NavbarItem className="font-bold">
    <Link href="/login">Login</Link>
  </NavbarItem>
  <NavbarItem className="font-bold">
    <Link href="/register">Sign Up</Link>
  </NavbarItem>
</NavbarContent>

        </div>
      </Navbar>

      <main className="relative w-full h-screen bg-no-repeat bg-cover bg-center animate-slide-in" style={{ backgroundImage: "url('../pixelcut-export.jpeg')" }}>
        <section className="text-left">
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-10 pb-5">
            <h1 className="text-[70px] font-bold leading-tight mb-4">Welcome to AgriRent</h1>
            <h3 className="text-[30px] font-semibold mb-4">Renting The Farm Equipment</h3>

            <p className="text-[22px] text-left max-w-lg">
              AgriRent offers hassle-free farm equipment rentals at competitive
              prices. Access high-quality tools with flexible terms to optimize
              your farming operations effortlessly. Join us today!
            </p>
          </div>
        </section>
      </main>

      <div className="bg-green-100 min-h-screen">
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
                  ref={(el) => (equipmentRefs.current[index] = el)}
                  className={`py-4 shadow-lg shadow-black flex flex-col justify-between ${
                    searchTerm &&
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ? "bg-yellow-300"
                      : ""
                  }`}
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <h4 className="font-bold text-large text-black text-center">
                      {item.name}
                    </h4>
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
              <h2 className="text-xl font-bold mb-4">
                {selectedEquipment.name}
              </h2>
              <Image
                alt={selectedEquipment.name}
                src={getImageUrl(selectedEquipment.image)}
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <p>
                {" "}
                <b>Condition:</b>
                {selectedEquipment.condition}
              </p>
              <p>
                <b>RentalPrice: </b>
                {selectedEquipment.rentalPrice}
              </p>
              <p>
                <b>AvailabilityDateStart:</b>{" "}
                {selectedEquipment.availabilityDateStart}
              </p>
              <p>
                <b>AvailabilityDateEnd:</b>
                {selectedEquipment.availabilityDateEnd}
              </p>
              <p>
                <b>OwnerName:</b>
                {selectedEquipment.ownerName}
              </p>
              <p>
                <b>Address:</b>
                {selectedEquipment.address}
              </p>
              <p>
                <b>Contact:</b>
                {selectedEquipment.contactNumber}
              </p>
              <p>
                <b>Description:</b>
                {selectedEquipment.description}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="py-8 bg-green-200 text-green-400">
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
      </div>
    </>
  );
}
