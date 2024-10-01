'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react'; // Ensure @nextui-org/react is installed
import Image from 'next/image'; // Import Image component from Next.js
import { toast } from 'sonner';
export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Registration successful!');
        setFormData({
          fullName: '',
          email: '',
          contactNumber: '',
          address: '',
          password: '',
          confirmPassword: '',
        });
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        toast.error(errorData.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="flex flex-col w-2/3 justify-center items-center bg-green-100 rounded-r-[20%] relative">
        <Image
          src="/backReg.png" 
          width={700} height={700} // Ensure this path is correct in your public directory
          alt="Registration"
          //layout="fill" // Set to 'intrinsic' or 'responsive' to avoid covering the entire area
          objectFit="cover"
          className="rounded-r-[20%]" // Ensure the image respects the rounded corners
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-1/2 justify-center items-center">
        <div className="w-full p-9 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name and Email Input */}
            <div className="flex gap-6">
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                variant="bordered"
                label="Full Name"
                placeholder="John Doe"
                className="flex-1"
                required
                labelClassName="text-lg" // Bold label
                placeholderClassName="text-sm" // Smaller placeholder
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="bordered"
                label="Email"
                placeholder="johndoe@example.com"
                className="flex-1"
                required
                labelClassName="text-lg" // Bold label
                placeholderClassName="text-sm" // Smaller placeholder
              />
            </div>

            {/* Contact Number and Address Input */}
            <div className="flex gap-6">
              <Input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                variant="bordered"
                label="Contact Number"
                placeholder="+1 234 567 890"
                className="flex-1"
                required
                labelClassName="text-lg" // Bold label
                placeholderClassName="text-sm" // Smaller placeholder
              />
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="bordered"
                label="Address"
                placeholder="123 Main St"
                className="flex-1"
                required
                labelClassName="text-lg" // Bold label
                placeholderClassName="text-sm" // Smaller placeholder
              />
            </div>

            {/* Password and Confirm Password Input */}
            <div className="flex gap-6">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="bordered"
                label="Password"
                placeholder="Strong password"
                className="flex-1"
                required
                labelClassName="text-lg" // Bold label
                placeholderClassName="text-sm" // Smaller placeholder
              />
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="bordered"
                label="Confirm Password"
                placeholder="Re-enter password"
                className="flex-1"
                required
                labelClassName="text-lg" // Bold label
                placeholderClassName="text-sm" // Smaller placeholder
              />
            </div>

            {/* Cancel and Register Buttons */}
            <div className="flex gap-4 justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Register
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>

            {/* Already Registered? Sign In Link */}
            <div className="text-center mt-4">
              <p className="text-gray-700">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}
