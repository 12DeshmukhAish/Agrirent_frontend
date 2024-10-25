'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import { Button, Input } from '@nextui-org/react';
import Sidebar from './Sidebar'; // Import the Sidebar component

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
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
      <button
        className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded shadow-md hover:bg-green-600"
        onClick={() => setSidebarOpen(true)}
      >
        Open Sidebar
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="contact-form-wrapper flex w-full max-w-4xl bg-white shadow-black shadow-lg rounded-lg overflow-hidden">
        <div className="contact-image" style={{ flex: '0 0 50%' }}>
          <img src="/contact.png" alt="Contact Us" className="object-cover h-full w-full" />
        </div>
        <div className="contact-form-container" style={{ flex: '0 0 50%' }}>
          <div className="p-10 flex flex-col justify-center">
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
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
