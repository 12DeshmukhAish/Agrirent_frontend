'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Show success toast message
        toast.success('Registration successful!')

        // Clear form fields after successful registration
        setFormData({
          fullName: '',
          email: '',
          contactNumber: '',
          address: '',
          password: '',
          confirmPassword: '',
        })

        // Redirect to login page after successful registration
        router.push('/login')
      } else {
        const errorData = await response.json()
        setError(errorData.error)
        // Show error toast message
        toast.error(errorData.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      setError("Registration failed. Please try again.")
      console.error('Error during registration:', error)
      toast.error("Registration failed. Please try again.")
    }
  }

  return (
    <div className="register-page">
      <div className="image-section">
        {/* Add your image URL here */}
        <img src="/path-to-your-image.jpg" alt="Register" className="register-image" />
      </div>
      <div className="form-section">
        <h1 className="register-title">Create Your Account</h1>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name Input */}
          <div className="form__group field">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="form__field"
            />
            <label htmlFor="fullName" className="form__label">Full Name</label>
          </div>

          {/* Email Input */}
          <div className="form__group field">
            <input
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

          {/* Contact Number Input */}
          <div className="form__group field">
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              required
              className="form__field"
            />
            <label htmlFor="contactNumber" className="form__label">Contact Number</label>
          </div>

          {/* Address Input */}
          <div className="form__group field">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="form__field"
            />
            <label htmlFor="address" className="form__label">Address</label>
          </div>

          {/* Password Input */}
          <div className="form__group field">
            <input
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

          {/* Confirm Password Input */}
          <div className="form__group field">
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="form__field"
            />
            <label htmlFor="confirmPassword" className="form__label">Confirm Password</label>
          </div>

          <button type="submit" className="reg-button">Register</button>
        </form>
      </div>
      {/* Add the Toaster component to display toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}
