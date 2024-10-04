"use client"; // Marking this component as a Client Component

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { SearchIcon } from "../components/ui/SearchIcon"; // Adjust this based on your icon path

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(null); // State for selected equipment
  const equipmentRefs = useRef([]); // Ref to store card references

  // Array of equipment items
  const equipmentItems = [
    { title: 'Tractor', img: '/tractor.png', description: 'High power tractor for farming tasks.' },
    { title: 'Harvester', img: '/harvestor.png', description: 'Efficient harvester for grain collection.' },
    { title: 'Cultivator', img: '/cultivator.png', description: 'Ideal for preparing soil for planting.' },
    { title: 'Rotavator', img: '/rotavator.png', description: 'Perfect for mixing soil and tilling.' },
    { title: 'Ripper', img: '/ripper.png', description: 'Designed for breaking up hard soil.' },
    { title: 'Thresher', img: '/threshor.png', description: 'Used for separating grain from chaff.' },
    { title: 'Corn Planter', img: '/corn.png', description: 'Specialized planter for corn crops.' },
    { title: 'Disc Plow', img: '/disc.png', description: 'Effective plow for turning over soil.' },
  ];

  // Filter items based on search term
  const filteredItems = equipmentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Find the index of the first matched item
    const matchedIndex = equipmentItems.findIndex(item => 
      item.title.toLowerCase().includes(term.toLowerCase())
    );

    // Scroll to the first matched card if found
    if (matchedIndex !== -1) {
      equipmentRefs.current[matchedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Function to handle the View Details button click
  const handleViewDetails = (item) => {
    setSelectedEquipment(item); // Set the selected equipment for the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar 
        isBordered 
        className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 shadow-md p-2 sticky top-0 z-50" 
        isSticky
      >
        <div className="flex justify-between items-right w-full pl-0">
          {/* AgriRent Brand on the far left */}
          <NavbarBrand className="flex items-center">
            <Image
              src="/logo.jpg" // Adjust this to your logo path
              alt="AgriRent Logo"
              width={40} // Set logo width
              height={40} // Set logo height
              className="mr-2" // Add some margin to the right of the logo
            />
            <p className="font-bold text-inherit text-3xl pl-4">AgriRent</p>
          </NavbarBrand>

          {/* Search bar centered */}
          <NavbarContent className="hidden sm:flex justify-center w-full mx-4">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small text-black", // Set text color to black
                inputWrapper: "h-full font-normal bg-white", // Set background color to white
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              value={searchTerm} // Controlled input
              onChange={handleSearchChange} // Update search term and handle scrolling
            />
          </NavbarContent>

          {/* Navbar links on the far right */}
          <NavbarContent justify="end" className="flex items-center space-x-3">
            <NavbarItem className="font-bold">
              <Link href="/about-us" passHref>
                About Us
              </Link>
            </NavbarItem>
            <NavbarItem className="font-bold">
              <Link href="/contact" passHref>
                Contacts
              </Link>
            </NavbarItem>
            <NavbarItem className="font-bold">
              <Link href="/login" passHref>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem className="font-bold">
              <Link href="/register" passHref>
                Sign Up
              </Link>
            </NavbarItem>
          </NavbarContent>
        </div>
      </Navbar>

      {/* Main Section with sliding effect */}
      <main className="relative w-full h-screen bg-no-repeat bg-cover bg-center animate-slide-in" style={{ backgroundImage: "url('/agrirent3.jpg')" }}>
        <section className="text-left">
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-10 pb-5">
            <h1 className="text-[70px] font-bold leading-tight mb-4">Welcome to AgriRent</h1>
            <h3 className="text-[30px] font-semibold mb-4">Renting The Best Farm Equipment</h3>
            <p className="text-[22px] text-left max-w-lg">
              AgriRent offers hassle-free farm equipment rentals at competitive prices. Access high-quality tools with flexible terms to optimize your farming operations effortlessly. Join us today!
            </p>
          </div>
        </section>
      </main>

      {/* Cards Section */}
      <div className="bg-green-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
          {filteredItems.map(({ title, img, description }, index) => (
            <Card
              key={index}
              ref={el => equipmentRefs.current[index] = el} // Assign ref to each card
              className={`py-4 shadow-lg shadow-black flex flex-col justify-between ${searchTerm && equipmentItems[index].title.toLowerCase().includes(searchTerm.toLowerCase()) ? 'bg-yellow-300' : ''}`} // Highlight if matched
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h4 className="font-bold text-large text-black text-center">{title}</h4>
              </CardHeader>
              <CardBody className="flex-grow flex flex-col items-center justify-center">
                <Image
                  alt={title}
                  className="object-cover rounded-xl mx-auto"
                  src={img}
                  width={150}
                  height={150}
                />
                {/* View Details Button */}
                <button 
                  className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-green-700 transition duration-300"
                  onClick={() => handleViewDetails({ title, img, description })} // Set selected equipment on click
                >
                  View Details
                </button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Modal for View Details */}
        {selectedEquipment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
              {/* Close Button */}
              <button 
                className="absolute top-2 right-2 text-black hover:text-red-600"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedEquipment.title}</h2>
              <Image
                alt={selectedEquipment.title}
                src={selectedEquipment.img}
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <p>{selectedEquipment.description}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="py-8 bg-orange-200 text-orange-400">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Footer Left: Copyright Information */}
            <div className="text-center md:text-left text-black">
              <p className="text-sm">&copy; 2024 AgriRent. All rights reserved.</p>
              <p className="text-sm mt-2">Contact: 9579112654</p>
              <p className="text-sm">Email: support@agrirent.com</p>
            </div>

            {/* Footer Right: Social Media Links */}
            <div className="flex items-center space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition-colors">
                <img src="/insta.png" alt="Instagram" className="w-10 h-10" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition-colors">
                <img src="/twitter.png" alt="Twitter" className="w-10 h-10" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
