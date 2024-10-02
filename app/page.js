import Link from 'next/link';
// import Head from 'next/head';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Home() {
  return (
    <>

  <>
    <Navbar className="bg-green-100 p-2">
      <div className="container mx-auto flex justify-between items-center ">
        {/* AgriRent title on the left */}
        <NavbarBrand>
          <p className="font-bold text-black text-xl">AgriRent</p>
        </NavbarBrand>

        {/* Center items (About, Contact) - hidden on small screens */}
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Link href="#" aria-current="page" className="text-black">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contact" aria-current="page" className="text-black">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Login and Sign Up buttons on the right */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login" className="text-black">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="register" className="text-black">
              Sign Up
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>

    <main className="relative w-full h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/home.png')" }}>
  <section className="text-center">
    {/* Title over the image */}
    <h1 className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-white">
      Welcome to Agrirent
    </h1>
  </section>
</main>

  </>

  <div className="bg-green-100 min-h-screen">
  {/* Cards Section */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Tractor</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/tractor.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Harvestor</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/harvestor.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Cultivator</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/cultivator.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Rotavator</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/rotavator.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Ripper</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/ripper.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Threshor machine</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/threshor.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Corn Planter</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/corn.png"
          width={270}
        />
      </CardBody>
    </Card>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Disc Plow</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/disc.png"
          width={270}
        />
      </CardBody>
    </Card>
  </div>



  <footer className="py-6 mt-12" style={{ backgroundColor: "#f58d42" }}>
  <div className="container mx-auto px-4 flex justify-between items-center">
    {/* Left side: Copyright */}
    <p className="text-gray-600">&copy; 2024 Agrirent. All rights reserved.</p>

    {/* Right side: Social icons and contact info */}
    <div className="text-right">
      <div className="flex items-center justify-end space-x-4">
        {/* Social Media Icons */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/insta.png" alt="Instagram" className="w-6 h-6" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
        </a>
      </div>
      {/* Contact Info */}
      <div className="mt-2">
        <p className="text-gray-600">Contact: 9579112654</p>
        <p className="text-gray-600">Email: deshmukhaishwarya484@gmail.com</p>
      </div>
    </div>
  </div>
</footer>










</div>
</>
  );
}


