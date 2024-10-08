// pages/about.js

import React from 'react';

const About = () => {
  return (
    <div className="about-page-container bg-green-100 min-h-screen py-12">
      {/* Website Information Section */}
      <div className="about-section flex flex-col md:flex-row items-center md:justify-between container mx-auto mb-16">
        <div className="about-text w-full md:w-1/2 p-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">About AgriRent</h2>
          <p className="text-lg text-gray-700">
            AgriRent is a platform dedicated to connecting farmers and agricultural businesses with reliable, affordable equipment rental options. We aim to simplify the process of accessing essential farming tools, ensuring that every farmer can achieve optimal productivity.
          </p>
        </div>
        <div className="about-image w-full md:w-1/2 p-8 bg-green-100 ">
          <img
            src="abooutus.png"
            alt="About AgriRent"
            className="object-cover w-full h-80 rounded-lg shadow-md"
            style={{ height: '400px', width: '100%' }} // Uniform height and width
          />
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="vision-section flex flex-col md:flex-row-reverse items-center md:justify-between container mx-auto mb-16">
        <div className="vision-text w-full md:w-1/2 p-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            Our vision is to revolutionize the agricultural industry by providing accessible and efficient rental solutions to farmers, promoting sustainable and profitable farming practices across the globe.
          </p>
        </div>
        <div className="vision-image w-full md:w-1/2 p-8">
          <img
            src="target.png"
            alt="Our Vision"
            className="object-cover w-full h-80 rounded-lg shadow-md"
            style={{ height: '300px', width: '100%' }} // Uniform height and width
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="mission-section flex flex-col md:flex-row items-center md:justify-between container mx-auto mb-16">
        <div className="mission-text w-full md:w-1/2 p-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to empower farmers by offering an easy-to-use platform for renting essential equipment, ensuring that agricultural practices are optimized and sustainable, leading to greater yields and improved livelihoods.
          </p>
        </div>
        <div className="mission-image w-full md:w-1/2 p-8">
          <img
            src="mission.png"
            alt="Our Mission"
            className="object-cover w-full h-80 rounded-lg shadow-md"
            style={{ height: '400px', width: '100%' }} // Uniform height and width
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="HowItWorks-section flex flex-col md:flex-row-reverse items-center md:justify-between container mx-auto mb-16">
        <div className="HowItWorks-text w-full md:w-1/2 p-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-700">Step 1: Visit the website and browse the equipment.</p>
          <p className="text-lg text-gray-700">Step 2: Register to the website.</p>
          <p className="text-lg text-gray-700">Step 3: Login to the website.</p>
          <p className="text-lg text-gray-700">Step 4: Request for equipment to rent.</p>
          <p className="text-lg text-gray-700">Step 5: Receive & use equipment.</p>
        </div>
        <div className="working-image w-full md:w-1/2 p-8">
          <img
            src="working.png"
            alt="How It Works"
            className="object-cover w-full h-80 rounded-lg shadow-md"
            style={{ height: '400px', width: '100%' }} // Uniform height and width
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section container mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="faq-content">
          <details className="bg-white shadow-lg rounded-lg mb-4 p-4">
            <summary className="font-semibold cursor-pointer">What is AgriRent?</summary>
            <p className="text-gray-600 mt-2">AgriRent is an online platform where farmers and agricultural businesses can rent equipment for their farming needs.</p>
          </details>
          <details className="bg-white shadow-lg rounded-lg mb-4 p-4">
            <summary className="font-semibold cursor-pointer">How can I rent equipment?</summary>
            <p className="text-gray-600 mt-2">You can browse available equipment on our website, select what you need, and complete the rental process online.</p>
          </details>
          <details className="bg-white shadow-lg rounded-lg mb-4 p-4">
            <summary className="font-semibold cursor-pointer">What are the payment options?</summary>
            <p className="text-gray-600 mt-2">We offer a variety of payment options, including credit/debit cards, online banking, and UPI transactions.</p>
          </details>
        </div>
      </div>

      {/* Footer Section */}
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
  );
};

export default About;
