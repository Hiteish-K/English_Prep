"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, PenTool, Clock, Target, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function WritingPractice() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [writingText, setWritingText] = useState("")

  const prompts = [
    {
      id: "daily-routine",
      title: "Describe Your Daily Routine",
      difficulty: "Beginner",
      timeLimit: "10 min",
      description: "Write about what you do from morning to evening",
      wordTarget: 150,
    },
    {
      id: "favorite-place",
      title: "Your Favorite Place",
      difficulty: "Intermediate",
      timeLimit: "15 min",
      description: "Describe a place that is special to you and explain why",
      wordTarget: 250,
    },
    {
      id: "future-goals",
      title: "Future Career Goals",
      difficulty: "Advanced",
      timeLimit: "20 min",
      description: "Discuss your professional aspirations and how you plan to achieve them",
      wordTarget: 350,
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

  const wordCount = writingText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  if (selectedPrompt) {
    const prompt = prompts.find((p) => p.id === selectedPrompt)!

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900">
        {/* Header */}
        <header className="px-5 py-6 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedPrompt(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{prompt.title}</h1>
              <p className="text-sm text-gray-300">{prompt.description}</p>
            </div>
          </div>

          {/* Writing Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-3 text-center">
                <Clock className="h-4 w-4 text-electric-blue mx-auto mb-1" />
                <p className="text-xs text-gray-300">Time</p>
                <p className="text-sm font-bold text-white">{prompt.timeLimit}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-3 text-center">
                <Target className="h-4 w-4 text-theme-gold mx-auto mb-1" />
                <p className="text-xs text-gray-300">Target</p>
                <p className="text-sm font-bold text-white">{prompt.wordTarget} words</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-3 text-center">
                <PenTool className="h-4 w-4 text-soft-purple mx-auto mb-1" />
                <p className="text-xs text-gray-300">Written</p>
                <p className="text-sm font-bold text-white">{wordCount} words</p>
              </CardContent>
            </Card>
          </div>
        </header>

        {/* Writing Area */}
        <main className="flex-1 px-5 pb-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl h-full">
            <CardContent className="p-4 h-full flex flex-col">
              <Textarea
                placeholder="Start writing your response here..."
                value={writingText}
                onChange={(e) => setWritingText(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 resize-none focus:ring-0 text-base leading-relaxed"
                rows={15}
              />

              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>
                    {wordCount} / {prompt.wordTarget} words
                  </span>
                  <div className={cn("px-2 py-1 rounded-full text-xs border", getDifficultyColor(prompt.difficulty))}>
                    {prompt.difficulty}
                  </div>
                </div>

                <Button
                  className="bg-gradient-to-r from-electric-blue to-soft-purple hover:from-electric-blue/90 hover:to-soft-purple/90 text-white"
                  disabled={wordCount < 50}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
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
            <h1 className="text-xl font-bold text-white">Writing Practice</h1>
            <p className="text-sm text-gray-300">Practice grammar & style</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-soft-purple to-purple-600 rounded-xl flex items-center justify-center">
                  <PenTool className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Writing Progress</h3>
                  <p className="text-sm text-gray-300">45% Complete</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-xs text-gray-300">Essays Written</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-6">
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <Card
              key={prompt.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl hover:shadow-lg hover:shadow-electric-blue/25 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedPrompt(prompt.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">{prompt.title}</h3>
                    <p className="text-sm text-gray-300 mb-3">{prompt.description}</p>

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full border",
                          getDifficultyColor(prompt.difficulty),
                        )}
                      >
                        {prompt.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{prompt.timeLimit}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Target className="h-3 w-3" />
                        <span className="text-xs">{prompt.wordTarget} words</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-soft-purple to-purple-600 hover:from-soft-purple/90 hover:to-purple-600/90 text-white">
                  <PenTool className="h-4 w-4 mr-2" />
                  Start Writing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
