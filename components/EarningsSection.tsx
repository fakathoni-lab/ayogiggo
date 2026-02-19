'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, DollarSign, CheckCircle, RefreshCw } from 'lucide-react'

export default function EarningsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    {
      icon: Users,
      number: '2,000+',
      label: 'Brands and agencies',
      position: 'top-left',
    },
    {
      icon: DollarSign,
      number: '$25-35+',
      label: '/hour',
      position: 'bottom-left',
    },
    {
      icon: CheckCircle,
      number: 'Inclusive',
      label: 'no experience required',
      position: 'bottom-right',
    },
    {
      icon: RefreshCw,
      number: 'Consistent work',
      label: 'Get instant access to new brands each week',
      position: 'top-right',
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-lg mb-2"
          >
            For Creators
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Earning has never
            <br />
            been <span className="text-primary">easier</span>
          </motion.h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="relative w-56 h-56 mx-auto md:mx-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-ping"></div>
                <div className="relative z-10 text-center text-white">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-4xl font-bold">{stats[0].number}</p>
                  <p className="text-sm mt-2 px-4">{stats[0].label}</p>
                </div>
              </div>

              <div className="relative w-56 h-56 mx-auto md:ml-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-pulse"></div>
                <div className="relative z-10 text-center text-white">
                  <DollarSign className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-4xl font-bold">{stats[1].number}</p>
                  <p className="text-sm mt-2 px-4">{stats[1].label}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full blur-3xl opacity-30"></div>
              <div className="relative w-64 h-96 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-1 bg-white/30 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold">H</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">HourlyUGC</h3>
                    <p className="text-sm opacity-90">Start Earning Today</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
              <div className="relative w-56 h-56 mx-auto bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-2xl">
                <div className="relative z-10 text-center text-white">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats[2].number}</p>
                  <p className="text-sm mt-2 px-4">{stats[2].label}</p>
                </div>
              </div>

              <div className="relative w-56 h-56 mx-auto bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-2xl">
                <div className="relative z-10 text-center text-white">
                  <RefreshCw className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-xl font-bold px-4">{stats[3].number}</p>
                  <p className="text-xs mt-2 px-6">{stats[3].label}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6 text-lg">
              Just Create Videos For Brands And Get Paid Hourly
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2">
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
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
