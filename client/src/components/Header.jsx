"use client"

import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-gradient-to-r from-[#d7d9d0] via-[#cdd0c4] to-[#c1c4b5] shadow-lg border-b border-[#b1b5a3]/30 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        <Link to="/" className="group">
          <h1 className="font-bold text-xl sm:text-3xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-lg">
            <span className="text-[#424b1e] group-hover:text-[#2f380f] transition-colors duration-300">Taniva </span>
            <span className="text-[#686f4b] group-hover:text-[#424b1e] transition-colors duration-300">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-lg p-2.5 rounded-2xl flex items-center shadow-lg border border-[#b1b5a3]/50 hover:shadow-xl hover:border-[#9ea38c] transition-all duration-500 ease-out hover:bg-white group focus-within:ring-2 focus-within:ring-[#9ea38c]/50 focus-within:border-[#868c6f]"
        >
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent focus:outline-none w-32 sm:w-72 text-[#2f380f] placeholder-[#686f4b]/70 font-medium px-2 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
          <button
            type="submit"
            className="ml-1 p-2.5 rounded-xl hover:bg-[#b1b5a3]/20 transition-all duration-300 ease-out hover:scale-110 active:scale-95 group-hover:bg-[#9ea38c]/20"
          >
            <FaSearch className="text-[#686f4b] group-hover:text-[#424b1e] transition-colors duration-300" />
          </button>
        </form>
        <ul className="flex gap-8 items-center">
          <Link to="/" className="group">
            <li className="text-[#424b1e] hover:text-[#2f380f] font-medium transition-all duration-300 ease-out relative">
              <span className="group-hover:drop-shadow-sm">Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#686f4b] group-hover:w-full transition-all duration-300 ease-out"></span>
            </li>
          </Link>
          <Link to="/about" className="group">
            <li className="hidden sm:inline text-[#424b1e] hover:text-[#2f380f] font-medium transition-all duration-300 ease-out relative">
              <span className="group-hover:drop-shadow-sm">About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#686f4b] group-hover:w-full transition-all duration-300 ease-out"></span>
            </li>
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"} className="group">
            {currentUser ? (
              <img
                src={
                  currentUser?.avatar?.trim()
                    ? currentUser.avatar
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }}
                alt="profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#424b1e]/80 hover:border-[#2f380f] transition-all duration-500 ease-out hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-transparent hover:ring-[#686f4b]/30"
              />
            ) : (
              <li className="text-[#424b1e] hover:text-[#2f380f] font-medium transition-all duration-300 ease-out relative">
                <span className="group-hover:drop-shadow-sm">Sign in</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#686f4b] group-hover:w-full transition-all duration-300 ease-out"></span>
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}
