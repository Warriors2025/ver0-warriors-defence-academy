import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AppProviders } from "@/components/providers"
import { FloatingCta } from "@/components/floating-cta"
import { TrackingScripts } from "@/components/tracking-scripts"
import { getTrackingTags } from "@/lib/tracking"
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

const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.warriorsdefencecollege.com"),
  title: {
    default: "Best NDA Coaching in Lucknow | Warriors Defence Academy",
    template: "%s | Warriors Defence Academy",
  },
  description:
    "Best NDA coaching in Lucknow at Warriors Defence Academy — NDA, CDS, AFCAT & SSB coaching, 5,000+ selections, India's largest GTO ground. Enroll now!",
  keywords: [
    "best nda coaching in lucknow",
    "nda coaching in lucknow",
    "best nda coaching in india",
    "ssb coaching in lucknow",
    "cds coaching in lucknow",
    "defence academy lucknow",
    "warriors defence academy fees",
    "nda exam date 2026",
    "ssb oir test",
    "nda foundation coaching after 10th",
    "agniveer recruitment 2026",
    "Warriors Defence Academy",
  ],
  authors: [{ name: "Warriors Defence Academy", url: "https://www.warriorsdefencecollege.com" }],
  creator: "Warriors Defence Academy",
  publisher: "Warriors Defence Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.warriorsdefencecollege.com",
  },
  openGraph: {
    title: "Warriors Defence Academy | Best NDA Coaching in India",
    description: "Transform your dream of serving the nation into reality. 5000+ selections, expert faculty, India's largest GTO ground. Join India's most trusted defence coaching institute.",
    url: "https://www.warriorsdefencecollege.com",
    siteName: "Warriors Defence Academy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.webp",
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
    images: ["/images/og-image.webp"],
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
  category: "Education",
}

export async function generateMetadata(): Promise<Metadata> {
  const tags = await getTrackingTags()
  return {
    ...baseMetadata,
    ...(tags.searchConsoleVerification
      ? { verification: { google: tags.searchConsoleVerification } }
      : {}),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const trackingTags = await getTrackingTags()

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
        <FloatingCta />
        <TrackingScripts tags={trackingTags} />
        <Analytics />
      </body>
    </html>
  )
}
