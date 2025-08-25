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
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-8 lg:p-28 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in">
            <h1 className="text-[#2f380f] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-7xl leading-tight tracking-tight">
              Find your next{" "}
              <span className="text-[#686f4b] animate-pulse">
                perfect
              </span>
              <br />
              place with ease
            </h1>

            <div className="text-[#868c6f] text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Taniva Estate is the best place to find your next perfect place to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link
              to={"/search"}
              className="group inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-[#686f4b] hover:bg-[#5c634a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              <span>Start Your Search</span>
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              to={"/about"}
              className="inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-2 border-[#9ea38c] text-[#424b1e] font-semibold rounded-xl hover:bg-[#9ea38c] hover:text-white transition-all duration-300 text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 lg:pt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c1c4b5]">
              <div className="text-2xl sm:text-3xl font-bold text-[#424b1e]">500+</div>
              <div className="text-[#868c6f] text-xs sm:text-sm">Properties Listed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c1c4b5]">
              <div className="text-2xl sm:text-3xl font-bold text-[#424b1e]">200+</div>
              <div className="text-[#868c6f] text-xs sm:text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c1c4b5]">
              <div className="text-2xl sm:text-3xl font-bold text-[#424b1e]">50+</div>
              <div className="text-[#868c6f] text-xs sm:text-sm">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Swiper Section */}
      <div className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#cdd0c4] to-[#c1c4b5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2f380f] mb-2 sm:mb-4">Featured Properties</h2>
            <p className="text-[#686f4b] text-sm sm:text-base lg:text-lg">Discover our handpicked selection of premium properties</p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
              navigation
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="h-[300px] sm:h-[400px] lg:h-[600px]"
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
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                        <div className="max-w-4xl">
                          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{listing.name}</h3>
                          <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-2 sm:mb-4">{listing.address}</p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <span className="bg-[#686f4b] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                              ${listing.regularPrice?.toLocaleString()}
                            </span>
                            <Link
                              to={`/listing/${listing._id}`}
                              className="bg-white text-[#424b1e] px-4 sm:px-6 py-1 sm:py-2 rounded-full font-semibold hover:bg-[#d7d9d0] transition-colors duration-300 text-xs sm:text-sm"
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col gap-8 sm:gap-12 lg:gap-16 my-8 sm:my-12 lg:my-16">
        {offerListings && offerListings.length > 0 && (
          <div className="relative overflow-hidden bg-gradient-to-br from-[#d7d9d0] via-white to-[#cdd0c4] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[#c1c4b5] hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-[#9ea38c]/20 to-transparent rounded-full -translate-y-8 sm:-translate-y-12 lg:-translate-y-16 translate-x-8 sm:translate-x-12 lg:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 bg-gradient-to-tr from-[#b1b5a3]/20 to-transparent rounded-full translate-y-6 sm:translate-y-9 lg:translate-y-12 -translate-x-6 sm:-translate-x-9 lg:-translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-[#686f4b] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2f380f] mb-1 sm:mb-2">Recent Offers</h2>
                    <p className="text-[#686f4b] font-medium text-xs sm:text-sm lg:text-base">Don't miss out on these amazing deals</p>
                  </div>
                </div>
                <Link
                  className="group bg-[#9ea38c] hover:bg-[#8c9280] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm lg:text-base w-full sm:w-auto justify-center"
                  to={"/search?offer=true"}
                >
                  <span>View All Offers</span>
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
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
          <div className="relative overflow-hidden bg-gradient-to-br from-[#cdd0c4] via-white to-[#c1c4b5] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[#b1b5a3] hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 left-0 w-20 sm:w-30 lg:w-40 h-20 sm:h-30 lg:h-40 bg-gradient-to-br from-[#b1b5a3]/15 to-transparent rounded-full -translate-y-10 sm:-translate-y-15 lg:-translate-y-20 -translate-x-10 sm:-translate-x-15 lg:-translate-x-20"></div>
            <div className="absolute bottom-0 right-0 w-14 sm:w-21 lg:w-28 h-14 sm:h-21 lg:h-28 bg-gradient-to-tl from-[#9ea38c]/15 to-transparent rounded-full translate-y-7 sm:translate-y-10.5 lg:translate-y-14 translate-x-7 sm:translate-x-10.5 lg:translate-x-14"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-[#9ea38c] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2f380f] mb-1 sm:mb-2">For Rent</h2>
                    <p className="text-[#686f4b] font-medium text-xs sm:text-sm lg:text-base">Find your perfect rental home</p>
                  </div>
                </div>
                <Link
                  className="group bg-[#b1b5a3] hover:bg-[#a0a597] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm lg:text-base w-full sm:w-auto justify-center"
                  to={"/search?type=rent"}
                >
                  <span>View All Rentals</span>
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
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
          <div className="relative overflow-hidden bg-gradient-to-br from-[#c1c4b5] via-white to-[#b1b5a3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[#9ea38c] hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-18 sm:w-27 lg:w-36 h-18 sm:h-27 lg:h-36 bg-gradient-to-bl from-[#868c6f]/20 to-transparent rounded-full -translate-y-9 sm:-translate-y-13.5 lg:-translate-y-18 translate-x-9 sm:translate-x-13.5 lg:translate-x-18"></div>
            <div className="absolute bottom-0 left-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-tr from-[#686f4b]/15 to-transparent rounded-full translate-y-8 sm:translate-y-12 lg:translate-y-16 -translate-x-8 sm:-translate-x-12 lg:-translate-x-16"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-[#868c6f] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2f380f] mb-1 sm:mb-2">For Sale</h2>
                    <p className="text-[#686f4b] font-medium text-xs sm:text-sm lg:text-base">Invest in your dream property</p>
                  </div>
                </div>
                <Link
                  className="group bg-[#868c6f] hover:bg-[#757c62] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm lg:text-base w-full sm:w-auto justify-center"
                  to={"/search?type=sale"}
                >
                  <span>View All Sales</span>
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
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