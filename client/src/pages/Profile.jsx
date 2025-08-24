import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserSuccess,
  updateUserAvatar,
} from "../redux/user/userSlice";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [avatar, setAvatar] = useState(currentUser.avatar || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
  });

  const db = getDatabase(app);

  useEffect(() => {
    setAvatar(currentUser.avatar || "");
  }, [currentUser.avatar]);

  const saveAvatarUrlToFirebase = async (userId, avatarUrl) => {
    const userRef = ref(db, "users/" + userId);
    try {
      await update(userRef, { avatar: avatarUrl });
    } catch (err) {
      console.error("Firebase update error:", err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);
    setUploadProgress(0);

    if (!file.type.startsWith("image/")) {
      setUploading(false);
      setUploadError("Please upload a valid image file (jpg, png, jpeg, etc.)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dpvjlm1wi/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (percentCompleted % 10 === 0) {
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      const imageUrl = res.data.secure_url;
      dispatch(updateUserAvatar(imageUrl));
      setAvatar(imageUrl);

      if (currentUser._id) {
        await saveAvatarUrlToFirebase(currentUser._id, imageUrl);
      }

      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditable = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = { ...formData };
      if (updatedData.password === "") {
        delete updatedData.password;
      }

      const res = await fetch(
        `https://mern-realestate-backend.vercel.app/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (!res.ok || data.success === false) {
        alert("Update failed: " + (data.message || res.statusText));
        return;
      }

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleDeleteUser = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      alert("Account deleted successfully!");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
      navigate('/signin');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      console.log(error.message);
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-2xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="text-white text-center py-6 rounded-lg mb-6 shadow-md" style={{backgroundColor: '#424b1e'}}>
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <p className="mt-2" style={{color: '#cdd0c4'}}>Manage your account and listings</p>
      </div>

      {/* Profile Form Container */}
      <div className="rounded-lg shadow-lg p-6 mb-6 border" style={{backgroundColor: 'white', borderColor: '#c1c4b5'}}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={handleUpload}
              />
              <img
                onClick={() => fileRef.current.click()}
                src={avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                }}
                alt="profile"
                className="rounded-full h-24 w-24 object-cover cursor-pointer border-4 shadow-md"
                style={{borderColor: '#868c6f'}}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <span className="text-white text-sm">{uploadProgress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Status Messages */}
          {uploading && (
            <p className="text-center font-semibold" style={{color: '#424b1e'}}>
              Uploading... {uploadProgress}%
            </p>
          )}
          {!uploading && uploadProgress === 100 && !uploadError && (
            <p className="text-center font-semibold" style={{color: '#686f4b'}}>
              Image Upload Successful!
            </p>
          )}
          {uploadError && (
            <p className="text-center text-red-600 font-semibold">
              {uploadError}
            </p>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#2f380f'}}>
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={formData.username}
                onChange={handleEditable}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg focus:ring-2 focus:border-transparent shadow-sm"
                style={{
                  border: `2px solid #b1b5a3`,
                  backgroundColor: isEditing ? 'white' : '#f9f9f9',
                  color: '#2f380f'
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#2f380f'}}>
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleEditable}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg focus:ring-2 focus:border-transparent shadow-sm"
                style={{
                  border: `2px solid #b1b5a3`,
                  backgroundColor: isEditing ? 'white' : '#f9f9f9',
                  color: '#2f380f'
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{color: '#2f380f'}}>
              Password
            </label>
            <input
              type="password"
              placeholder="New Password (leave blank to keep current)"
              id="password"
              value={formData.password}
              onChange={handleEditable}
              disabled={!isEditing}
              className="w-full p-3 rounded-lg focus:ring-2 focus:border-transparent shadow-sm"
              style={{
                border: `2px solid #b1b5a3`,
                backgroundColor: isEditing ? 'white' : '#f9f9f9',
                color: '#2f380f'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="  text-white rounded-lg p-3 font-medium transition duration-200 shadow-md hover:shadow-lg"
              style={{backgroundColor: '#686f4b'}}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            
            {isEditing && (
              <button
                type="submit"
                className="bg-green-700 text-white rounded-lg p-3 font-medium transition duration-200 shadow-md hover:shadow-lg"
                // style={{backgroundColor: '#9ea38c'}}
              >
                Save Changes
              </button>
            )}
            
            <Link 
              className=" bg-orange-400 text-white p-3 rounded-lg text-center font-medium transition duration-200 shadow-md hover:shadow-lg" 
              to={"/create-listing"}
              // style={{backgroundColor: '#b1b5a3'}}
            >
              Create New Listing
            </Link>
          </div>
        </form>

        {/* Account Actions */}
        <div className="flex justify-between mt-6 pt-6" style={{borderTop: `1px solid #c1c4b5`}}>
          <span 
            onClick={handleDeleteUser} 
            className="cursor-pointer hover:underline font-medium"
            style={{color: '#424b1e'}}
          >
            Delete Account
          </span>
          <span 
            onClick={handleSignOut} 
            className="cursor-pointer hover:underline font-medium"
            style={{color: '#424b1e'}}
          >
            Sign Out
          </span>
        </div>
      </div>

      {/* Show Listings Button */}
      <div className="rounded-lg p-4 mb-6 border shadow-md" style={{backgroundColor: '#f9f9f9', borderColor: '#c1c4b5'}}>
        <button 
          onClick={handleShowListings} 
          className="w-full text-white py-3 px-4 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
          style={{backgroundColor: '#868c6f'}}
        >
          Show My Listings
        </button>
        {showListingError && (
          <p className="text-red-600 mt-3 text-center font-medium">
            Error Showing Listings
          </p>
        )}
      </div>

      {/* Property Listings */}
      {userListings && userListings.length > 0 && (
        <div className="rounded-lg p-6 border shadow-md" style={{backgroundColor: '#f9f9f9', borderColor: '#c1c4b5'}}>
          <h2 className="text-center text-2xl font-semibold mb-6" style={{color: '#2f380f'}}>
            Your Property Listings
          </h2>
          
          <div className="space-y-4">
            {userListings.map((listing) => (
              <div 
                key={listing._id} 
                className="bg-white rounded-lg p-4 flex items-center justify-between gap-4 shadow-md hover:shadow-lg transition duration-200 border"
                style={{borderColor: '#c1c4b5'}}
              >
                <Link to={`/listing/${listing._id}`} className="flex-shrink-0">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-cover rounded-lg shadow-sm"
                  />
                </Link>
                
                <Link
                  className="font-semibold hover:underline flex-1 text-left"
                  to={`/listing/${listing._id}`}
                  style={{color: '#2f380f'}}
                >
                  <p className="truncate">{listing.name}</p>
                  <p className="text-sm mt-1" style={{color: '#686f4b'}}>Click to view details</p>
                </Link>
                
                <div className="flex gap-2">
                  <Link to={`/update-listing/${listing._id}`}>
                    <button 
                      className="text-white px-4 py-2 rounded font-medium transition duration-200 shadow-md hover:shadow-lg"
                      style={{backgroundColor: '#868c6f'}}
                    >
                      Edit
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleListingDelete(listing._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition duration-200 shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}