"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Mic, Play, Pause, MoreVertical, Bot, Volume2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: Date
  isVoice?: boolean
  duration?: number
  isPlaying?: boolean
}

type RecordingState = "idle" | "recording" | "processing"
type PlayingState = "idle" | "playing" | "paused"

export default function ConversationInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm excited to help you practice for your job interview. Let's start with a simple question - can you tell me a bit about yourself?",
      timestamp: new Date(),
    },
  ])

  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [timer, setTimer] = useState(0)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null)
  const [conversationEnded, setConversationEnded] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout>()
  const timerIntervalRef = useRef<NodeJS.Timeout>()

  // Timer effect
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isAiTyping])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartRecording = () => {
    if (conversationEnded) return
    setRecordingState("recording")
    setRecordingDuration(0)

    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1)
    }, 1000)
  }

  const handleStopRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }

    setRecordingState("processing")

    // Simulate processing and adding user message
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content:
          "I'm a software developer with 3 years of experience in React and Node.js. I'm passionate about creating user-friendly applications and I'm always eager to learn new technologies.",
        timestamp: new Date(),
        isVoice: true,
        duration: recordingDuration,
      }

      setMessages((prev) => [...prev, userMessage])
      setRecordingState("idle")
      setRecordingDuration(0)

      // Check if this should be the last exchange
      if (messages.length >= 6) {
        // End conversation after a few exchanges
        setIsAiTyping(true)
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content:
              "Thank you for this great practice session! You've shown excellent communication skills. Let's review your performance.",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, aiMessage])
          setIsAiTyping(false)
          setConversationEnded(true)

          // Navigate to feedback after a short delay
          setTimeout(() => {
            window.location.href = "/feedback/job-interview"
          }, 2000)
        }, 2000)
      } else {
        // Continue conversation
        setIsAiTyping(true)
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content:
              "That's great! Your experience with React and Node.js sounds very valuable. What specific projects have you worked on that you're most proud of?",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, aiMessage])
          setIsAiTyping(false)
        }, 2000)
      }
    }, 1500)
  }

  const handlePlayAudio = (messageId: string) => {
    if (playingMessageId === messageId) {
      setPlayingMessageId(null)
    } else {
      setPlayingMessageId(messageId)
      // Simulate audio playback
      setTimeout(() => {
        setPlayingMessageId(null)
      }, 3000)
    }
  }

  const handleEndConversation = () => {
    // Navigate to feedback or dashboard
    if (messages.length > 1) {
      window.location.href = "/feedback/job-interview"
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEndConversation}
            className="text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Job Interview Practice</h1>
            <p className="text-sm text-gray-600">{formatTime(timer)}</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleEndConversation} className="text-gray-700 hover:bg-gray-100">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}>
            {message.type === "ai" && (
              <Avatar className="w-8 h-8 bg-blue-600 flex-shrink-0">
                <AvatarFallback className="bg-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
                message.type === "ai"
                  ? "bg-white text-gray-900 rounded-bl-md"
                  : "bg-green-600 text-white rounded-br-md",
              )}
            >
              {message.isVoice ? (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlayAudio(message.id)}
                    className={cn(
                      "h-8 w-8 rounded-full",
                      message.type === "user" ? "hover:bg-green-700 text-white" : "hover:bg-gray-100 text-gray-700",
                    )}
                  >
                    {playingMessageId === message.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  {/* Waveform visualization */}
                  <div className="flex items-center gap-1 flex-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-1 rounded-full transition-all duration-200",
                          message.type === "user" ? "bg-green-300" : "bg-gray-400",
                          playingMessageId === message.id && "animate-pulse",
                        )}
                        style={{
                          height: `${Math.random() * 20 + 8}px`,
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-xs opacity-75">{message.duration}s</span>
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.type === "ai" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlayAudio(message.id)}
                      className="mt-2 h-6 px-2 text-xs hover:bg-gray-100"
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      Listen
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <div className="flex gap-3 justify-start">
            <Avatar className="w-8 h-8 bg-blue-600 flex-shrink-0">
              <AvatarFallback className="bg-blue-600 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <Circle className="h-2 w-2 fill-gray-400 text-gray-400 animate-bounce" />
                  <Circle className="h-2 w-2 fill-gray-400 text-gray-400 animate-bounce [animation-delay:0.1s]" />
                  <Circle className="h-2 w-2 fill-gray-400 text-gray-400 animate-bounce [animation-delay:0.2s]" />
                </div>
                <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Recording Status Bar */}
      {recordingState === "recording" && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-red-700">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Recording... {formatTime(recordingDuration)}</span>
          </div>
        </div>
      )}

      {/* Processing Status Bar */}
      {recordingState === "processing" && (
        <div className="bg-blue-50 border-t border-blue-200 px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-blue-700">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Processing your response...</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        {conversationEnded ? (
          <div className="text-center">
            <p className="text-gray-600 mb-3">Conversation completed! Analyzing your performance...</p>
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <button
                onMouseDown={handleStartRecording}
                onMouseUp={handleStopRecording}
                onTouchStart={handleStartRecording}
                onTouchEnd={handleStopRecording}
                disabled={recordingState === "processing"}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg",
                  "focus:outline-none focus:ring-4 focus:ring-offset-2",
                  recordingState === "recording"
                    ? "bg-red-500 hover:bg-red-600 focus:ring-red-300 scale-110 animate-pulse"
                    : recordingState === "processing"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-300 hover:scale-105 active:scale-95",
                )}
              >
                {recordingState === "processing" ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Mic className="h-8 w-8 text-white" />
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-3">
              {recordingState === "recording"
                ? "Release to send"
                : recordingState === "processing"
                  ? "Processing..."
                  : "Hold to speak"}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
