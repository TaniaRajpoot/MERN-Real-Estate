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
    <header className="bg-gradient-to-r from-[#424b1e] to-[#2f380f] shadow-2xl border-b-4 border-[#686f4b] sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex-wrap transition-all duration-300 hover:scale-105">
            <span className="text-[#d7d9d0]">Taniva </span>
            <span className="text-[#cdd0c4]">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md p-3 rounded-xl flex items-center shadow-xl border-2 border-[#b1b5a3] hover:shadow-2xl hover:border-[#9ea38c] transition-all duration-300 hover:bg-white"
        >
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-[#2f380f] placeholder-[#686f4b] font-medium"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
          <button className="ml-2 p-2 rounded-lg hover:bg-[#b1b5a3]/30 transition-all duration-200 hover:scale-110">
            <FaSearch className="text-[#686f4b] hover:text-[#424b1e]" />
          </button>
        </form>
        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-[#d7d9d0] hover:text-[#cdd0c4] font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-[#d7d9d0] hover:text-[#cdd0c4] font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4">
              About
            </li>
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"}>
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
                className="w-10 h-10 rounded-full object-cover border-3 border-[#d7d9d0] hover:border-[#cdd0c4] transition-all duration-300 hover:scale-110 shadow-lg"
              />
            ) : (
              <li className="text-[#d7d9d0] hover:text-[#cdd0c4] font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}
