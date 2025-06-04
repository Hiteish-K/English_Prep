import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-purple via-midnight-blue to-purple-900 px-4 py-8 text-white">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center text-center gap-8">
        {/* App Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-soft-purple rounded-xl flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-electric-blue to-soft-purple bg-clip-text text-transparent">
            EnglishAI
          </span>
        </div>

        {/* Illustration */}
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-soft-purple/20 rounded-full blur-3xl"></div>
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Person speaking with speech bubbles"
            fill
            className="object-contain relative z-10"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">Practice English with AI</h1>
          <p className="text-lg text-gray-300">Build confidence through conversation practice</p>
        </div>

        {/* CTA Button */}
        <Link href="/language-selection">
          <Button className="w-full max-w-xs h-12 text-lg font-medium rounded-full bg-gradient-to-r from-electric-blue to-soft-purple hover:from-electric-blue/90 hover:to-soft-purple/90 text-white shadow-lg shadow-electric-blue/25">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
