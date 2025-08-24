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
          <div className="relative overflow-hidden bg-gradient-to-br from-[#d7d9d0] via-white to-[#cdd0c4] rounded-3xl p-8 shadow-xl border border-[#c1c4b5] hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#9ea38c]/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#b1b5a3]/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#686f4b] to-[#424b1e] rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#2f380f] mb-2">Recent Offers</h2>
                    <p className="text-[#686f4b] font-medium">🔥 Don't miss out on these amazing deals</p>
                  </div>
                </div>
                <Link
                  className="group bg-gradient-to-r from-[#9ea38c] to-[#686f4b] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-2"
                  to={"/search?offer=true"}
                >
                  <span>View All Offers</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {offerListings.map((listing) => (
                  <div key={listing._id} className="flex">
                    <ListingItem listing={listing} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="relative overflow-hidden bg-gradient-to-br from-[#cdd0c4] via-white to-[#c1c4b5] rounded-3xl p-8 shadow-xl border border-[#b1b5a3] hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#b1b5a3]/15 to-transparent rounded-full -translate-y-20 -translate-x-20"></div>
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-[#9ea38c]/15 to-transparent rounded-full translate-y-14 translate-x-14"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9ea38c] to-[#686f4b] rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#2f380f] mb-2">For Rent</h2>
                    <p className="text-[#686f4b] font-medium">🏠 Find your perfect rental home</p>
                  </div>
                </div>
                <Link
                  className="group bg-gradient-to-r from-[#b1b5a3] to-[#9ea38c] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-2"
                  to={"/search?type=rent"}
                >
                  <span>View All Rentals</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {rentListings.map((listing) => (
                  <div key={listing._id} className="flex">
                    <ListingItem listing={listing} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="relative overflow-hidden bg-gradient-to-br from-[#c1c4b5] via-white to-[#b1b5a3] rounded-3xl p-8 shadow-xl border border-[#9ea38c] hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#868c6f]/20 to-transparent rounded-full -translate-y-18 translate-x-18"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#686f4b]/15 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#868c6f] to-[#424b1e] rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#2f380f] mb-2">For Sale</h2>
                    <p className="text-[#686f4b] font-medium">🔑 Invest in your dream property</p>
                  </div>
                </div>
                <Link
                  className="group bg-gradient-to-r from-[#868c6f] to-[#424b1e] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-2"
                  to={"/search?type=sale"}
                >
                  <span>View All Sales</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {saleListings.map((listing) => (
                  <div key={listing._id} className="flex">
                    <ListingItem listing={listing} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
