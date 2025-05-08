import { Shield, Clock, BadgeDollarSign, Award } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Secure Transactions",
      description: "End-to-end encryption and secure payment processing.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      title: "Fast Processing",
      description: "Get valuations instantly and payment within 24 hours.",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
    {
      title: "Best Rates",
      description: "We offer the most competitive rates in the industry.",
      icon: <BadgeDollarSign className="h-8 w-8 text-primary" />,
    },
    {
      title: "Trusted Service",
      description: "Over 10,000 successful transactions and counting.",
      icon: <Award className="h-8 w-8 text-primary" />,
    },
  ]

  return (
    <section className="py-16" id="why-choose-us">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
