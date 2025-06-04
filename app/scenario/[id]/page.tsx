"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Briefcase, Mic, Star, Clock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Mock data - in real app this would come from params/API
const scenarioData = {
  id: "job-interview",
  title: "Job Interview Practice",
  icon: <Briefcase className="h-10 w-10" />,
  difficulty: "Intermediate" as const,
  color: "bg-purple-600",
  bgColor: "bg-purple-50",
  description:
    "Practice professional conversations and build confidence for your next job interview. You'll learn how to introduce yourself, discuss your experience, and answer common interview questions with clarity and professionalism.",
  estimatedTime: "3-5 minutes",
  rating: 4.8,
  reviews: 124,
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "Intermediate":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "Advanced":
      return "bg-rose-100 text-rose-800 border-rose-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ScenarioDetail() {
  const handleStartConversation = () => {
    // Navigate to conversation interface
    window.location.href = `/conversation/${scenarioData.id}`
  }

  const handleBackToHome = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Image */}
      <div className="relative h-80 w-full">
        <Image src="/placeholder.svg?height=400&width=400" alt="Job Interview" fill className="object-cover" />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToHome}
            className="bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 -mt-6 rounded-t-3xl bg-white relative z-10">
        <div className="max-w-md mx-auto">
          {/* Title Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-sm font-medium px-3 py-1 rounded-full border",
                  getDifficultyColor(scenarioData.difficulty),
                )}
              >
                {scenarioData.difficulty}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{scenarioData.rating}</span>
                <span className="text-xs text-gray-500">({scenarioData.reviews})</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{scenarioData.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{scenarioData.estimatedTime}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{scenarioData.description}</p>
          </div>

          {/* What You'll Learn */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">What you'll learn</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">1</span>
                </div>
                <p className="text-sm text-gray-700">Professional introduction techniques</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">2</span>
                </div>
                <p className="text-sm text-gray-700">Answering common interview questions</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">3</span>
                </div>
                <p className="text-sm text-gray-700">Discussing your experience confidently</p>
              </div>
            </div>
          </div>

          {/* Related Scenarios */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">Related scenarios</h2>
              <Button variant="ghost" size="sm" className="text-purple-600 text-sm">
                View all
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Networking</h3>
                    <p className="text-xs text-gray-500">Professional connections</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Salary Negotiation</h3>
                    <p className="text-xs text-gray-500">Discuss compensation</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleStartConversation}
            className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg"
          >
            <Mic className="mr-2 h-5 w-5" />
            Start Conversation
          </Button>
        </div>
      </main>
    </div>
  )
}
