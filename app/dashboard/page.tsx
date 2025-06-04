"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  UtensilsCrossed,
  MessageCircle,
  Presentation,
  Home,
  TrendingUp,
  Settings,
  Calendar,
  ChevronRight,
  Trophy,
  Clock,
  Flame,
  BookOpen,
  PenTool,
  Headphones,
  Mic2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Difficulty = "Beginner" | "Intermediate" | "Advanced"

interface ConversationScenario {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  difficulty: Difficulty
  color: string
  bgColor: string
}

// Add practice sections data after scenarios array:
const practiceAreas = [
  {
    id: "reading",
    title: "Reading",
    description: "Improve comprehension",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-gradient-to-br from-electric-blue to-blue-600",
    bgColor: "bg-gradient-to-br from-electric-blue/20 to-blue-600/20",
    progress: 65,
  },
  {
    id: "writing",
    title: "Writing",
    description: "Practice grammar & style",
    icon: <PenTool className="h-5 w-5" />,
    color: "bg-gradient-to-br from-soft-purple to-purple-600",
    bgColor: "bg-gradient-to-br from-soft-purple/20 to-purple-600/20",
    progress: 45,
  },
  {
    id: "listening",
    title: "Listening",
    description: "Train your ear",
    icon: <Headphones className="h-5 w-5" />,
    color: "bg-gradient-to-br from-theme-gold to-yellow-500",
    bgColor: "bg-gradient-to-br from-theme-gold/20 to-yellow-500/20",
    progress: 70,
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "Build confidence",
    icon: <Mic2 className="h-5 w-5" />,
    color: "bg-gradient-to-br from-theme-orange to-red-500",
    bgColor: "bg-gradient-to-br from-theme-orange/20 to-red-500/20",
    progress: 80,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const userName = "Guest"
  const conversationsUsed = 3
  const totalConversations = 5
  const streakDays = 0

  const [dailyGoal, setDailyGoal] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dailyPracticeTime") || "10"
    }
    return "10"
  })

  const [selectedVoice, setSelectedVoice] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedVoice") || "american-female"
    }
    return "american-female"
  })

  // Calendar days for daily challenge
  const days = ["M", "T", "W", "T", "F", "S", "S"]
  const currentDay = 3 // Thursday (0-indexed)

  const scenarios: ConversationScenario[] = [
    {
      id: "job-interview",
      title: "Job Interview",
      description: "Practice professional conversations",
      icon: <Briefcase className="h-6 w-6" />,
      difficulty: "Intermediate",
      color: "bg-gradient-to-br from-soft-purple to-purple-600",
      bgColor: "bg-gradient-to-br from-soft-purple/20 to-purple-600/20",
    },
    {
      id: "restaurant",
      title: "Restaurant",
      description: "Order food and chat with servers",
      icon: <UtensilsCrossed className="h-6 w-6" />,
      difficulty: "Beginner",
      color: "bg-gradient-to-br from-theme-orange to-red-500",
      bgColor: "bg-gradient-to-br from-theme-orange/20 to-red-500/20",
    },
    {
      id: "small-talk",
      title: "Small Talk",
      description: "Casual everyday conversations",
      icon: <MessageCircle className="h-6 w-6" />,
      difficulty: "Beginner",
      color: "bg-gradient-to-br from-electric-blue to-blue-600",
      bgColor: "bg-gradient-to-br from-electric-blue/20 to-blue-600/20",
    },
    {
      id: "presentation",
      title: "Presentation",
      description: "Present ideas confidently",
      icon: <Presentation className="h-6 w-6" />,
      difficulty: "Advanced",
      color: "bg-gradient-to-br from-theme-gold to-yellow-500",
      bgColor: "bg-gradient-to-br from-theme-gold/20 to-yellow-500/20",
    },
  ]

  const navigationTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900">
      {/* Main Content */}
      <main className="flex-1 px-5 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Challenge</h1>
            <p className="text-sm text-gray-300">Keep practicing to improve!</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-electric-blue/50">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-electric-blue to-soft-purple text-white font-semibold">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Calendar Days */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-electric-blue" />
              <span className="text-sm font-medium text-gray-300">This week</span>
            </div>
            <span className="text-xs text-gray-400">May 2025</span>
          </div>

          <div className="flex justify-between">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-2">{day}</span>
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm",
                    index === currentDay
                      ? "bg-gradient-to-br from-electric-blue to-soft-purple text-white shadow-lg shadow-electric-blue/25"
                      : index < currentDay
                        ? "bg-electric-blue/20 text-electric-blue border border-electric-blue/30"
                        : "bg-white/10 text-gray-400 border border-white/20",
                  )}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gradient-to-br from-electric-blue/20 to-electric-blue/10 backdrop-blur-sm border border-electric-blue/30 rounded-2xl p-3">
            <div className="flex flex-col h-full">
              <span className="text-xs text-electric-blue mb-1">Streak</span>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-theme-orange" />
                <span className="text-lg font-bold text-white">{streakDays} days</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-theme-gold/20 to-theme-gold/10 backdrop-blur-sm border border-theme-gold/30 rounded-2xl p-3">
            <div className="flex flex-col h-full">
              <span className="text-xs text-theme-gold mb-1">Time</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-theme-gold" />
                <span className="text-lg font-bold text-white">0/{dailyGoal} min</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-theme-orange/20 to-theme-orange/10 backdrop-blur-sm border border-theme-orange/30 rounded-2xl p-3">
            <div className="flex flex-col h-full">
              <span className="text-xs text-theme-orange mb-1">Points</span>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-theme-gold" />
                <span className="text-lg font-bold text-white">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Practice</h2>

          <div className="grid grid-cols-2 gap-3">
            {practiceAreas.map((area) => (
              <Link key={area.id} href={`/practice/${area.id}`}>
                <div
                  className={cn(
                    "rounded-2xl p-4 transition-all duration-200 backdrop-blur-sm border border-white/20",
                    "hover:shadow-lg hover:shadow-electric-blue/25 active:scale-[0.98]",
                    area.bgColor,
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", area.color)}>
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">{area.title}</h3>
                      <p className="text-xs text-gray-300">{area.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-300">Progress</span>
                      <span className="text-xs text-white font-medium">{area.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-electric-blue to-soft-purple h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${area.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Your Plan Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Your plan</h2>

          <div className="grid grid-cols-1 gap-4">
            {scenarios.map((scenario) => (
              <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
                <div
                  className={cn(
                    "rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 backdrop-blur-sm border border-white/20",
                    "hover:shadow-lg hover:shadow-electric-blue/25 active:scale-[0.98]",
                    scenario.bgColor,
                  )}
                >
                  <div
                    className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", scenario.color)}
                  >
                    {scenario.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-white">{scenario.title}</h3>
                    <p className="text-xs text-gray-300">{scenario.description}</p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Courses */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Featured</h2>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
            <div className="min-w-[140px] w-36 h-36 bg-gradient-to-br from-soft-purple to-purple-600 rounded-2xl flex flex-col justify-end p-4 shadow-lg shadow-soft-purple/25">
              <span className="text-xs text-purple-200">New</span>
              <h3 className="text-white font-bold">Job Interview Mastery</h3>
            </div>

            <div className="min-w-[140px] w-36 h-36 bg-gradient-to-br from-theme-orange to-red-500 rounded-2xl flex flex-col justify-end p-4 shadow-lg shadow-theme-orange/25">
              <span className="text-xs text-orange-200">Popular</span>
              <h3 className="text-white font-bold">Daily Conversations</h3>
            </div>

            <div className="min-w-[140px] w-36 h-36 bg-gradient-to-br from-electric-blue to-blue-600 rounded-2xl flex flex-col justify-end p-4 shadow-lg shadow-electric-blue/25">
              <span className="text-xs text-blue-200">Advanced</span>
              <h3 className="text-white font-bold">Business English</h3>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/10 backdrop-blur-sm border-t border-white/20 px-6 py-2 fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-around max-w-md mx-auto">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <Link
                key={tab.id}
                href={tab.id === "progress" ? "/progress" : tab.id === "settings" ? "/settings" : "/dashboard"}
              >
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all duration-200",
                    isActive ? "text-electric-blue" : "text-gray-400",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-electric-blue" : "text-gray-400")} />
                  <span className={cn("text-xs", isActive ? "text-electric-blue" : "text-gray-400")}>{tab.label}</span>
                </button>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
