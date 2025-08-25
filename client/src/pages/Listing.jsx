import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/listing/get/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) return <p className="text-center my-7 text-2xl">Loading...</p>;
  if (error) return <p className="text-center my-7 text-2xl">Something went wrong!</p>;

  return (
  <main className="flex flex-col lg:flex-row max-w-7xl mx-auto my-12 gap-8 px-6">
  {listing && (
    <>
      {/* Left Side - Information */}
      <div className="flex-1 flex flex-col gap-6 lg:gap-8">
        {/* Title & Price */}
        <p className="text-4xl lg:text-5xl font-bold text-[#424b1e]">
          {listing.name} - $
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>

        {/* Address */}
        <p className="flex items-center mt-3 gap-2 text-[#686f4b] text-sm lg:text-base">
          <FaMapMarkerAlt className="text-[#424b1e]" />
          {listing.address}
        </p>

        {/* Labels */}
        <div className="flex gap-4">
          <p className="bg-[#686f4b] w-full max-w-[220px] text-white text-center py-2 rounded-md shadow">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing.offer && (
            <p className="bg-[#686f4b] w-full max-w-[220px] text-white text-center py-2 rounded-md shadow">
              ${+listing.regularPrice - +listing.discountPrice} OFF
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-[#424b1e]/90 leading-relaxed mt-4 text-base lg:text-lg">
          <span className="font-semibold">Description: </span>
          {listing.description}
        </p>

        {/* Features */}
        <ul className="text-[#424b1e] font-semibold text-sm lg:text-base flex flex-wrap items-center gap-6 mt-3">
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaBed className="text-lg" />
            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaBath className="text-lg" />
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaParking className="text-lg" />
            {listing.parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaChair className="text-lg" />
            {listing.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>

        {/* Contact Button */}
        {currentUser && listing.userRef !== currentUser._id && !contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-[#424b1e] text-white rounded-lg uppercase hover:bg-[#2f380f] py-3 px-4 shadow-md transition mt-6 text-lg"
          >
            Contact landlord
          </button>
        )}
        {contact && <Contact listing={listing} />}
      </div>

      {/* Right Side - Image Slider */}
      <div className="flex-1 relative rounded-xl shadow-lg overflow-hidden">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          className="h-[650px] lg:h-[750px] rounded-xl"
        >
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <img
                src={url}
                alt="listing"
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Share button */}
        <div className="absolute top-4 right-4 border rounded-full w-12 h-12 flex justify-center items-center bg-[#f5f5f0] cursor-pointer shadow-md hover:scale-110 transition">
          <FaShare
            className="text-[#424b1e]"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          />
        </div>
        {copied && (
          <p className="absolute top-16 right-4 rounded-md bg-[#f5f5f0] text-[#424b1e] px-3 py-2 shadow">
            Link copied!
          </p>
        )}
      </div>
    </>
  )}
</main>


  );
}
