"use client"

import { DialogFooter } from "@/components/ui/dialog"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  User,
  SettingsIcon,
  Bell,
  BookOpen,
  HelpCircle,
  LogOut,
  Clock,
  Target,
  MessageSquare,
  Star,
  Shield,
  FileText,
  Mail,
  Crown,
  AlertTriangle,
  ExternalLink,
  Volume2,
  Edit,
  Loader2,
} from "lucide-react"

export default function SettingsPage() {
  // Settings states
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyProgress: true,
    achievements: true,
    reminderTime: "09:00",
  })

  const [learningPrefs, setLearningPrefs] = useState({
    dailyGoal: "10",
    difficulty: "intermediate",
    feedbackLevel: "detailed",
  })

  // Add after existing state declarations
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "+91 98765 43210",
    level: "Intermediate",
    nativeLanguage: "Hindi",
    learningGoals: "Improve speaking confidence for job interviews",
  })
  const [showEditDialog, setShowEditDialog] = useState(false)

  // Dialog states
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)

  // Error and success states
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    // Simply redirect to home page
    window.location.href = "/"
  }

  const SettingItem = ({
    icon,
    title,
    description,
    children,
    action,
  }: {
    icon: React.ReactNode
    title: string
    description?: string
    children?: React.ReactNode
    action?: React.ReactNode
  }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mt-0.5">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          {children}
        </div>
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  )

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setShowEditDialog(false)
    setSuccess("Profile updated successfully!")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (window.location.href = "/dashboard")}
            className="text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600">Manage your preferences</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Success/Error Messages */}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Profile Management */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-blue-100">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                    {editFormData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0 bg-white border-2 border-blue-100"
                  onClick={() => setShowEditDialog(true)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{editFormData.name}</h2>
                  <Badge className="bg-gray-100 text-gray-700">Free</Badge>
                </div>
                <p className="text-gray-600 text-sm">{editFormData.email}</p>
                <p className="text-gray-600 text-sm">{editFormData.level} Level</p>
                <Button
                  size="sm"
                  className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => (window.location.href = "/premium")}
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade to Premium
                </Button>
              </div>
            </div>

            {/* Quick Profile Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Days Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-sm text-gray-600">Goal Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-orange-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <SettingItem
              icon={<Clock className="h-5 w-5" />}
              title="Daily Practice Reminders"
              description="Get reminded to practice every day"
              action={
                <Switch
                  checked={notifications.dailyReminders}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dailyReminders: checked }))}
                />
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<MessageSquare className="h-5 w-5" />}
              title="Weekly Progress Updates"
              description="Receive weekly summaries of your progress"
              action={
                <Switch
                  checked={notifications.weeklyProgress}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyProgress: checked }))}
                />
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Star className="h-5 w-5" />}
              title="Achievement Notifications"
              description="Get notified when you unlock achievements"
              action={
                <Switch
                  checked={notifications.achievements}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, achievements: checked }))}
                />
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Bell className="h-5 w-5" />}
              title="Reminder Time"
              description="Choose when to receive daily reminders"
              action={
                <Select
                  value={notifications.reminderTime}
                  onValueChange={(value) => setNotifications((prev) => ({ ...prev, reminderTime: value }))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Learning Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <SettingItem
              icon={<Target className="h-5 w-5" />}
              title="Daily Goal"
              description="Set your daily practice target"
              action={
                <Select
                  value={learningPrefs.dailyGoal}
                  onValueChange={(value) => setLearningPrefs((prev) => ({ ...prev, dailyGoal: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<BookOpen className="h-5 w-5" />}
              title="Difficulty Level"
              description="Choose your preferred conversation difficulty"
              action={
                <Select
                  value={learningPrefs.difficulty}
                  onValueChange={(value) => setLearningPrefs((prev) => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Volume2 className="h-5 w-5" />}
              title="AI Voice"
              description="Choose your preferred AI tutor voice"
              action={
                <Button variant="outline" size="sm" onClick={() => (window.location.href = "/voice-selection")}>
                  Change
                </Button>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Clock className="h-5 w-5" />}
              title="Practice Time"
              description="Adjust your daily practice goal"
              action={
                <Button variant="outline" size="sm" onClick={() => (window.location.href = "/practice-time")}>
                  Change
                </Button>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<MessageSquare className="h-5 w-5" />}
              title="Feedback Detail"
              description="Choose how detailed you want feedback to be"
              action={
                <Select
                  value={learningPrefs.feedbackLevel}
                  onValueChange={(value) => setLearningPrefs((prev) => ({ ...prev, feedbackLevel: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Support & Help
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <SettingItem
              icon={<HelpCircle className="h-5 w-5" />}
              title="Help Center"
              description="Find answers to common questions"
              action={
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Mail className="h-5 w-5" />}
              title="Contact Support"
              description="Get help from our support team"
              action={
                <Button variant="outline" size="sm" onClick={() => setShowContactDialog(true)}>
                  Contact
                </Button>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Star className="h-5 w-5" />}
              title="Rate the App"
              description="Help us improve by rating the app"
              action={
                <Button variant="outline" size="sm">
                  Rate
                </Button>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<Shield className="h-5 w-5" />}
              title="Privacy Policy"
              description="Learn how we protect your data"
              action={
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              }
            />

            <Separator className="my-4" />

            <SettingItem
              icon={<FileText className="h-5 w-5" />}
              title="Terms of Service"
              description="Read our terms and conditions"
              action={
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* App Actions */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <SettingsIcon className="h-5 w-5 text-gray-600" />
              App Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 hover:bg-gray-50"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit App
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Exit App</DialogTitle>
            <DialogDescription>Are you sure you want to exit? Your progress will be saved.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white">
              Exit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Support Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>Describe your issue and we'll get back to you within 24 hours.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea placeholder="Please describe your issue in detail..." rows={4} />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your personal information and learning preferences.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Current Level</Label>
              <Select
                value={editFormData.level}
                onValueChange={(value) => setEditFormData({ ...editFormData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nativeLanguage">Native Language</Label>
              <Select
                value={editFormData.nativeLanguage}
                onValueChange={(value) => setEditFormData({ ...editFormData, nativeLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="Marathi">Marathi</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                  <SelectItem value="Kannada">Kannada</SelectItem>
                  <SelectItem value="Malayalam">Malayalam</SelectItem>
                  <SelectItem value="Punjabi">Punjabi</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Learning Goals</Label>
              <Textarea
                id="goals"
                value={editFormData.learningGoals}
                onChange={(e) => setEditFormData({ ...editFormData, learningGoals: e.target.value })}
                placeholder="What do you want to achieve with English?"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
