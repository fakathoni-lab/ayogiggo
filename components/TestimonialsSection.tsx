'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const creators = [
    {
      name: 'Sarah',
      role: 'Content Creator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
      rating: 5,
      earnings: '$1,250',
      reviews: 23,
    },
    {
      name: 'Mike',
      role: 'UGC Creator',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      rating: 5,
      earnings: '$980',
      reviews: 18,
    },
    {
      name: 'Emma',
      role: 'Brand Ambassador',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
      rating: 5,
      earnings: '$1,450',
      reviews: 31,
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-primary-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-lg mb-2"
          >
            Creators
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Hear from Our
            <br />
            <span className="text-primary">Creators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Discover How HourlyUGC Has Transformed
            <br />
            The Journey Of Our Creators, Helping Them
            <br />
            Achieve Success By Connecting With Top Brands
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="aspect-[3/4] relative">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-900">
                      {creator.rating}.0
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{creator.name}</h3>
                    <p className="text-sm text-white/90 mb-4">{creator.role}</p>

                    <div className="flex items-center justify-between bg-white/20 backdrop-blur-md rounded-xl p-3">
                      <div>
                        <p className="text-xs text-white/80">Total Earned</p>
                        <p className="text-lg font-bold">{creator.earnings}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/80">Reviews</p>
                        <p className="text-lg font-bold">{creator.reviews}</p>
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
