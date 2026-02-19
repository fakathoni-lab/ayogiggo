'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Not Only By-The-Gig Deal Pay, But Real, Tier-Based Hourly Rates',
      answer:
        'Free Products: Say goodbye to "exposure" as payment. You get to keep every product for making review, unboxing and testing videos.',
    },
    {
      question: 'Extra Earnings',
      answer:
        'The More You Earn, The More You Earn. Earn bonuses and incentives for performance. Boost Additional 5% For Every Week You Deliver A Job. And Yes, Those Build Into A Performance Boost Additional Job Boosts!',
    },
    {
      question: 'For Both Experienced And Inexperienced Creators',
      answer:
        'Collaborate With Brands You Love. Whether you\'re a pro or just starting out, brands welcome all skill levels. You can work with brands you genuinely care about, not just high-priced gigs.',
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gray-600 text-lg mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Creator <span className="text-primary">Perks</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 mt-4 text-lg"
          >
            Real Only By-The-Gig Deal Pay, But Real Tier Boost Additional 5% For Every Week You
            <br className="hidden md:block" />
            Deliver A Job And Yes, Those Add Up. Earn 5% More For Free Products, Just For Trying
            <br className="hidden md:block" />
            With Them.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-primary-300 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      openIndex === index
                        ? 'bg-primary text-white'
                        : 'bg-primary-100 text-primary'
                    }`}
                  >
                    <Plus
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-45' : ''
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-[4.5rem]">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
