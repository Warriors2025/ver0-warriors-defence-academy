"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, BookOpen, MapPin, FileCheck, Trophy, MessageCircle, HelpCircle, Users, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Largest GTO Ground",
    description: "India's largest GTO training ground with modern obstacles for comprehensive physical and tactical readiness.",
    image: "/images/features/gto-ground.jpg",
    href: "/gallery",
    span: "lg:col-span-2 lg:row-span-2",
    large: true,
  },
  {
    icon: BookOpen,
    title: "Library Facilities",
    description: "Extensive collection of NDA, CDS & SSB reference books and practice manuals.",
    image: "/images/features/library.jpg",
    href: "/about",
    span: "",
    large: false,
  },
  {
    icon: MapPin,
    title: "IMA Dehradun Visits",
    description: "Regular educational trips for real-world exposure and inspiration.",
    image: "/images/features/ima-visit.jpg",
    href: "/gallery",
    span: "",
    large: false,
  },
  {
    icon: FileCheck,
    title: "Mock Test Facilities",
    description: "Regular exams mirroring actual NDA/CDS papers to track progress and build confidence.",
    image: "/images/features/mock-test.jpg",
    href: "/courses",
    span: "",
    large: false,
  },
  {
    icon: Trophy,
    title: "National Sports Facilities",
    description: "Extensive sports resources to build strength, stamina and meet rigorous physical standards.",
    image: "/images/features/sports.jpg",
    href: "/gallery",
    span: "",
    large: false,
  },
  {
    icon: MessageCircle,
    title: "Spoken English Classes",
    description: "Dedicated English communication classes for group discussions and personal interviews.",
    image: "/images/features/english-class.jpg",
    href: "/courses",
    span: "",
    large: false,
  },
  {
    icon: HelpCircle,
    title: "Doubt Counter Center",
    description: "One-on-one guidance from subject experts to clear doubts and strengthen comprehension.",
    image: "/images/features/doubt-clearing.jpg",
    href: "/contact",
    span: "",
    large: false,
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Distinguished military leaders with decades of service guiding every step.",
    image: "/images/features/mentorship.jpg",
    href: "/about",
    span: "",
    large: false,
  },
]

export function FeaturesSection() {
  const [hero, ...rest] = features

  return (
    <section className="py-20 bg-muted/30 border-y border-border/60">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            World-Class Facilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
            Why Warriors Defence Academy Stands Apart
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Infrastructure and training support designed for every stage of your defence career journey.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">

          {/* Hero card — large */}
          <Link
            href={hero.href}
            className="relative rounded-2xl overflow-hidden group sm:col-span-2 lg:col-span-2 lg:row-span-2 block focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="inline-flex w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 items-center justify-center mb-3">
                <hero.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{hero.title}</h3>
              <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{hero.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                See campus <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          {/* Smaller cards */}
          {rest.map((f, i) => (
            <Link
              key={i}
              href={f.href}
              className="relative rounded-2xl overflow-hidden group block focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={f.image}
                alt={f.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Icon chip */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                <f.icon className="h-4 w-4 text-white" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm font-semibold text-white leading-snug">{f.title}</h3>
                <p className="text-white/70 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {f.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
