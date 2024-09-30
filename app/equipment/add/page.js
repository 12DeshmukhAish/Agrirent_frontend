'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Textarea } from "@nextui-org/react";

export default function AddEquipment() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    condition: '',
    rentalPrice: '',
    availabilityDate: '',
    image: '',
    ownerName: '',
    address: '',
    contactNumber: '',
  })
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await addEquipment(formData)
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
      console.error('Failed to add equipment:', error)
    }
  }

  return (
    <div className="add-equipment-page-container">
      {/* Left Side: Image */}
      <div className="add-equipment-image-container">
        <img
          src="/path-to-your-image.jpg" // Replace with your actual image URL
          alt="Add Equipment"
          className="add-equipment-image"
        />
      </div>

      {/* Right Side: Form */}
      <div className="add-equipment-form-container">
        <h1 className="add-equipment-title">Add New Equipment</h1>
        {error && <p className="add-equipment-error">{error}</p>}
        <form onSubmit={handleSubmit} className="add-equipment-form">
          
          {/* Row 1: Equipment Name and Condition */}
          <div className="form-row">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Equipment Name"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
            <Input
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              label="Condition"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
          </div>

          {/* Row 2: Rental Price and Availability Date */}
          <div className="form-row">
            <Input
              name="rentalPrice"
              type="number"
              value={formData.rentalPrice}
              onChange={handleChange}
              label="Rental Price"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
            <Input
              name="availabilityDate"
              type="date"
              value={formData.availabilityDate}
              onChange={handleChange}
              label="Availability Date"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
          </div>

          {/* Row 3: Description */}
          <div className="form-row">
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              label="Description"
              variant="bordered"
              isRequired
              className="w-full"
            />
          </div>

          {/* Row 4: Image URL and Owner Name */}
          <div className="form-row">
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              label="Image URL"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
            <Input
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              label="Owner Name"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
          </div>

          {/* Row 5: Address and Contact Number */}
          <div className="form-row">
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
            <Input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              label="Contact Number"
              variant="bordered"
              isRequired
              className="max-w-xs"
            />
          </div>

          <button className="btn1">
            <div className="wrapper">
              <p className="text">Add Equipment</p>
              <div className="flower flower1">
                <div className="petal one"></div>
                <div className="petal two"></div>
                <div className="petal three"></div>
                <div className="petal four"></div>
              </div>
              {/* ... (rest of the button flower elements) ... */}
            </div>
          </button>

        </form>
      </div>
    </div>
  )
}