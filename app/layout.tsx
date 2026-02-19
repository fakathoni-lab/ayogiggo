import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HourlyUGC - Success Loves Speed, So Hire UGC By The Hour',
  description: 'Platform connecting creators with brand partnerships and influencer marketing opportunities. Earn by the hour creating authentic content at home.',
  keywords: 'UGC, content creators, brand partnerships, influencer marketing, hourly work',
  openGraph: {
    title: 'HourlyUGC - Success Loves Speed, So Hire UGC By The Hour',
    description: 'Platform connecting creators with brand partnerships and influencer marketing opportunities',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
