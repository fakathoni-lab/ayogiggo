'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HourlyUGC</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              About Us
            </a>
            <a
              href="#news"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              News & Cart
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Are You A Brand?
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Login
            </a>
            <button className="bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#"
                className="block text-gray-700 hover:text-primary transition-colors duration-200 py-2"
              >
                Home
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-primary transition-colors duration-200 py-2"
              >
                About Us
              </a>
              <a
                href="#news"
                className="block text-gray-700 hover:text-primary transition-colors duration-200 py-2"
              >
                News & Cart
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-primary transition-colors duration-200 py-2"
              >
                Are You A Brand?
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-primary transition-colors duration-200 py-2"
              >
                Login
              </a>
              <button className="w-full bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
