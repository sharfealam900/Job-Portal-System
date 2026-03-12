import React, { useState } from "react"
import axios from "axios"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter your email")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:8000/api/v1/subscribe",
        { email }
      )

      alert(res.data.message)
      setEmail("")
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


          <div>
            <h1 className="text-2xl font-bold text-white">
              Job<span className="text-[#6A38C2]">Portal</span>
            </h1>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Discover your dream job with our AI-powered job portal.
              Clean. Fast. Futuristic.
            </p>

            <div className="flex gap-4 mt-6">
              <Facebook className="w-5 h-5 hover:text-[#6A38C2] cursor-pointer transition" />
              <Twitter className="w-5 h-5 hover:text-[#6A38C2] cursor-pointer transition" />
              <Linkedin className="w-5 h-5 hover:text-[#6A38C2] cursor-pointer transition" />
              <Instagram className="w-5 h-5 hover:text-[#6A38C2] cursor-pointer transition" />
            </div>
          </div>


          <div>
            <h2 className="text-white font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#6A38C2] cursor-pointer transition">Home</li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">Browse Jobs</li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">Companies</li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">About Us</li>
            </ul>
          </div>


          <div>
            <h2 className="text-white font-semibold mb-4">Top Categories</h2>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#6A38C2] cursor-pointer transition">Frontend Developer</li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">Backend Developer</li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">Data Science</li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">UI/UX Designer</li>
            </ul>
          </div>


          <div>
            <h2 className="text-white font-semibold mb-4">Stay Updated</h2>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get latest job updates.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-[#6A38C2]"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-[#6A38C2] px-4 py-2 text-white rounded-r-md hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer