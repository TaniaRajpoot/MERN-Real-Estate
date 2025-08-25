"use client"

import { useEffect, useState } from "react"
// import { getDatabase, ref, set } from 'firebase/database';
// import { app } from '../firebase'; // Your Firebase config
import { useNavigate, useParams } from "react-router-dom"
export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "", // either 'sale' or 'rent'
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })

  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const { listingId } = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId
      const res = await fetch(`/api/listing/get/${listingId}`)
      const data = await res.json()

      if (data.success === false) {
        console.log(data.message)
        return
      }

      setFormData(data)
    }

    fetchListing()
  }, [])

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageSubmit = async () => {
    if (files.length < 1 || files.length > 6) {
      setUploadError("Please upload between 1 and 6 images")
      return
    }

    setUploading(true)
    setUploadError("")

    try {
      const uploadPromises = files.map(uploadToCloudinary)
      const urls = await Promise.all(uploadPromises)
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }))
    } catch (err) {
      setUploadError("Image upload failed. Try again.", err.message)
    }

    setUploading(false)
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "unsigned_preset") // Replace with your preset
    formData.append("cloud_name", "dpvjlm1wi") // Replace with your cloud name

    const res = await fetch("https://api.cloudinary.com/v1_1/dpvjlm1wi/image/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    return data.secure_url
  }

  const handleRemoveImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((img) => img !== url),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.type) {
      alert("Please select Sale or Rent")
      return
    }

    setSaving(true)

    try {
      // Replace with your actual backend URL
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ this sends your cookie!
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to create listing")
      }

      const data = await res.json()
      console.log(data)

      alert("Listing updated successfully!")
      navigate(`/listing/${listingId}`)

      // Optionally clear form or redirect user here
    } catch (error) {
      alert("Failed to create listing: " + error.message)
    }

    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d7d9d0] via-[#cdd0c4] to-[#c1c4b5] py-8">
      <main className="p-6 max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#b1b5a3]/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#424b1e] to-[#686f4b] p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Update Listing</h1>
            <p className="text-white/80 text-lg">Modify your property details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 flex flex-col lg:flex-row gap-8">
            {/* LEFT SIDE */}
            <div className="flex flex-col flex-1 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[#424b1e] font-semibold mb-2">Property Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter property name"
                    className="w-full p-4 border-2 border-[#b1b5a3]/30 rounded-xl focus:border-[#868c6f] focus:ring-2 focus:ring-[#868c6f]/20 transition-all duration-300 bg-white/80"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#424b1e] font-semibold mb-2">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property"
                    rows="4"
                    className="w-full p-4 border-2 border-[#b1b5a3]/30 rounded-xl focus:border-[#868c6f] focus:ring-2 focus:ring-[#868c6f]/20 transition-all duration-300 bg-white/80 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#424b1e] font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Property address"
                    className="w-full p-4 border-2 border-[#b1b5a3]/30 rounded-xl focus:border-[#868c6f] focus:ring-2 focus:ring-[#868c6f]/20 transition-all duration-300 bg-white/80"
                    required
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="bg-[#d7d9d0]/30 p-6 rounded-xl">
                <h3 className="text-[#424b1e] font-semibold mb-4">Property Type</h3>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.type === "sale"}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          type: prev.type === "sale" ? "" : "sale",
                        }))
                      }
                      className="w-5 h-5 text-[#424b1e] rounded focus:ring-[#868c6f]"
                    />
                    <span className="text-[#424b1e] font-medium">For Sale</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.type === "rent"}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          type: prev.type === "rent" ? "" : "rent",
                        }))
                      }
                      className="w-5 h-5 text-[#424b1e] rounded focus:ring-[#868c6f]"
                    />
                    <span className="text-[#424b1e] font-medium">For Rent</span>
                  </label>
                </div>
              </div>

              {/* Features */}
              <div className="bg-[#d7d9d0]/30 p-6 rounded-xl">
                <h3 className="text-[#424b1e] font-semibold mb-4">Property Features</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["parking", "furnished", "offer"].map((id) => (
                    <label key={id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id={id}
                        checked={formData[id]}
                        onChange={handleChange}
                        className="w-5 h-5 text-[#424b1e] rounded focus:ring-[#868c6f]"
                      />
                      <span className="text-[#424b1e] font-medium capitalize">{id}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Numbers */}
              <div className="bg-[#d7d9d0]/30 p-6 rounded-xl">
                <h3 className="text-[#424b1e] font-semibold mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  {["bedrooms", "bathrooms", "regularPrice", "discountPrice"].map((id) => {
                    const isPrice = id === "regularPrice" || id === "discountPrice"
                    return (
                      <div key={id}>
                        <label className="block text-[#424b1e] font-medium mb-2">
                          {id === "bedrooms"
                            ? "Bedrooms"
                            : id === "bathrooms"
                              ? "Bathrooms"
                              : id === "regularPrice"
                                ? "Regular Price"
                                : "Discounted Price"}
                          {isPrice && <span className="text-sm text-[#686f4b]"> ($/month)</span>}
                        </label>
                        <input
                          type="number"
                          id={id}
                          min={isPrice ? 50 : 1}
                          max={isPrice ? 1000000 : 10}
                          value={formData[id]}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-[#b1b5a3]/30 rounded-lg focus:border-[#868c6f] focus:ring-2 focus:ring-[#868c6f]/20 transition-all duration-300 bg-white/80"
                          required
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col flex-1 space-y-6">
              <div className="bg-[#d7d9d0]/30 p-6 rounded-xl">
                <h3 className="text-[#424b1e] font-semibold mb-4">
                  Property Images
                  <span className="text-sm font-normal text-[#686f4b] ml-2">
                    (First image will be the cover, max 6 images)
                  </span>
                </h3>

                <div className="flex gap-4 mb-4">
                  <input
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                    className="flex-1 p-3 border-2 border-[#b1b5a3]/30 rounded-lg bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#424b1e] file:text-white file:cursor-pointer"
                    type="file"
                    accept="image/*"
                    multiple
                  />
                  <button
                    type="button"
                    onClick={handleImageSubmit}
                    disabled={uploading}
                    className="px-6 py-3 bg-gradient-to-r from-[#868c6f] to-[#9ea38c] text-white rounded-lg font-medium hover:from-[#686f4b] hover:to-[#868c6f] disabled:opacity-50 transition-all duration-300"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>

                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-red-600 text-sm">{uploadError}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-[#b1b5a3]/30"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#424b1e] to-[#686f4b] text-white p-4 rounded-xl font-semibold text-lg hover:from-[#2f380f] hover:to-[#424b1e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {saving ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating Listing...
                  </div>
                ) : (
                  "Update Listing"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
