'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Apple, Play } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-900/50 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Start Earning From Your
              <br />
              Content Today, With
              <br />
              HourlyUGC!
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Apply To Brands Today And Get
              <br />
              Paid Instantly
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs opacity-80">Download on the</p>
                  <p className="text-base">App Store</p>
                </div>
              </button>
              <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                <Play className="w-6 h-6 fill-current" />
                <div className="text-left">
                  <p className="text-xs opacity-80">GET IT ON</p>
                  <p className="text-base">Google Play</p>
                </div>
              </button>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative w-72 h-[580px] mx-auto bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 left-0 right-0 h-8 bg-black flex items-center justify-center">
                <div className="w-20 h-1.5 bg-gray-700 rounded-full"></div>
              </div>

              <div className="h-full bg-gradient-to-b from-primary-600 to-primary-800 flex flex-col items-center justify-center p-8 text-white">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">H</span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-2 text-center">
                  HourlyUGC
                </h3>
                <p className="text-white/80 text-center mb-8">
                  Your Gateway To
                  <br />
                  Brand Partnerships
                </p>

                <div className="space-y-4 w-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                    <p className="text-4xl font-bold">$2,450</p>
                    <p className="text-sm text-white/80">Total Earned</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                    <p className="text-4xl font-bold">24</p>
                    <p className="text-sm text-white/80">Jobs Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
