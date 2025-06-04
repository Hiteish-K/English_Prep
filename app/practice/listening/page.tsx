"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Headphones, Play, Pause, Volume2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ListeningPractice() {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const exercises = [
    {
      id: "conversation-1",
      title: "Restaurant Conversation",
      difficulty: "Beginner",
      duration: "2:30",
      description: "Listen to a conversation between a customer and waiter",
      completed: true,
      questions: 5,
    },
    {
      id: "news-report",
      title: "Weather News Report",
      difficulty: "Intermediate",
      duration: "3:45",
      description: "A news anchor reporting on weather conditions",
      completed: false,
      questions: 8,
    },
    {
      id: "interview",
      title: "Job Interview Discussion",
      difficulty: "Advanced",
      duration: "5:20",
      description: "Professional interview conversation with complex vocabulary",
      completed: false,
      questions: 10,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-theme-gold/20 text-theme-gold border-theme-gold/30"
      case "Intermediate":
        return "bg-electric-blue/20 text-electric-blue border-electric-blue/30"
      case "Advanced":
        return "bg-theme-orange/20 text-theme-orange border-theme-orange/30"
      default:
        return "bg-white/20 text-white border-white/30"
    }
  }

  const handlePlayAudio = (audioId: string) => {
    if (playingAudio === audioId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(audioId)
      // Simulate audio playback
      setTimeout(() => {
        setPlayingAudio(null)
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900">
      {/* Header */}
      <header className="px-5 py-6 pt-12">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Listening Practice</h1>
            <p className="text-sm text-gray-300">Train your ear</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-theme-gold to-yellow-500 rounded-xl flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Listening Progress</h3>
                  <p className="text-sm text-gray-300">70% Complete</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">15</p>
                <p className="text-xs text-gray-300">Exercises Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-6">
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl hover:shadow-lg hover:shadow-electric-blue/25 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-white">{exercise.title}</h3>
                      {exercise.completed && <CheckCircle className="h-4 w-4 text-theme-gold" />}
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{exercise.description}</p>

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full border",
                          getDifficultyColor(exercise.difficulty),
                        )}
                      >
                        {exercise.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Volume2 className="h-3 w-3" />
                        <span className="text-xs">{exercise.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <span className="text-xs">{exercise.questions} questions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Player */}
                <div className="bg-white/5 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePlayAudio(exercise.id)}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-gold to-yellow-500 hover:from-theme-gold/90 hover:to-yellow-500/90 text-white"
                    >
                      {playingAudio === exercise.id ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>

                    {/* Waveform visualization */}
                    <div className="flex items-center gap-1 flex-1">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-1 rounded-full transition-all duration-200",
                            playingAudio === exercise.id ? "bg-theme-gold animate-pulse" : "bg-white/30",
                          )}
                          style={{
                            height: `${Math.random() * 20 + 8}px`,
                          }}
                        />
                      ))}
                    </div>

                    <span className="text-xs text-gray-300">{exercise.duration}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-theme-gold to-yellow-500 hover:from-theme-gold/90 hover:to-yellow-500/90 text-white">
                  <Headphones className="h-4 w-4 mr-2" />
                  {exercise.completed ? "Practice Again" : "Start Listening"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
