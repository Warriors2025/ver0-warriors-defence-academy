"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { value: 50000, suffix: "+", label: "Students Trained", description: "Across all defence programmes" },
  { value: 5000,  suffix: "+", label: "Successful Selections", description: "Into NDA, CDS, AFCAT & more" },
  { value: 200,   suffix: "+", label: "Expert Mentors", description: "Retired military officers & educators" },
  { value: 15,    suffix: "+", label: "Years of Excellence", description: "India's most trusted defence academy" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const steps = 60
    const inc = value / steps
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= value) { setCount(value); clearInterval(t) }
      else setCount(Math.floor(cur))
    }, 2000 / steps)
    return () => clearInterval(t)
  }, [visible, value])

  return <div ref={ref} className="text-5xl md:text-6xl font-bold text-accent tabular-nums">{count.toLocaleString("en-IN")}{suffix}</div>
}

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative diagonal stripes */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
        backgroundSize: "24px 24px",
      }} />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">
            Our Track Record
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-3">
            Numbers That Speak for Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-primary-foreground/10">
          {stats.map((s, i) => (
            <div key={i} className="text-center px-6 py-8 lg:py-4">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-3 text-lg font-semibold text-primary-foreground">{s.label}</div>
              <div className="mt-1 text-sm text-primary-foreground/60">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
