import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
})

export const metadata: Metadata = {
  title: "Warriors Defence Academy | Best NDA Coaching in India",
  description: "India's premier defence coaching institute offering NDA, CDS, AFCAT, SSB, and MNS preparation. Join thousands of successful officers who started their journey with us.",
  keywords: "NDA coaching, CDS coaching, AFCAT preparation, SSB interview, defence academy, military training, India",
  authors: [{ name: "Warriors Defence Academy" }],
  openGraph: {
    title: "Warriors Defence Academy | Best NDA Coaching in India",
    description: "Transform your dream of serving the nation into reality with India's most trusted defence coaching institute.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
