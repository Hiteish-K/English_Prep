"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Clock, CheckCircle, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ReadingPractice() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  const articles = [
    {
      id: "tech-trends",
      title: "Technology Trends in 2025",
      difficulty: "Intermediate",
      readTime: "5 min",
      description: "Explore the latest innovations shaping our digital future",
      completed: false,
    },
    {
      id: "climate-change",
      title: "Understanding Climate Change",
      difficulty: "Advanced",
      readTime: "8 min",
      description: "A comprehensive look at environmental challenges",
      completed: true,
    },
    {
      id: "healthy-living",
      title: "Tips for Healthy Living",
      difficulty: "Beginner",
      readTime: "3 min",
      description: "Simple ways to improve your daily wellness routine",
      completed: false,
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
            <h1 className="text-xl font-bold text-white">Reading Practice</h1>
            <p className="text-sm text-gray-300">Improve your comprehension skills</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Reading Progress</h3>
                  <p className="text-sm text-gray-300">65% Complete</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-xs text-gray-300">Articles Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-6">
        <div className="space-y-4">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl hover:shadow-lg hover:shadow-electric-blue/25 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-white">{article.title}</h3>
                      {article.completed && <CheckCircle className="h-4 w-4 text-theme-gold" />}
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{article.description}</p>

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full border",
                          getDifficultyColor(article.difficulty),
                        )}
                      >
                        {article.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-electric-blue to-soft-purple hover:from-electric-blue/90 hover:to-soft-purple/90 text-white"
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {article.completed ? "Read Again" : "Start Reading"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
