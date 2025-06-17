import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="p-3 mx-w-lg mx-auto ">
     <h1 className='tesxt-3xl font-semibold text-center my-7 '>Profile</h1>
    <form className="flex flex-col  ">
      <img src={currentUser.avatar} alt = 'profile' 
      className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2  gap-4"/>

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
        type="text"
        placeholder="password"
        id="password"
        defaultValue={currentUser.email}
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
      <span className="text-red-700 cursor-pointer ">Delete Account</span>
      <span className="text-red-700 cursor-pointer ">Sign Out </span>
    </div>
    </div>
  )
}
