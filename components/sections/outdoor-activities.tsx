"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: 1,
    image: "/images/activities/activity-1.jpg",
    title: "Morning Physical Training",
  },
  {
    id: 2,
    image: "/images/activities/activity-2.jpg",
    title: "GTO Group Tasks",
  },
  {
    id: 3,
    image: "/images/activities/activity-3.jpg",
    title: "Team Sports",
  },
  {
    id: 4,
    image: "/images/activities/activity-4.jpg",
    title: "Parade Practice",
  },
  {
    id: 5,
    image: "/images/activities/activity-5.jpg",
    title: "Adventure Training",
  },
  {
    id: 6,
    image: "/images/activities/activity-6.jpg",
    title: "Group Discussions",
  },
]

export function OutdoorActivitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= activities.length ? 0 : prevIndex + 1
    )
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? activities.length - itemsPerPage : prevIndex - 1
    )
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const visibleActivities = activities.slice(currentIndex, currentIndex + itemsPerPage)
  const wrappedActivities = visibleActivities.length < itemsPerPage 
    ? [...visibleActivities, ...activities.slice(0, itemsPerPage - visibleActivities.length)]
    : visibleActivities

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Outdoor Activities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Building Character Through Action
          </h2>
          <p className="text-muted-foreground text-lg">
            At Warriors Defence Academy, our training is not only in the classroom. We also focus on outdoor activities to build overall personality and fitness. Through physical challenges, group tasks, and leadership drills, students learn teamwork, confidence, and mental strength.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {wrappedActivities.map((activity, index) => (
              <div
                key={`${activity.id}-${index}`}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 transition-all duration-500"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-center">{activity.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-lg z-10 hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-lg z-10 hidden md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {activities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
