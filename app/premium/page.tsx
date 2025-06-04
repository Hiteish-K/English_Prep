"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Check,
  Crown,
  MessageSquare,
  TrendingUp,
  Users,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  CreditCard,
  Banknote,
  Lock,
  RefreshCw,
  Award,
  Zap,
  Target,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
  improvement: string
}

export default function PremiumUpgrade() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Priya Sharma",
      role: "Software Engineer",
      content:
        "EnglishAI Premium transformed my confidence in job interviews. The detailed feedback helped me identify exactly what to improve.",
      rating: 5,
      avatar: "PS",
      improvement: "Confidence increased by 40%",
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      role: "Business Analyst",
      content:
        "The unlimited conversations feature is amazing! I practice daily now and my English has improved dramatically in just 2 months.",
      rating: 5,
      avatar: "RK",
      improvement: "Fluency improved by 60%",
    },
    {
      id: "3",
      name: "Anita Patel",
      role: "Marketing Manager",
      content:
        "Premium scenarios are so realistic! The restaurant and presentation modules helped me in real-life situations immediately.",
      rating: 5,
      avatar: "AP",
      improvement: "Speaking speed increased by 35%",
    },
  ]

  const features = [
    {
      category: "Daily Practice",
      free: "5 conversations per day",
      premium: "Unlimited conversations",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      category: "Feedback Quality",
      free: "Basic score & tips",
      premium: "Detailed analysis with pronunciation, grammar & vocabulary insights",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      category: "Scenarios",
      free: "4 basic scenarios",
      premium: "20+ scenarios + 3 new ones monthly",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      category: "Progress Tracking",
      free: "Basic progress view",
      premium: "Advanced analytics, streak recovery, goal setting",
      icon: <Target className="h-5 w-5" />,
    },
    {
      category: "AI Tutor",
      free: "Standard responses",
      premium: "Personalized AI tutor with adaptive learning",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      category: "Support",
      free: "Community support",
      premium: "Priority email support + live chat",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes! You can cancel your subscription at any time. You'll continue to have access to Premium features until the end of your billing period.",
    },
    {
      question: "What happens after my free trial ends?",
      answer:
        "After your 7-day free trial, you'll be charged ₹99/month. You can cancel anytime during the trial period without any charges.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with Premium, contact us within 30 days for a full refund.",
    },
    {
      question: "Will my progress be saved if I downgrade?",
      answer: "All your conversation history, progress data, and achievements are permanently saved to your account.",
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees! The price you see is exactly what you pay. No setup fees, no cancellation charges.",
    },
    {
      question: "Can I use Premium on multiple devices?",
      answer: "Yes! Your Premium subscription works across all your devices - phone, tablet, and computer.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleStartTrial = () => {
    // Navigate to payment flow
    console.log("Starting free trial...")
  }

  const handleMaybeLater = () => {
    // Navigate back to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (window.location.href = "/dashboard")}
            className="text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900">Premium Features</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full">
            <Crown className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-800">Premium Experience</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Unlock Your Full
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Potential
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Take your English speaking skills to the next level with unlimited practice, detailed feedback, and
            personalized learning experiences.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              <span>10,000+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-green-600" />
              <span>95% success rate</span>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md border-2 border-indigo-200 shadow-2xl bg-gradient-to-br from-white to-indigo-50 relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 text-sm font-medium">
                🎉 7 Days Free Trial
              </Badge>
            </div>

            <CardHeader className="text-center pt-8 pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Premium Plan</CardTitle>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">₹99</span>
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600">Cancel anytime • No hidden fees</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Unlimited conversations daily</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Detailed AI feedback & analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">20+ scenarios + 3 new monthly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Advanced progress analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Priority support</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900 text-center">Secure Payment Options</p>
                <div className="flex justify-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">UPI</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Card</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                    <Banknote className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-800">GPay</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleStartTrial}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Start 7-Day Free Trial
                </Button>
                <Button
                  onClick={handleMaybeLater}
                  variant="ghost"
                  className="w-full h-10 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Maybe Later
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span>30-day guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Compare Plans</h2>
            <p className="text-gray-600">See what you get with Premium</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                      <th className="text-center p-6 font-semibold text-gray-600">Free</th>
                      <th className="text-center p-6 font-semibold text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50">
                        Premium
                        <Badge className="ml-2 bg-indigo-600 text-white text-xs">Recommended</Badge>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              {feature.icon}
                            </div>
                            <span className="font-medium text-gray-900">{feature.category}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <span className="text-sm text-gray-600">{feature.free}</span>
                        </td>
                        <td className="p-6 text-center bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                          <div className="flex items-center justify-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-900">{feature.premium}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Success Stories</h2>
            <p className="text-gray-600">Hear from learners who transformed their English with Premium</p>
          </div>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full hover:bg-white/50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentTestimonial ? "bg-indigo-600 w-6" : "bg-gray-300",
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full hover:bg-white/50"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                <blockquote className="text-lg text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>

                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {testimonials[currentTestimonial].improvement}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about Premium</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Trust & Security */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Trusted by Thousands</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">30-Day Money Back</h4>
              <p className="text-sm text-gray-600">Not satisfied? Get a full refund within 30 days</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Secure Payments</h4>
              <p className="text-sm text-gray-600">Bank-level security for all transactions</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">10,000+ Happy Users</h4>
              <p className="text-sm text-gray-600">Join thousands who improved their English</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Transform Your English?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your 7-day free trial today and experience the difference Premium makes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              onClick={handleStartTrial}
              className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Start Free Trial Now
            </Button>
            <Button
              onClick={handleMaybeLater}
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              Continue with Free
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            No credit card required for trial • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </main>
    </div>
  )
}
