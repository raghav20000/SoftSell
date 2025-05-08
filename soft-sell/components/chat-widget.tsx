"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Predefined questions and answers for mock mode
const mockResponses: Record<string, string> = {
  "how do i sell my license?":
    "To sell your license, simply click the 'Sell My License' button on our homepage, upload your license details, and we'll provide you with a valuation. Once you accept, we'll process the payment within 24 hours.",
  "what types of licenses do you buy?":
    "We purchase a wide range of software licenses including enterprise software, creative suites, productivity tools, development tools, and more. If you're unsure, please contact us with details of your license.",
  "how much is my license worth?":
    "The value of your license depends on several factors including the software type, remaining subscription time, and current market demand. Upload your license details through our platform to receive an instant valuation.",
  "how long does payment take?":
    "Once you accept our offer, payments are typically processed within 24 hours. We offer multiple payment methods including bank transfer, PayPal, and cryptocurrency.",
  "is the process secure?":
    "We use end-to-end encryption for all transactions and data transfers. Your personal and financial information is protected with industry-standard security protocols.",
  hello: "Hello! How can I help you with selling your software licenses today?",
  hi: "Hi there! How can I assist you with our software license marketplace?",
  help: "I'd be happy to help! You can ask me about selling licenses, our valuation process, payment methods, or any other questions about SoftSell.",
  "thank you": "You're welcome! If you have any other questions, feel free to ask.",
  thanks: "You're welcome! Is there anything else I can help you with?",
}

// Function to find the best match for user input in mock mode
function findBestResponse(userInput: string): string {
  const normalizedInput = userInput.toLowerCase().trim()

  // Direct match
  if (mockResponses[normalizedInput]) {
    return mockResponses[normalizedInput]
  }

  // Partial match
  for (const [question, answer] of Object.entries(mockResponses)) {
    if (normalizedInput.includes(question) || question.includes(normalizedInput)) {
      return answer
    }
  }

  // No match
  return "I don't have specific information about that. Please contact our support team for more assistance, or try asking about how to sell your license, payment processes, or the types of licenses we accept."
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! How can I help you with selling your software licenses today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [useMockMode, setUseMockMode] = useState(true) // Set to false to use real OpenAI

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Always use mock responses for immediate feedback
      const userInput = input.toLowerCase().trim()
      const assistantResponse = findBestResponse(userInput)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setMessages((prev) => [...prev, { role: "assistant", content: assistantResponse }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chat widget */}
      <div
        className={cn(
          "fixed bottom-20 right-4 w-80 md:w-96 transition-all duration-300 ease-in-out z-50",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">SoftSell Assistant</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">AI</AvatarFallback>
                      </Avatar>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Ask about selling licenses..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
