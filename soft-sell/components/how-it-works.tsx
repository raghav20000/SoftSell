"use client"

import { useState } from "react"
import { Upload, DollarSign, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LicenseProcessModal from "./license-process-modal"

export default function HowItWorks() {
  const [modalOpen, setModalOpen] = useState(false)
  const [initialStep, setInitialStep] = useState<"upload" | "valuation" | "payment">("upload")

  const steps = [
    {
      title: "Upload License",
      description: "Upload your software license details through our secure portal.",
      icon: <Upload className="h-12 w-12 text-primary" />,
      action: () => {
        setInitialStep("upload")
        setModalOpen(true)
      },
    },
    {
      title: "Get Valuation",
      description: "Receive an instant valuation based on current market rates.",
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      action: () => {
        setInitialStep("valuation")
        setModalOpen(true)
      },
    },
    {
      title: "Get Paid",
      description: "Accept the offer and get paid quickly via your preferred method.",
      icon: <DollarSign className="h-12 w-12 text-primary" />,
      action: () => {
        setInitialStep("payment")
        setModalOpen(true)
      },
    },
  ]

  return (
    <section className="py-16 bg-muted/50" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={step.action}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">{step.icon}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">{step.description}</CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    step.action()
                  }}
                >
                  Try it now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <LicenseProcessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialStep={initialStep} />
    </section>
  )
}
