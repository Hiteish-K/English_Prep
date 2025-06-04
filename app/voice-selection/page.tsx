"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const voiceOptions = [
  {
    id: "american-male",
    name: "American - Male",
    flag: "🇺🇸",
    accent: "American",
    gender: "Male",
    isDefault: false,
  },
  {
    id: "american-female",
    name: "American - Female",
    flag: "🇺🇸",
    accent: "American",
    gender: "Female",
    isDefault: true,
  },
  {
    id: "british-male",
    name: "British - Male",
    flag: "🇬🇧",
    accent: "British",
    gender: "Male",
    isDefault: false,
  },
  {
    id: "australian-male",
    name: "Australian - Male",
    flag: "🇦🇺",
    accent: "Australian",
    gender: "Male",
    isDefault: false,
  },
  {
    id: "australian-female",
    name: "Australian - Female",
    flag: "🇦🇺",
    accent: "Australian",
    gender: "Female",
    isDefault: false,
  },
]

export default function VoiceSelection() {
  const [selectedVoice, setSelectedVoice] = useState("american-female")
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)

  const handlePlayVoice = (voiceId: string) => {
    setPlayingVoice(voiceId)
    setTimeout(() => {
      setPlayingVoice(null)
    }, 2000)
  }

  const handleContinue = () => {
    localStorage.setItem("selectedVoice", selectedVoice)
    window.location.href = "/dashboard"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-soft-purple/5" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <Link href="/practice-time">
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="flex-1" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        {/* AI Character */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-electric-blue via-soft-purple to-theme-orange rounded-full flex items-center justify-center shadow-2xl shadow-electric-blue/25 relative">
            {/* AI Face */}
            <div className="relative">
              {/* Eyes */}
              <div className="flex gap-3 mb-2">
                <div className="w-3 h-3 bg-white rounded-full" />
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              {/* Mouth */}
              <div className="w-6 h-3 bg-white rounded-full mx-auto" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-theme-gold rounded-full opacity-80" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-theme-orange rounded-full opacity-60" />
            <div className="absolute top-1/2 -right-3 w-3 h-3 bg-electric-blue rounded-full opacity-70" />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/30 to-soft-purple/30 rounded-full blur-xl scale-110" />
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Select AI Tutor Voice</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
            Choose avatar voice you want in the app.{"\n"}
            You can always change it later.
          </p>
        </div>

        {/* Voice Options */}
        <div className="w-full max-w-sm space-y-3 mb-12">
          {voiceOptions.map((voice) => (
            <div
              key={voice.id}
              className={cn(
                "relative rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-sm",
                selectedVoice === voice.id
                  ? "bg-white/20 border-electric-blue shadow-lg shadow-electric-blue/25 scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20",
              )}
            >
              <button
                onClick={() => setSelectedVoice(voice.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Flag */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                    {voice.flag}
                  </div>

                  {/* Voice Info */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{voice.name}</h3>
                      {voice.isDefault && (
                        <span className="bg-gradient-to-r from-theme-gold to-theme-orange text-black text-xs font-medium px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlayVoice(voice.id)
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full transition-all duration-200",
                    playingVoice === voice.id
                      ? "bg-electric-blue text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
                  )}
                >
                  {playingVoice === voice.id ? <Volume2 className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              </button>

              {/* Selection Indicator */}
              {selectedVoice === voice.id && (
                <div className="absolute inset-0 rounded-2xl border-2 border-electric-blue pointer-events-none" />
              )}
            </div>
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
          onClick={() => (window.location.href = "/dashboard")}
        >
          Skip for now
        </Button>
      </div>
    </div>
  )
}
