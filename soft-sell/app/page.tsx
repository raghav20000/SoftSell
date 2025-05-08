import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import ContactForm from "@/components/contact-form"
import ChatWidget from "@/components/chat-widget"
import ThemeToggle from "@/components/theme-toggle"
import Logo from "@/components/logo"

export const metadata: Metadata = {
  title: "SoftSell - Software License Marketplace",
  description: "SoftSell helps you sell your unused software licenses quickly and easily.",
  keywords: "software resale, license marketplace, sell software licenses",
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            Contact Us
          </a>
        </div>
      </header>

      <main>
        <HeroSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />
      </main>

      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SoftSell. All rights reserved.</p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
