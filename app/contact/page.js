'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import { Button, Input } from '@nextui-org/react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with actual submission logic
      console.log(formData); // This simulates form submission

      // Display success toast message
      toast.success('Your message has been sent successfully!');

      // Clear form after submission
      setFormData({
        name: '',
        email: '',
        description: '',
      });

      // Optionally, redirect to another page after submission
      // router.push('/thank-you');
    } catch (error) {
      console.error('Submission failed:', error);

      // Display error toast message
      toast.error('Failed to send your message. Please try again.');
    }
  };

  return (
    <div className="contact-container flex items-center justify-center bg-green-100 relative min-h-screen">
      <div className="contact-form-wrapper flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="contact-image w-100 hidden md:block">
          <img src="/contact.png" alt="Contact Us" className="object-cover h-full w-full" />
        </div>
        <div className="contact-form-container w-full md:w-2/3 lg:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="contact-title text-black-500 text-3xl font-bold mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit} className="contact-form">
            {/* Name Field */}
            <div className="form__group field mb-6">
              <Input
                label="Name"
                variant="bordered"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            {/* Email Field */}
            <div className="form__group field mb-6">
              <Input
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            {/* Description Field */}
            <div className="form__group field mb-6">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your message"
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center space-x-2 mb-4">
              <Button type="submit" className="contact-submit-button bg-green-500 text-white hover:bg-green-600 transition-colors">
                Submit
              </Button>
              <Button type="button" className="contact-cancel-button" onClick={() => router.push('/')}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}





















// "use client"; // Ensure this component is client-side

// import { useState } from "react";

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     description: ""
//   });

//   // Handle form input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logic to handle form submission
//     console.log(formData);
//   };

//   return (
//     <div className="container mx-auto px-4 py-10">
//       {/* Contact Us Container */}
//       <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//         {/* First Column: Image */}
//         <div className="flex items-center justify-center">
//           <img
//             src="/contact-image.png" // Replace with your image path
//             alt="Contact Us"
//             className="object-cover rounded-lg shadow-lg w-full h-auto"
//           />
//         </div>

//         {/* Second Column: Form */}
//         <div className="p-8">
//           <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-gray-700 font-medium">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700 font-medium">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>

//             {/* Description Field */}
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 font-medium">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 id="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//                 rows="4"
//                 required
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }










