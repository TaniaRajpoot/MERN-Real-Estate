"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, EffectFade } from "swiper/modules"
import SwiperCore from "swiper"
import "swiper/css/bundle"
import "swiper/css/effect-fade"
import ListingItem from "../components/ListingItem"

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation, Autoplay, EffectFade])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?type=rent&limit=4`)
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?type=sale&limit=4`)
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d7d9d0] to-[#cdd0c4]">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20"></div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col gap-8 p-28 px-6 max-w-7xl mx-auto relative z-10">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-[#2f380f] font-bold text-4xl lg:text-7xl leading-tight tracking-tight">
              Find your next{" "}
              <span className="bg-gradient-to-r from-[#686f4b] to-[#424b1e] bg-clip-text text-transparent animate-pulse">
                perfect
              </span>
              <br />
              place with ease
            </h1>

            <div className="text-[#868c6f] text-base sm:text-lg max-w-2xl leading-relaxed">
              Taniva Estate is the best place to find your next perfect place to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={"/search"}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#686f4b] to-[#424b1e] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              <span>Start Your Search</span>
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              to={"/about"}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#9ea38c] text-[#424b1e] font-semibold rounded-xl hover:bg-[#9ea38c] hover:text-white transition-all duration-300 text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c1c4b5]">
              <div className="text-3xl font-bold text-[#424b1e]">500+</div>
              <div className="text-[#868c6f] text-sm">Properties Listed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c1c4b5]">
              <div className="text-3xl font-bold text-[#424b1e]">200+</div>
              <div className="text-[#868c6f] text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c1c4b5]">
              <div className="text-3xl font-bold text-[#424b1e]">50+</div>
              <div className="text-[#868c6f] text-sm">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Swiper Section */}
      <div className="relative py-16 bg-gradient-to-b from-[#cdd0c4] to-[#c1c4b5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2f380f] mb-4">Featured Properties</h2>
            <p className="text-[#686f4b] text-lg">Discover our handpicked selection of premium properties</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
              navigation
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="h-[600px]"
            >
              {offerListings &&
                offerListings.length > 0 &&
                offerListings.map((listing) => (
                  <SwiperSlide key={listing._id}>
                    <div className="relative h-full">
                      <div
                        style={{
                          background: `url(${listing.imageUrls[0]}) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                        className="h-full"
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="max-w-4xl">
                          <h3 className="text-3xl font-bold mb-2">{listing.name}</h3>
                          <p className="text-lg opacity-90 mb-4">{listing.address}</p>
                          <div className="flex items-center gap-4">
                            <span className="bg-[#686f4b] px-4 py-2 rounded-full text-sm font-semibold">
                              ${listing.regularPrice?.toLocaleString()}
                            </span>
                            <Link
                              to={`/listing/${listing._id}`}
                              className="bg-white text-[#424b1e] px-6 py-2 rounded-full font-semibold hover:bg-[#d7d9d0] transition-colors duration-300"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Enhanced Listing Sections */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col gap-16 my-16">
        {offerListings && offerListings.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#c1c4b5]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#2f380f] mb-2">Recent Offers</h2>
                <p className="text-[#868c6f]">Don't miss out on these amazing deals</p>
              </div>
              <Link
                className="bg-gradient-to-r from-[#9ea38c] to-[#686f4b] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                to={"/search?offer=true"}
              >
                View All Offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#c1c4b5]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#2f380f] mb-2">For Rent</h2>
                <p className="text-[#868c6f]">Find your perfect rental home</p>
              </div>
              <Link
                className="bg-gradient-to-r from-[#9ea38c] to-[#686f4b] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                to={"/search?type=rent"}
              >
                View All Rentals
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#c1c4b5]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#2f380f] mb-2">For Sale</h2>
                <p className="text-[#868c6f]">Invest in your dream property</p>
              </div>
              <Link
                className="bg-gradient-to-r from-[#9ea38c] to-[#686f4b] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                to={"/search?type=sale"}
              >
                View All Sales
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
