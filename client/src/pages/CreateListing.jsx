import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: '',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 500,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageSubmit = async () => {
    if (files.length < 1 || files.length > 6) {
      setUploadError('Please upload between 1 and 6 images');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const uploadPromises = files.map(uploadToCloudinary);
      const urls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } catch (err) {
      setUploadError('Image upload failed. Try again.', err.message);
    }

    setUploading(false);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');
    formData.append('cloud_name', 'dpvjlm1wi');

    const res = await fetch('https://api.cloudinary.com/v1_1/dpvjlm1wi/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleRemoveImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((img) => img !== url),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) {
      alert('Please select Sale or Rent');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('https://mern-realestate-backend.vercel.app/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create listing');
      }

      const data = await res.json();
      alert('Listing created successfully!');
      navigate(`/listing/${data._id}`);
    } catch (error) {
      alert('Failed to create listing: ' + error.message);
    }

    setSaving(false);
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-lg"
            required
          />
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.type === 'sale'}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: prev.type === 'sale' ? '' : 'sale',
                  }))
                }
              />
              Sale
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.type === 'rent'}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: prev.type === 'rent' ? '' : 'rent',
                  }))
                }
              />
              Rent
            </label>
          </div>

          <div className="flex gap-6 flex-wrap">
            {['parking', 'furnished', 'offer'].map((id) => (
              <label key={id} className="flex items-center gap-2">
                <input type="checkbox" id={id} checked={formData[id]} onChange={handleChange} />
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </label>
            ))}
          </div>

          {/* ✅ UPDATED RANGE */}
          <div className="flex flex-wrap gap-6">
            {['bedrooms', 'bathrooms', 'regularPrice', 'discountPrice'].map((id) => {
              const isPrice = id === 'regularPrice' || id === 'discountPrice';
              return (
                <div key={id} className="flex items-center gap-2">
                  <input
                    type="number"
                    id={id}
                    min={isPrice ? 500 : 1}
                    max={isPrice ? 1000000 : 10}
                    value={formData[id]}
                    onChange={handleChange}
                    className="p-3 border border-grey-300 rounded-lg"
                    required
                  />
                  <div>
                    <p>
                      {id === 'bedrooms'
                        ? 'Beds'
                        : id === 'bathrooms'
                        ? 'Baths'
                        : id === 'regularPrice'
                        ? 'Regular Price'
                        : 'Discounted Price'}
                    </p>
                    {isPrice && <span className="text-xs">($ / month)</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images:{' '}
            <span className="font-normal text-gray-600 ml-2">
              First image = cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="p-3 border rounded w-full"
              type="file"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg"
            >
              Upload
            </button>
          </div>

          {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
          {uploadError && <p className="text-red-600 mt-2">{uploadError}</p>}

          <div className="flex gap-4 flex-wrap mt-4">
            {formData.imageUrls.map((url, index) => (
              <div key={index} className="relative w-28 h-28">
                <img
                  src={url}
                  alt={`uploaded-${index}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="p-3 mt-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
          >
            {saving ? 'Saving...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </main>
  );
}
