"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import LicenseProcessModal from "./license-process-modal"

export default function HeroSection() {
  // Add state for modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [sellModalOpen, setSellModalOpen] = useState(false)

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
          Turn Unused Software Licenses Into Cash
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up animate-delay-100">
          SoftSell makes it easy to sell your unused software licenses quickly and securely, with the best valuations in
          the industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-200">
          <Button size="lg" className="text-lg px-8" onClick={() => setQuoteModalOpen(true)}>
            Get a Quote
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 group" onClick={() => setSellModalOpen(true)}>
            Sell My License
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        {/* Add the modals */}
        <LicenseProcessModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} mode="quote" />
        <LicenseProcessModal isOpen={sellModalOpen} onClose={() => setSellModalOpen(false)} mode="sell" />
      </div>
    </section>
  )
}
