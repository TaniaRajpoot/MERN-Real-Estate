import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { updateUserAvatar } from "../redux/user/userSlice";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(""); // ❌ Error state
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  const db = getDatabase(
    app,
    "https://mern-estate-b4e47-default-rtdb.asia-southeast1.firebasedatabase.app"
  );

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

    setUploadError(""); // clear any previous errors
    setUploading(true);
    setUploadProgress(0);

    // ❌ Validate file type
    if (!file.type.startsWith("image/")) {
      setUploading(false);
      setUploadError("Please upload a valid image file (jpg, png, jpeg, etc.)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset"); // Replace with your own

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
              console.log(`Uploading... ${percentCompleted}%`);
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      const imageUrl = res.data.secure_url;
      console.log("Uploaded image URL:", imageUrl);

      dispatch(updateUserAvatar(imageUrl));
      setAvatar(imageUrl);

      if (currentUser._id) {
        await saveAvatarUrlToFirebase(currentUser._id, imageUrl);
      }

      alert(" Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
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
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 gap-4"
        />
        {/* Show Upload Progress */}
        {uploading && (
          <p className="text-center text-blue-600 font-semibold mt-2">
            Uploading... {uploadProgress}%
          </p>
        )}
        {/* Show Success Message */}
        {!uploading && uploadProgress === 100 && !uploadError && (
          <p className="text-center text-green-600 font-semibold mt-2">
             Image Upload Successful!
          </p>
        )}
        {/* Show Error */}
        {uploadError && (
          <p className="text-center text-red-600 font-semibold mt-2">
            {uploadError}
          </p>
        )}
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg mb-4"
          disabled
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg mb-4"
          disabled
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          defaultValue="********"
          className="border p-3 rounded-lg mb-4"
          disabled
        />
        <button
          type="button"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Edit Profile
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
