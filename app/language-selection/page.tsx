"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, MessageSquare, Users, Star } from "lucide-react"
import Link from "next/link"

export default function OnboardingScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900 px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="flex-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-electric-blue to-soft-purple rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-electric-blue/25">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to EnglishAI!</h1>
          <p className="text-gray-300 leading-relaxed">
            Get ready to improve your English speaking skills with AI-powered conversations and personalized feedback.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 gap-4 w-full mb-12">
          <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-electric-blue/20 to-electric-blue/40 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-electric-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Practice Conversations</h3>
              <p className="text-sm text-gray-300">Real-world scenarios to build confidence</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-theme-gold/20 to-theme-gold/40 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-theme-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Feedback</h3>
              <p className="text-sm text-gray-300">Get detailed analysis of your speaking</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-soft-purple/20 to-soft-purple/40 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-soft-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Track Progress</h3>
              <p className="text-sm text-gray-300">Monitor your improvement over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-md mx-auto">
        <Link href="/practice-time">
          <Button className="w-full h-12 text-lg font-medium rounded-full bg-gradient-to-r from-electric-blue to-soft-purple hover:from-electric-blue/90 hover:to-soft-purple/90 text-white shadow-lg shadow-electric-blue/25">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
