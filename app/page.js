import Link from 'next/link';
// import Head from 'next/head';
import Image from 'next/image';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Home() {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex" color="primary">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="#" color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto p-6">
        <section className="text-center my-12">
          <h1 className="text-5xl font-bold text-blue-500 mb-4">Welcome to Agrirent</h1>
          <p className="text-gray-600 text-lg mb-8"></p>
          <div className="flex justify-between items-center space-x-8">
            <div className="w-1/2">
              <Image src="/5155462_2689047.svg" width={600} height={600} alt="Attendance System Illustration" className="w-full h-auto" />
            </div>
            <div className="w-1/2 text-left">
              <p className="text-gray-600 text-lg mb-4">
             
              </p>
              <p className="text-gray-600 text-lg mb-4">
               
              </p>
              <Link href="/login" legacyBehavior>
                <a>
                  <button className="custom-button">
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            fill="currentColor"
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span>Start </span>
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto text-center px-4">
          <p className="text-gray-600">&copy; 2024 Agrirent. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
