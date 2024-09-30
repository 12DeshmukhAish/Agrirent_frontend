'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import { loginUser } from ''
import { toast, Toaster } from 'sonner' // Import Toaster
import { Button, Input } from '@nextui-org/react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { token } = await loginUser(formData)
      localStorage.setItem('token', token)
      
      // Display success toast message
      toast.success('Login successful!')

      // Clear form after submission
      setFormData({
        email: '',
        password: '',
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)

      // Display error toast message
      toast.error('Login failed. Please try again.')
    }
  }

  return (
    <div className="login-container ">
      <div className="login-image">
        <img src="/path/to/your/image.jpg" alt="Login" />
      </div>
      <div className="login-form-container">
        <h1 className="login-title text-red-500">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form__group field">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="form__field"
            />
            <label htmlFor="email" className="form__label">Email</label>
          </div>
          <div className="form__group field">
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="form__field"
            />
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <Button type="submit" className="login-submit-button">
            Login
          </Button>
        </form>
      </div>
      
      {/* Add the Toaster component to display toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}
// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// // import { signIn, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { IoIosEye, IoIosEyeOff } from "react-icons/io";
// import { RiShieldUserFill } from "react-icons/ri";
// import Image from 'next/image';

// export default function LoginComponent() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const router = useRouter();
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session?.user?.role === "department") {
//       router.replace("/admin");
//     }
//     if (session?.user?.role === "superadmin") {
//       router.replace("/super_admin");
//     }
//   }, [session, router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const result = await signIn('credentials', {
//         userId,
//         password,
//         redirect: false,
//       });

//       if (result.ok) {
//         toast.success('Login Successful');
//       } else {
//         toast.error(result.error || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Failed to login', error);
//       toast.error('Failed to login');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setUserId('');
//     setPassword('');
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="flex flex-col w-2/3 justify-center items-center bg-violet-500 rounded-r-[20%]">
//         <h3 className='text-4xl text-white'>Hey, Let&#39;s Begin</h3>
//         <Image src="/login.svg" width={600} height={600} alt="Login Image" />
//       </div>
//       <div className="flex w-1/2 justify-center items-center">
//         <form onSubmit={handleSubmit} className="w-full max-w-md">
//           <div className="w-full p-9 bg-white rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//             <div className="mb-4 text-left">
//               <Input
//                 type="text"
//                 variant="bordered"
//                 label="User Id"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 endContent={
//                   <RiShieldUserFill className="text-2xl text-default-400 pointer-events-none" />
//                 }
//                 className="mb-2"
//                 placeholder="User ID"
//               />
//             </div>
//             <div className="mb-4 text-left">
//               <Input
//                 type={isVisible ? 'text' : 'password'}
//                 label="Password"
//                 variant="bordered"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 endContent={
//                   <button
//                     type="button"
//                     onClick={toggleVisibility}
//                     className="focus:outline-none"
//                   >
//                     {isVisible ? (
//                       <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
//                     ) : (
//                       <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
//                     )}
//                   </button>
//                 }
//                 className="mb-2"
//               />
//             </div>
//             <div className="flex justify-center space-x-4 mt-10">
//               <Button variant="outline" type="button" color="default" onClick={handleCancel} className="w-36" disabled={isLoading}>
//                 Cancel
//               </Button>
//               <Button color="primary" type="submit" className="w-36" disabled={isLoading}>
//                 {isLoading ? 'Loading...' : 'Login'}
//               </Button>
//             </div>
//             <div className="mt-2">
//               <p className="text-sm">
//                 <Link href="/reset_password" className="text-blue-500">
//                   Reset password
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
