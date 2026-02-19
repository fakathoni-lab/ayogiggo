'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, MessageSquare, Video, Wallet } from 'lucide-react'

export default function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      icon: Search,
      title: 'Browse 100s of Active Jobs',
      description:
        "Apply to campaigns that you think you'd be a good match for and make videos for brands you love.",
      color: 'from-primary-400 to-primary-600',
    },
    {
      icon: MessageSquare,
      title: "Check your messages for the brand's approval",
      description:
        "Once approved by the brand, you'll receive the campaign brief and can start creating content.",
      color: 'from-primary-500 to-primary-700',
    },
    {
      icon: Video,
      title: 'Film',
      description:
        'Create high-quality UGC videos following the brand guidelines and submit them for review.',
      color: 'from-primary-400 to-primary-600',
    },
    {
      icon: Wallet,
      title: 'Get paid',
      description:
        'Once your content is approved, receive payment directly to your account. Fast and simple.',
      color: 'from-primary-500 to-primary-700',
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            How it <span className="text-primary">works</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Join And Start Earning In Minutes
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-4 group"
              >
                <div
                  className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary-100 via-primary-50 to-transparent rounded-full blur-3xl opacity-50"></div>
            <div className="relative w-72 h-[600px] mx-auto bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
              <div className="absolute top-0 left-0 right-0 h-8 bg-black flex items-center justify-center">
                <div className="w-20 h-1.5 bg-gray-700 rounded-full"></div>
              </div>

              <div className="h-full bg-gradient-to-b from-white to-primary-50 p-6 pt-12 overflow-y-auto">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    readOnly
                  />
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900">
                            Beauty Brand
                          </h4>
                          <p className="text-xs text-gray-500">$30/hour</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        Looking for creators to showcase our new skincare line
                      </p>
                      <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
