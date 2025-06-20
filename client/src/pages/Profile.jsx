import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import { Link } from "react-router-dom";
import Listing from "../../../api/models/listing.model";

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
  const [showListingError ,setShowListingError] = useState(false);
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
    formData.append("upload_preset", "unsigned_preset"); // 🔁 Replace with your own Cloudinary preset

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
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        alert("Update failed: " + data.message);
        return;
      }

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Upd ate error:", error);
      alert("An error occurred while updating profile.");
    }
  };

  const handleDeleteUser = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      alert("Account deleted successfully!");
      // Optionally redirect
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

const handleSignOut = async () => {
  try {
    const res = await fetch('/api/auth/signout', {
      method: 'GET',
      credentials: 'include', // ✅ if using cookies
    });
    const data = await res.json();

    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }

    dispatch(signOutUserSuccess()); // ✅ clear currentUser in Redux
    navigate('/signin'); // ✅ redirect
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

const handleShowListings =  async () =>{
  try {
    setShowListingError(false);
     const res = await fetch (`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if(data.success === false){
      setShowListingError(true);
      return;
    }
    setUserListings(data);
  } catch (error) {
    console.log(error.message)
    setShowListingError(true);
  }

};

const handleListingDelete = async (listingId) =>{
  try {
    const res =  await fetch(`/api/listing/delete/${listingId}`,{
      method:'DELETE',
    });
    const data = await res.json();
    if (data.succcess ===  false){
      return;
    }

    setUserListings((prev)=> 
    prev.filter((listing) =>listing._id !== listingId));
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleUpload}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {uploading && (
          <p className="text-center text-blue-600 font-semibold mt-2">
            Uploading... {uploadProgress}%
          </p>
        )}
        {!uploading && uploadProgress === 100 && !uploadError && (
          <p className="text-center text-green-600 font-semibold mt-2">
            Image Upload Successful!
          </p>
        )}
        {uploadError && (
          <p className="text-center text-red-600 font-semibold mt-2">
            {uploadError}
          </p>
        )}
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleEditable}
          disabled={!isEditing}
          className="border p-3 rounded-lg mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleEditable}
          disabled={!isEditing}
          className="border p-3 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleEditable}
          disabled={!isEditing}
          className="border p-3 rounded-lg mb-4"
        />
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
        {isEditing && (
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg p-3 uppercase mt-4 hover:opacity-95 "
          >
            Save Changes
          </button>
        )}
        <Link  className="bg-orange-400 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 " to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span 
        onClick={handleSignOut}
        className="text-red-700 cursor-pointer"
        >
          Sign Out</span>
      </div>

      <button  onClick={handleShowListings} className="text-green-700 w-full ">Show listings</button>
      <p className="text-red-700 mt-5">{showListingError ? 'Error Showing Listings': ''}</p>
    
    {userListings && 
    userListings.length > 0 && 
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold ">Your Listings </h1>
    {userListings.map((listing) => (
  <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
    <Link to={`/listing/${listing._id}`}>
      <img
        src={listing.imageUrls[0]}
        alt="listing cover"
        className="h-16 w-16 object-contain"
      />
    </Link>
    <Link  className=' text-slate-700 forn-semibold hover:underline truncate flex-1'to ={`/listing/${listing._id}`}>
    <p>{listing.name}</p>
    </Link>

    <div className="flex flex-col items-center">
      <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
      <Link to={`/update-listing/${listing._id}`}>
      <button className="text-green-700 uppercase">Edit</button>
      </Link>
    </div>
  </div>
))}
 </div>
}

    </div>
  );
}
