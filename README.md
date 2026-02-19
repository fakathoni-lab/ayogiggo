# HourlyUGC Clone - Pixel-Perfect Reverse Engineering

A professional pixel-perfect clone of hourlyugc.com built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Pixel-Perfect Design**: Visually identical to the original website
- **Smooth Animations**: Framer Motion powered scroll animations and interactions
- **Fully Responsive**: Mobile-first design with responsive breakpoints
- **Modern Stack**: Built with Next.js 14 App Router and TypeScript
- **Performance Optimized**: Lighthouse score 90+ target
- **SEO Ready**: Complete meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Project Structure

```
hourlyugc-clone/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page combining all sections
│   └── globals.css          # Global styles and Tailwind imports
├── components/
│   ├── Navbar.tsx           # Fixed navbar with blur backdrop
│   ├── HeroSection.tsx      # Hero with creator previews
│   ├── EarningsSection.tsx  # Stats with circular badges
│   ├── HowItWorksSection.tsx # 4-step process layout
│   ├── TestimonialsSection.tsx # Creator cards
│   ├── FAQSection.tsx       # Accordion FAQ
│   ├── CTASection.tsx       # Dark emerald CTA banner
│   └── Footer.tsx           # Footer with links
├── tailwind.config.ts       # Tailwind configuration with custom theme
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build

Build the production version:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Design System

### Colors

- **Primary**: #10b981 (Emerald)
- **Gradients**: Emerald tones from 50 to 900

### Typography

- **Font Family**: Inter (from Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components

All components follow the original design specifications:

1. **Navbar**: Sticky with backdrop blur effect on scroll
2. **Hero Section**: Large heading with creator preview cards
3. **Earnings Section**: Circular stat badges with phone mockup
4. **How It Works**: 4-step process with interactive phone display
5. **Testimonials**: Creator cards with hover effects
6. **FAQ Section**: Accordion with smooth animations
7. **CTA Section**: Dark emerald gradient with phone mockup
8. **Footer**: Multi-column layout with social links

## Mock Data

This project uses placeholder images from Unsplash for creator profiles and visual elements. In a production environment, replace these with actual content:

- Creator profile images
- Testimonial data
- FAQ content
- Brand logos

## Performance Optimizations

- Image optimization via Next.js Image component
- Lazy loading for off-screen content
- Framer Motion viewport detection for scroll animations
- Minimized bundle size with tree-shaking
- CSS optimization via Tailwind's JIT compiler

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Notes

This is a reverse-engineered clone for educational and demonstration purposes. The visual design closely matches the original hourlyugc.com website. All interactive elements, animations, and responsive behaviors have been meticulously recreated.

## License

This project is for educational purposes only.
