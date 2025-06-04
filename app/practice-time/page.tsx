"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const practiceOptions = [
  { minutes: 5, label: "5 minutes", description: "Quick daily practice" },
  { minutes: 10, label: "10 minutes", description: "Recommended for beginners", recommended: true },
  { minutes: 15, label: "15 minutes", description: "Good progress pace" },
  { minutes: 20, label: "20 minutes", description: "Faster improvement" },
  { minutes: 30, label: "30 minutes", description: "Intensive learning" },
]

export default function PracticeTimeSelection() {
  const [selectedTime, setSelectedTime] = useState(10)

  const handleContinue = () => {
    localStorage.setItem("dailyPracticeTime", selectedTime.toString())
    window.location.href = "/voice-selection"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href="/language-selection">
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="flex-1" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-electric-blue to-soft-purple rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-electric-blue/25">
          <Target className="h-12 w-12 text-white" />
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Set Your Daily Goal</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
            Choose how many minutes you want to practice English each day.
          </p>
        </div>

        {/* Practice Time Options */}
        <div className="w-full max-w-sm space-y-3 mb-12">
          {practiceOptions.map((option) => (
            <button
              key={option.minutes}
              onClick={() => setSelectedTime(option.minutes)}
              className={cn(
                "w-full p-4 rounded-2xl border-2 transition-all duration-200 relative",
                "flex items-center justify-between backdrop-blur-sm",
                selectedTime === option.minutes
                  ? "bg-white/20 border-electric-blue shadow-lg shadow-electric-blue/25"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    selectedTime === option.minutes
                      ? "bg-gradient-to-br from-electric-blue to-soft-purple text-white"
                      : "bg-white/10 text-white/70",
                  )}
                >
                  <Clock className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{option.label}</h3>
                    {option.recommended && (
                      <span className="bg-gradient-to-r from-theme-gold to-theme-orange text-xs font-bold px-2 py-1 rounded-full text-black">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300">{option.description}</p>
                </div>
              </div>

              {/* Selection Indicator */}
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all duration-200",
                  selectedTime === option.minutes ? "bg-electric-blue border-electric-blue" : "border-white/30",
                )}
              >
                {selectedTime === option.minutes && <div className="w-full h-full rounded-full bg-white scale-50" />}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full max-w-sm h-14 bg-gradient-to-r from-electric-blue to-soft-purple hover:from-electric-blue/90 hover:to-soft-purple/90 text-white font-bold text-lg rounded-2xl shadow-xl shadow-electric-blue/25"
        >
          Continue
        </Button>

        {/* Skip Option */}
        <Button
          variant="ghost"
          className="mt-4 text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => (window.location.href = "/voice-selection")}
        >
          Skip for now
        </Button>
      </div>
    </div>
  )
}
