"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Check, Upload, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type LicenseProcessModalProps = {
  isOpen: boolean
  onClose: () => void
  initialStep?: "upload" | "valuation" | "payment"
  mode?: "quote" | "sell"
}

export default function LicenseProcessModal({
  isOpen,
  onClose,
  initialStep = "upload",
  mode = "sell",
}: LicenseProcessModalProps) {
  const [step, setStep] = useState<"upload" | "valuation" | "payment">(initialStep)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [licenseKey, setLicenseKey] = useState("")
  const [softwareType, setSoftwareType] = useState("")
  const [valuation, setValuation] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentEmail, setPaymentEmail] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  // Simulate upload process
  const handleUpload = () => {
    if (!uploadedFile && !licenseKey) {
      toast({
        title: "Error",
        description: "Please upload a license file or enter a license key",
        variant: "destructive",
      })
      return
    }

    if (!softwareType) {
      toast({
        title: "Error",
        description: "Please select a software type",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Move to valuation step
          setStep("valuation")
          // Generate random valuation between $100 and $2000
          const randomValuation = Math.floor(Math.random() * 1900) + 100
          setValuation(randomValuation)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Handle valuation acceptance
  const handleAcceptValuation = () => {
    setStep("payment")
  }

  // Handle payment process
  const handleProcessPayment = () => {
    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      })
      return
    }

    if (!paymentEmail) {
      toast({
        title: "Error",
        description: "Please enter your payment email",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      toast({
        title: "Success!",
        description:
          mode === "quote"
            ? "Your quote has been generated and sent to your email."
            : "Your license has been sold successfully! Payment will be processed within 24 hours.",
      })
    }, 2000)
  }

  // Reset the form when closing
  const handleClose = () => {
    // Small delay to avoid animation issues
    setTimeout(() => {
      setStep("upload")
      setProgress(0)
      setIsUploading(false)
      setIsProcessing(false)
      setUploadedFile(null)
      setLicenseKey("")
      setSoftwareType("")
      setValuation(null)
      setPaymentMethod("")
      setPaymentEmail("")
      setIsComplete(false)
    }, 300)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "quote" ? "Get a Quote" : "Sell Your License"}</DialogTitle>
          <DialogDescription>
            {mode === "quote"
              ? "Upload your license details to get an instant quote."
              : "Complete the process to sell your unused software license."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={step} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" disabled>
              Upload
            </TabsTrigger>
            <TabsTrigger value="valuation" disabled>
              Valuation
            </TabsTrigger>
            <TabsTrigger value="payment" disabled>
              {mode === "quote" ? "Quote" : "Payment"}
            </TabsTrigger>
          </TabsList>

          {/* Upload Step */}
          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="software-type">Software Type</Label>
                <Select value={softwareType} onValueChange={setSoftwareType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select software type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adobe">Adobe Creative Cloud</SelectItem>
                    <SelectItem value="microsoft">Microsoft Office</SelectItem>
                    <SelectItem value="autodesk">Autodesk Suite</SelectItem>
                    <SelectItem value="jetbrains">JetBrains IDEs</SelectItem>
                    <SelectItem value="vmware">VMware Products</SelectItem>
                    <SelectItem value="other">Other Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license-key">License Key (Optional)</Label>
                <Input
                  id="license-key"
                  placeholder="Enter your license key"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license-file">Upload License File (Optional)</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Input
                    id="license-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.txt,.lic,.key"
                  />
                  <Label htmlFor="license-file" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-muted-foreground">Supports PDF, TXT, LIC, KEY (Max 10MB)</span>
                  </Label>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* Valuation Step */}
          <TabsContent value="valuation" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">License Valuation</h3>
                  <Check className="h-5 w-5 text-green-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Software Type:</span>
                    <span className="font-medium">{softwareType}</span>
                  </div>
                  {uploadedFile && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">File:</span>
                      <span className="font-medium">{uploadedFile.name}</span>
                    </div>
                  )}
                  {licenseKey && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">License Key:</span>
                      <span className="font-medium">
                        {licenseKey.substring(0, 5)}...{licenseKey.substring(licenseKey.length - 5)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-muted/30">
                <h3 className="text-lg font-medium mb-2">Our Offer</h3>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">${valuation?.toFixed(2)}</span>
                  <div className="text-sm text-muted-foreground">
                    <p>Market value based on:</p>
                    <ul className="list-disc list-inside">
                      <li>Current demand</li>
                      <li>License type</li>
                      <li>Remaining validity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-yellow-50 dark:bg-yellow-950/30">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 dark:text-yellow-300">Important Note</p>
                    <p className="text-yellow-700 dark:text-yellow-400">
                      This valuation is valid for 24 hours. Once accepted, you'll proceed to the payment setup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button onClick={handleAcceptValuation}>Accept Valuation</Button>
            </DialogFooter>
          </TabsContent>

          {/* Payment Step */}
          <TabsContent value="payment" className="space-y-4 py-4">
            {!isComplete ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <h3 className="text-lg font-medium mb-2">Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Software Type:</span>
                      <span className="font-medium">{softwareType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valuation:</span>
                      <span className="font-medium">${valuation?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-email">Payment Email</Label>
                  <Input
                    id="payment-email"
                    type="email"
                    placeholder="Enter your payment email"
                    value={paymentEmail}
                    onChange={(e) => setPaymentEmail(e.target.value)}
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setStep("valuation")}>
                    Back
                  </Button>
                  <Button onClick={handleProcessPayment} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : mode === "quote" ? (
                      "Get Quote"
                    ) : (
                      "Complete Sale"
                    )}
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="space-y-6 py-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {mode === "quote" ? "Quote Generated!" : "Sale Complete!"}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {mode === "quote"
                      ? "We've sent the detailed quote to your email."
                      : "We've received your license. Payment will be processed within 24 hours."}
                  </p>

                  <div className="mt-6 rounded-lg border p-4 w-full text-left">
                    <h4 className="font-medium mb-2">Transaction Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reference ID:</span>
                        <span className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">${valuation?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span className="font-medium capitalize">{paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{paymentEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleClose}>Close</Button>
                </DialogFooter>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
