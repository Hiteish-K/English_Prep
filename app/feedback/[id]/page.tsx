"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Trophy,
  Volume2,
  BookOpen,
  MessageSquare,
  RotateCcw,
  Shuffle,
  Share2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PronunciationWord {
  word: string
  score: "good" | "okay" | "needs-work"
  feedback?: string
}

interface GrammarSuggestion {
  issue: string
  before: string
  after: string
  explanation: string
}

interface VocabularyItem {
  word: string
  definition: string
  isNew?: boolean
}

export default function ConversationFeedback() {
  const [showCelebration, setShowCelebration] = useState(false)

  // Mock feedback data
  const feedbackData = {
    overallScore: 78,
    improvementFromLast: 12,
    sessionStats: {
      duration: "4 minutes",
      wordsSpoken: 45,
      responseTime: "2.3s avg",
      fluencyScore: 82,
    },
    pronunciation: [
      { word: "experience", score: "good" as const },
      { word: "professional", score: "okay" as const, feedback: "Try emphasizing the 'fes' syllable" },
      { word: "opportunity", score: "needs-work" as const, feedback: "Break it down: op-por-tu-ni-ty" },
      { word: "development", score: "good" as const },
      { word: "challenging", score: "okay" as const, feedback: "The 'ch' sound could be clearer" },
    ],
    grammar: [
      {
        issue: "Past tense consistency",
        before: "I work there for 3 years",
        after: "I worked there for 3 years",
        explanation: "Use past tense when describing completed actions",
      },
      {
        issue: "Article usage",
        before: "I am software developer",
        after: "I am a software developer",
        explanation: "Don't forget articles before job titles",
      },
    ],
    vocabulary: {
      newWords: [
        { word: "collaborate", definition: "to work together with others", isNew: true },
        { word: "innovative", definition: "introducing new ideas or methods", isNew: true },
      ],
      suggestions: [
        { word: "passionate", definition: "having strong feelings about something" },
        { word: "dedicated", definition: "committed to a task or purpose" },
        { word: "versatile", definition: "able to adapt to many different functions" },
      ],
    },
  }

  useEffect(() => {
    // Show celebration animation for good scores
    if (feedbackData.overallScore >= 75) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-600"
    if (score >= 60) return "from-yellow-500 to-orange-600"
    return "from-red-500 to-rose-600"
  }

  const getPronunciationColor = (score: "good" | "okay" | "needs-work") => {
    switch (score) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      case "okay":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "needs-work":
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const getPronunciationIcon = (score: "good" | "okay" | "needs-work") => {
    switch (score) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "okay":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "needs-work":
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (window.location.href = "/dashboard")}
            className="text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-gray-900">Great job! Here's your feedback</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        {/* Overall Score Card */}
        <Card className="border-0 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Confidence Score</h2>
                <p className="text-sm text-gray-600">Overall performance</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={cn("transition-all duration-1000 ease-out", getScoreColor(feedbackData.overallScore))}
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${feedbackData.overallScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn("text-3xl font-bold", getScoreColor(feedbackData.overallScore))}>
                    {feedbackData.overallScore}
                  </span>
                </div>
              </div>
            </div>

            {feedbackData.improvementFromLast > 0 && (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+{feedbackData.improvementFromLast}% from last session!</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Session Stats */}
        <Card className="border-0 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Session Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">{feedbackData.sessionStats.duration}</p>
              </div>
              <div className="text-center">
                <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Words Spoken</p>
                <p className="font-semibold text-gray-900">{feedbackData.sessionStats.wordsSpoken}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pronunciation Feedback */}
        <Card className="border-0 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-blue-600" />
              Pronunciation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedbackData.pronunciation.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  {getPronunciationIcon(item.score)}
                  <div>
                    <span className="font-medium text-gray-900">{item.word}</span>
                    {item.feedback && <p className="text-xs text-gray-600 mt-1">{item.feedback}</p>}
                  </div>
                </div>
                <Badge variant="outline" className={cn("text-xs", getPronunciationColor(item.score))}>
                  {item.score === "needs-work" ? "Practice" : item.score === "okay" ? "Good" : "Excellent"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grammar Feedback */}
        <Card className="border-0 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Grammar Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedbackData.grammar.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">{item.issue}</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                    <p className="text-sm text-red-800">
                      <span className="font-medium">Before:</span> "{item.before}"
                    </p>
                  </div>
                  <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Better:</span> "{item.after}"
                    </p>
                  </div>
                  <p className="text-xs text-purple-700">{item.explanation}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vocabulary Section */}
        <Card className="border-0 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Vocabulary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* New Words Used */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🎉 New words you used:</h4>
              <div className="space-y-2">
                {feedbackData.vocabulary.newWords.map((item, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-green-900">{item.word}</span>
                      <Badge className="bg-green-600 text-white text-xs">New!</Badge>
                    </div>
                    <p className="text-sm text-green-700">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary Suggestions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Try using these words:</h4>
              <div className="space-y-2">
                {feedbackData.vocabulary.suggestions.map((item, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-medium text-blue-900">{item.word}</span>
                    <p className="text-sm text-blue-700 mt-1">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            onClick={() => (window.location.href = "/scenario/job-interview")}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full shadow-[0_4px_15px_rgba(37,99,235,0.3)] transition-all duration-200"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Practice This Scenario Again
          </Button>

          <Button
            onClick={() => (window.location.href = "/dashboard")}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-200"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Try New Scenario
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 border-2 border-green-300 text-green-700 font-semibold rounded-full hover:bg-green-50 transition-all duration-200"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Progress
          </Button>
        </div>
      </main>
    </div>
  )
}
