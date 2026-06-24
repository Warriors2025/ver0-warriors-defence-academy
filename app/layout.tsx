import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1F5B2D" },
    { media: "(prefers-color-scheme: dark)", color: "#1F5B2D" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://warriorsdefenceacademy.com"),
  title: {
    default: "Warriors Defence Academy | Best NDA Coaching in Lucknow, India",
    template: "%s | Warriors Defence Academy",
  },
  description: "India's No.1 NDA, CDS, AFCAT & SSB coaching institute in Lucknow. 5000+ selections, expert military faculty, India's largest GTO ground. Join Warriors Defence Academy for your defence career.",
  keywords: [
    "NDA coaching in Lucknow",
    "best NDA coaching India",
    "CDS coaching institute",
    "AFCAT preparation",
    "SSB interview training",
    "defence academy Lucknow",
    "military training India",
    "NDA exam preparation",
    "CDS exam coaching",
    "SSB coaching center",
    "Army coaching classes",
    "Navy coaching",
    "Air Force coaching",
    "defence entrance exam",
    "NDA foundation course",
    "Warriors Defence Academy",
  ],
  authors: [{ name: "Warriors Defence Academy", url: "https://warriorsdefenceacademy.com" }],
  creator: "Warriors Defence Academy",
  publisher: "Warriors Defence Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://warriorsdefenceacademy.com",
  },
  openGraph: {
    title: "Warriors Defence Academy | Best NDA Coaching in India",
    description: "Transform your dream of serving the nation into reality. 5000+ selections, expert faculty, India's largest GTO ground. Join India's most trusted defence coaching institute.",
    url: "https://warriorsdefenceacademy.com",
    siteName: "Warriors Defence Academy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Warriors Defence Academy - Best NDA Coaching in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warriors Defence Academy | Best NDA Coaching in India",
    description: "India's No.1 NDA, CDS, AFCAT & SSB coaching institute. 5000+ selections, expert military faculty. Join us for your defence career.",
    images: ["/images/og-image.jpg"],
    creator: "@WarriorsDefence",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Education",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Warriors Defence Academy",
  "description": "India's No.1 NDA, CDS, AFCAT & SSB coaching institute in Lucknow with 5000+ selections.",
  "url": "https://warriorsdefenceacademy.com",
  "logo": "https://warriorsdefenceacademy.com/images/logo/Warriors%20Defence%20Logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Defence Colony",
    "addressLocality": "Lucknow",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226001",
    "addressCountry": "IN"
  },
  "telephone": "+91-98765-43210",
  "email": "info@warriorsdefence.com",
  "sameAs": [
    "https://www.facebook.com/warriorsdefenceacademy",
    "https://www.instagram.com/warriorsdefenceacademy",
    "https://www.youtube.com/@warriorsdefenceacademy"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Defence Coaching Courses",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "NDA Course",
        "description": "Complete NDA exam preparation with SSB training",
        "provider": { "@type": "Organization", "name": "Warriors Defence Academy" }
      },
      {
        "@type": "Course",
        "name": "CDS Course",
        "description": "Combined Defence Services examination preparation",
        "provider": { "@type": "Organization", "name": "Warriors Defence Academy" }
      },
      {
        "@type": "Course",
        "name": "SSB Interview Training",
        "description": "Comprehensive SSB interview preparation program",
        "provider": { "@type": "Organization", "name": "Warriors Defence Academy" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2500",
    "bestRating": "5"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
