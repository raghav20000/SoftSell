import { Star } from "lucide-react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechStart",
      content:
        "SoftSell made it incredibly easy to sell our excess enterprise licenses after downsizing. The valuation was fair and payment was processed quickly. Highly recommended!",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "IT Manager",
      content:
        "I was skeptical at first, but SoftSell exceeded my expectations. The process was straightforward and I received payment within hours of accepting the offer.",
      avatar: "MC",
    },
  ]

  return (
    <section className="py-16 bg-muted/50" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Customer Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg italic">{testimonial.content}</p>
              </CardHeader>
              <CardFooter className="flex items-center gap-4 pt-2">
                <Avatar>
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
