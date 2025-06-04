"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mic2, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function SpeakingPractice() {
  const [recordingExercise, setRecordingExercise] = useState<string | null>(null)

  const exercises = [
    {
      id: "pronunciation-1",
      title: "Pronunciation Practice",
      difficulty: "Beginner",
      type: "Pronunciation",
      description: "Practice common English sounds and word stress",
      completed: true,
      duration: "5 min",
    },
    {
      id: "fluency-1",
      title: "Describe Your Hometown",
      difficulty: "Intermediate",
      type: "Fluency",
      description: "Speak for 2 minutes about your hometown without stopping",
      completed: false,
      duration: "3 min",
    },
    {
      id: "conversation-1",
      title: "Role Play: Job Interview",
      difficulty: "Advanced",
      type: "Conversation",
      description: "Practice answering common interview questions",
      completed: false,
      duration: "8 min",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Pronunciation":
        return "bg-soft-purple/20 text-soft-purple"
      case "Fluency":
        return "bg-electric-blue/20 text-electric-blue"
      case "Conversation":
        return "bg-theme-orange/20 text-theme-orange"
      default:
        return "bg-white/20 text-white"
    }
  }

  const handleStartRecording = (exerciseId: string) => {
    setRecordingExercise(exerciseId)
    // Simulate recording
    setTimeout(() => {
      setRecordingExercise(null)
    }, 3000)
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
            <h1 className="text-xl font-bold text-white">Speaking Practice</h1>
            <p className="text-sm text-gray-300">Build confidence</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-theme-orange to-red-500 rounded-xl flex items-center justify-center">
                  <Mic2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Speaking Progress</h3>
                  <p className="text-sm text-gray-300">80% Complete</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">25</p>
                <p className="text-xs text-gray-300">Sessions Done</p>
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

                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full border",
                          getDifficultyColor(exercise.difficulty),
                        )}
                      >
                        {exercise.difficulty}
                      </span>
                      <span className={cn("text-xs font-medium px-2 py-1 rounded-full", getTypeColor(exercise.type))}>
                        {exercise.type}
                      </span>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{exercise.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recording Interface */}
                {recordingExercise === exercise.id ? (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white font-medium">Recording in progress...</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-6 bg-red-500 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-center gap-3 text-gray-300">
                      <Mic2 className="h-5 w-5" />
                      <span className="text-sm">Tap the button below to start recording</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-theme-orange to-red-500 hover:from-theme-orange/90 hover:to-red-500/90 text-white"
                  onClick={() => handleStartRecording(exercise.id)}
                  disabled={recordingExercise === exercise.id}
                >
                  <Mic2 className="h-4 w-4 mr-2" />
                  {recordingExercise === exercise.id
                    ? "Recording..."
                    : exercise.completed
                      ? "Practice Again"
                      : "Start Speaking"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
