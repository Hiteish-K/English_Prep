"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Trophy, Diamond, Flame, Home, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ProgressDashboard() {
  const [activeTab, setActiveTab] = useState("progress")

  // Mock user data
  const userData = {
    name: "Amy Nguyen",
    level: "CEFR C1",
    xp: 1220,
    rank: 234,
    score: 160,
    streak: 10,
    progressPercentage: 69,
    currentLevel: "Intermediate",
  }

  // Skills data for pentagon chart
  const skillsData = [
    { name: "Pronunciation", value: 85, angle: 0 },
    { name: "Fluency", value: 70, angle: 72 },
    { name: "Intonation", value: 60, angle: 144 },
    { name: "Grammar", value: 75, angle: 216 },
    { name: "Vocabulary", value: 80, angle: 288 },
  ]

  // Function to convert polar coordinates to cartesian
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  // Generate pentagon path
  const generatePentagonPath = (centerX: number, centerY: number, radius: number) => {
    const points = skillsData.map((_, index) => {
      const angle = index * 72 - 90 // Start from top
      return polarToCartesian(centerX, centerY, radius, angle)
    })

    return (
      `M ${points[0].x} ${points[0].y} ` +
      points
        .slice(1)
        .map((point) => `L ${point.x} ${point.y}`)
        .join(" ") +
      " Z"
    )
  }

  // Generate skills path based on values
  const generateSkillsPath = (centerX: number, centerY: number, maxRadius: number) => {
    const points = skillsData.map((skill) => {
      const radius = (skill.value / 100) * maxRadius
      const angle = skill.angle - 90 // Start from top
      return polarToCartesian(centerX, centerY, radius, angle)
    })

    return (
      `M ${points[0].x} ${points[0].y} ` +
      points
        .slice(1)
        .map((point) => `L ${point.x} ${point.y}`)
        .join(" ") +
      " Z"
    )
  }

  const navigationTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900 pb-20">
      {/* Header */}
      <header className="px-5 py-6 pt-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Track Your Progress</h1>
          <h2 className="text-3xl font-bold text-white">
            In{" "}
            <span className="bg-gradient-to-r from-electric-blue to-soft-purple bg-clip-text text-transparent">
              Real Time
            </span>
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5">
        {/* Profile Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl mb-8 overflow-hidden shadow-lg shadow-electric-blue/10">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-electric-blue/50">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZDnBHs47yMxFGhLguSTHj2xJU9A0gE.png"
                    alt={userData.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-electric-blue to-soft-purple text-white text-xl font-bold">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-white">{userData.name}</h3>
                  <p className="text-gray-300">
                    {userData.level} • {userData.xp} XP
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10 rounded-full">
                <Edit className="h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-theme-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-theme-gold/25">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-300 text-sm">Rank</p>
                <p className="text-white font-bold text-lg">{userData.rank}</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-soft-purple to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 rotate-45 shadow-lg shadow-soft-purple/25">
                  <Diamond className="h-5 w-5 text-white -rotate-45" />
                </div>
                <p className="text-gray-300 text-sm">Score</p>
                <p className="text-white font-bold text-lg">{userData.score}</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-theme-orange to-red-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-theme-orange/25">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-300 text-sm">Streak</p>
                <p className="text-white font-bold text-lg">{userData.streak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl mb-8 shadow-lg shadow-electric-blue/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">My Learning Progress</h3>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-300 text-sm mb-1">Your Level</p>
                <p className="text-white font-bold text-lg">{userData.currentLevel}</p>
              </div>

              {/* Circular Progress */}
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-electric-blue"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${userData.progressPercentage}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{userData.progressPercentage}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-electric-blue" />
              </div>
              <span>Powered by ELSA</span>
            </div>
          </CardContent>
        </Card>

        {/* Skills Pentagon Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl mb-8 shadow-lg shadow-electric-blue/10">
          <CardContent className="p-6">
            <div className="relative w-full h-80 flex items-center justify-center">
              <svg width="280" height="280" viewBox="0 0 280 280" className="overflow-visible">
                {/* Background pentagon grid */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
                  <path
                    key={index}
                    d={generatePentagonPath(140, 140, 100 * scale)}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                ))}

                {/* Grid lines from center to vertices */}
                {skillsData.map((skill, index) => {
                  const point = polarToCartesian(140, 140, 100, skill.angle - 90)
                  return (
                    <line
                      key={index}
                      x1="140"
                      y1="140"
                      x2={point.x}
                      y2={point.y}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                  )
                })}

                {/* Skills data area */}
                <path
                  d={generateSkillsPath(140, 140, 100)}
                  fill="rgba(0, 207, 255, 0.3)"
                  stroke="#00CFFF"
                  strokeWidth="2"
                />

                {/* Skill points */}
                {skillsData.map((skill, index) => {
                  const radius = (skill.value / 100) * 100
                  const point = polarToCartesian(140, 140, radius, skill.angle - 90)
                  return (
                    <circle key={index} cx={point.x} cy={point.y} r="4" fill="#00CFFF" stroke="white" strokeWidth="2" />
                  )
                })}

                {/* Skill labels */}
                {skillsData.map((skill, index) => {
                  const labelPoint = polarToCartesian(140, 140, 120, skill.angle - 90)
                  return (
                    <text
                      key={index}
                      x={labelPoint.x}
                      y={labelPoint.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-white text-sm font-medium"
                      fill="white"
                    >
                      {skill.name}
                    </text>
                  )
                })}
              </svg>
            </div>
          </CardContent>
        </Card>
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
