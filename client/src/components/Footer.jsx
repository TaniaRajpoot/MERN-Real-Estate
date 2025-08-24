import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2f380f] to-[#424b1e] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-[#d7d9d0]">Taniva </span>
              <span className="text-[#cdd0c4]">Estate</span>
            </h3>
            <p className="text-[#b1b5a3] leading-relaxed">
              Your trusted partner in finding the perfect home. We make real estate dreams come true with personalized
              service and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#9ea38c] hover:text-[#d7d9d0] transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-[#9ea38c] hover:text-[#d7d9d0] transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-[#9ea38c] hover:text-[#d7d9d0] transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-[#9ea38c] hover:text-[#d7d9d0] transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#d7d9d0]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#b1b5a3] hover:text-[#d7d9d0] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#b1b5a3] hover:text-[#d7d9d0] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-[#b1b5a3] hover:text-[#d7d9d0] transition-colors duration-300">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-[#b1b5a3] hover:text-[#d7d9d0] transition-colors duration-300">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#d7d9d0]">Services</h4>
            <ul className="space-y-2">
              <li className="text-[#b1b5a3]">Property Sales</li>
              <li className="text-[#b1b5a3]">Property Rentals</li>
              <li className="text-[#b1b5a3]">Property Management</li>
              <li className="text-[#b1b5a3]">Investment Consulting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#d7d9d0]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#9ea38c]" />
                <span className="text-[#b1b5a3]">123 Real Estate St, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#9ea38c]" />
                <span className="text-[#b1b5a3]">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#9ea38c]" />
                <span className="text-[#b1b5a3]">info@tanivaestate.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#686f4b] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#9ea38c] text-sm">© 2024 Taniva Estate. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-[#9ea38c] hover:text-[#d7d9d0] text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#9ea38c] hover:text-[#d7d9d0] text-sm transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
