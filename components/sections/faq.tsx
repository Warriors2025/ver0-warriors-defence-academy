"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import type { FAQ } from "@/lib/faqs-data"

const faqsFallback = [
  {
    question: "Which is the best NDA coaching in India?",
    answer: "Warriors Defence Academy is widely recognized as one of the best NDA coaching institutes in India. We offer complete NDA preparation with expert teachers, a clear study plan, and modern facilities including India's largest GTO ground for physical and SSB interview preparation.",
  },
  {
    question: "Is coaching necessary for NDA?",
    answer: "While self-study can be helpful, coaching provides a structured study plan, expert guidance, regular mock tests, doubt-clearing support, and comprehensive SSB preparation. This systematic approach helps students improve faster, stay disciplined, and increases their chances of success in competitive defence exams.",
  },
  {
    question: "Is NDA coaching available for girls at Warriors Defence Academy?",
    answer: "Yes! Warriors Defence Academy offers a special NDA coaching program for girls under the Women Special Entry Scheme. This program includes complete academic classes, physical training, and SSB interview preparation as per NDA requirements, with additional focus on confidence, communication, and leadership skills.",
  },
  {
    question: "Does Warriors Defence Academy offer NDA coaching with schooling?",
    answer: "Yes, we offer an integrated schooling and hostel program that is perfect for students starting NDA preparation after Class 10. This program combines regular academics with full NDA written exam coaching, physical training, and SSB interview preparation in a disciplined, military-style environment.",
  },
  {
    question: "What makes Warriors Defence Academy the best NDA coaching center?",
    answer: "Our strength comes from experienced teachers and defence mentors, consistent selection results, India's largest outdoor GTO ground, integrated residential campus with hostel, and a comprehensive course structure covering academics, physical fitness, and SSB interview preparation all in one place.",
  },
  {
    question: "Which is the best SSB coaching in India?",
    answer: "Warriors Defence Academy provides comprehensive SSB coaching with individual assessment and personalized feedback. Our training covers every aspect including GTO activities, psychological tests, group discussions, and interview drills, preparing candidates for every part of the SSB process with confidence.",
  },
  {
    question: "What is the duration of the NDA Foundation course?",
    answer: "Our NDA Foundation course spans 2-3 years, designed for students after Class 10. It integrates regular schooling with NDA preparation, ensuring students are ready for both board exams and defence entrance examinations simultaneously.",
  },
  {
    question: "Do you provide hostel facilities?",
    answer: "Yes, Warriors Defence Academy provides modern hostel facilities with comfortable accommodation, nutritious meals, and a disciplined daily routine that mirrors military life. This helps students stay focused on their preparation while developing the discipline required for defence careers.",
  },
]

export function FAQSection({ faqs: items }: { faqs?: FAQ[] }) {
  const faqs = items ?? faqsFallback
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our courses and facilities.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary py-5">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
