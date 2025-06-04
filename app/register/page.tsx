"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, Phone, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = "registration" | "otp"

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("registration")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 5) return numbers
    if (numbers.length <= 10) return `${numbers.slice(0, 5)} ${numbers.slice(5)}`
    return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    if (formatted.replace(/\s/g, "").length <= 10) {
      setFormData({ ...formData, phone: formatted })
      if (errors.phone) {
        setErrors({ ...errors, phone: "" })
      }
    }
  }

  const handleSendOTP = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setStep("otp")
    setResendTimer(30)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors({ ...errors, otp: "" })
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter complete OTP" })
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate OTP verification (replace with actual logic)
    if (otpValue === "123456") {
      setIsLoading(false)
      // Navigate to dashboard
      window.location.href = "/dashboard"
    } else {
      setIsLoading(false)
      setErrors({ otp: "Invalid OTP. Please try again." })
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setResendTimer(30)
    setOtp(["", "", "", "", "", ""])
    setErrors({})
  }

  if (step === "otp") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-orange-700 hover:bg-orange-100"
            onClick={() => setStep("registration")}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Verify Phone</h1>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
            <p className="text-gray-600">
              We've sent a 6-digit code to <span className="font-medium">+91 {formData.phone}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={cn(
                  "w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                  errors.otp ? "border-red-500" : "border-gray-300",
                  digit ? "border-orange-500 bg-orange-50" : "",
                )}
              />
            ))}
          </div>

          {errors.otp && <p className="text-red-500 text-sm text-center mb-4">{errors.otp}</p>}

          {/* Verify Button */}
          <Button
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full h-12 text-lg font-medium rounded-full bg-orange-500 hover:bg-orange-600 text-white mb-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify & Continue"
            )}
          </Button>

          {/* Resend OTP */}
          <div className="text-center">
            {resendTimer > 0 ? (
              <p className="text-gray-600">
                Resend OTP in <span className="font-medium text-orange-600">{resendTimer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-orange-600 font-medium hover:text-orange-700 disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" className="text-orange-700 hover:bg-orange-100">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">Create Account</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join EnglishAI</h2>
          <p className="text-gray-600">Start your English learning journey today</p>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-8">
          {/* Name Field */}
          <div className="relative">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) {
                    setErrors({ ...errors, name: "" })
                  }
                }}
                className={cn(
                  "pl-10 h-12 rounded-lg border-2 transition-all duration-200",
                  "focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                  errors.name ? "border-red-500" : "border-gray-300",
                )}
                placeholder="Full Name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">+91</div>
              <Input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={cn(
                  "pl-20 h-12 rounded-lg border-2 transition-all duration-200",
                  "focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                  errors.phone ? "border-red-500" : "border-gray-300",
                )}
                placeholder="Phone Number"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Send OTP Button */}
        <Button
          onClick={handleSendOTP}
          disabled={isLoading}
          className="w-full h-12 text-lg font-medium rounded-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending OTP...
            </>
          ) : (
            "Send OTP"
          )}
        </Button>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-orange-600 hover:text-orange-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-orange-600 hover:text-orange-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
