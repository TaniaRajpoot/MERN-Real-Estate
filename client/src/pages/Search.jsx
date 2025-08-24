"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import ListingItem from "../components/ListingItem"

export default function Search() {
  const location = useLocation()
  const navigate = useNavigate()

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt", // FIXED
    order: "desc",
  })

  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    const typeFromUrl = urlParams.get("type")
    const parkingFromUrl = urlParams.get("parking")
    const furnishedFromUrl = urlParams.get("furnished")
    const offerFromUrl = urlParams.get("offer")
    const sortFromUrl = urlParams.get("sort")
    const orderFromUrl = urlParams.get("order")

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      })
    }

    const fetchListings = async () => {
      setLoading(true)
      setShowMore(false)
      const searchQuery = urlParams.toString()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?${searchQuery}`)
      const data = await res.json()
      if (data.length > 8) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      setListings(data)
      setLoading(false)
    }

    fetchListings()
  }, [location.search])

  const handleChange = (e) => {
    if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
      setSidebardata({ ...sidebardata, type: e.target.id })
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value })
    }

    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false,
      })
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at"

      const order = e.target.value.split("_")[1] || "desc"

      setSidebardata({ ...sidebardata, sort, order })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set("searchTerm", sidebardata.searchTerm)
    urlParams.set("type", sidebardata.type)
    urlParams.set("parking", sidebardata.parking)
    urlParams.set("furnished", sidebardata.furnished)
    urlParams.set("offer", sidebardata.offer)
    urlParams.set("sort", sidebardata.sort)
    urlParams.set("order", sidebardata.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex", startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await res.json()
    if (data.length < 9) {
      setShowMore(false)
    }
    setListings([...listings, ...data])
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#d7d9d0] to-[#cdd0c4]">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-gradient-to-b from-[#c1c4b5] to-[#b1b5a3] backdrop-blur-sm shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#424b1e] mb-2">Search Filters</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#686f4b] to-[#424b1e] rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold text-[#424b1e]">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search properties..."
              className="border-2 border-[#9ea38c] rounded-lg p-3 w-full focus:border-[#686f4b] focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-[#9ea38c]">
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold text-[#424b1e] mb-2">Property Type:</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="all"
                    className="w-5 h-5 accent-[#686f4b]"
                    onChange={handleChange}
                    checked={sidebardata.type === "all"}
                  />
                  <span className="text-[#424b1e] font-medium">Rent & Sale</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="rent"
                    className="w-5 h-5 accent-[#686f4b]"
                    onChange={handleChange}
                    checked={sidebardata.type === "rent"}
                  />
                  <span className="text-[#424b1e] font-medium">Rent</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-5 h-5 accent-[#686f4b]"
                    onChange={handleChange}
                    checked={sidebardata.type === "sale"}
                  />
                  <span className="text-[#424b1e] font-medium">Sale</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5 h-5 accent-[#686f4b]"
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  <span className="text-[#424b1e] font-medium">Special Offer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-[#9ea38c]">
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold text-[#424b1e] mb-2">Amenities:</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5 h-5 accent-[#686f4b]"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span className="text-[#424b1e] font-medium">Parking</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5 h-5 accent-[#686f4b]"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span className="text-[#424b1e] font-medium">Furnished</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold text-[#424b1e]">Sort by:</label>
            <select
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              id="sort_order"
              className="border-2 border-[#9ea38c] rounded-lg p-3 focus:border-[#686f4b] focus:outline-none transition-colors bg-white/80 backdrop-blur-sm text-[#424b1e]"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-gradient-to-r from-[#686f4b] to-[#424b1e] text-white p-4 rounded-lg uppercase hover:from-[#424b1e] hover:to-[#2f380f] transition-all duration-300 font-semibold shadow-lg transform hover:scale-105">
            Search Properties
          </button>
        </form>
      </div>

      <div className="flex-1 bg-white/30 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-[#686f4b] to-[#424b1e] text-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-white/80 mt-2">Find your perfect property</p>
        </div>

        <div className="p-7">
          {!loading && listings.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-[#424b1e] font-semibold mb-2">No properties found!</p>
              <p className="text-[#686f4b]">Try adjusting your search filters</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <p className="text-2xl text-[#424b1e] font-semibold">Loading amazing properties...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {!loading &&
              listings &&
              listings.map((listing) => (
                <div key={listing._id} className="flex">
                  <div className="w-full transform hover:scale-105 transition-transform duration-300">
                    <ListingItem listing={listing} />
                  </div>
                </div>
              ))}
          </div>

          {showMore && (
            <div className="text-center mt-8">
              <button
                onClick={onShowMoreClick}
                className="bg-gradient-to-r from-[#9ea38c] to-[#686f4b] text-white px-8 py-4 rounded-lg hover:from-[#686f4b] hover:to-[#424b1e] transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
