"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Trophy } from "lucide-react"

export default function ProgressPage() {
  const [progress, setProgress] = useState(0)
  const [reminders, setReminders] = useState([
    { id: 1, text: "Review Math Chapter 5", time: "2023-06-10T14:00" },
    { id: 2, text: "Complete Physics Problem Set", time: "2023-06-11T10:00" },
    { id: 3, text: "Prepare English Essay Outline", time: "2023-06-12T16:00" },
  ])
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Week Complete", description: "Completed your first week of consistent studying" },
    { id: 2, name: "Math Master", description: "Completed all Math study sessions" },
  ])

  useEffect(() => {
    // Simulate progress update
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 10, 100)
        if (newProgress === 100) {
          clearInterval(timer)
        }
        return newProgress
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Progress</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-center">{progress}% Complete</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" />
              Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reminders.map((reminder) => (
                <li key={reminder.id} className="flex justify-between items-center">
                  <span>{reminder.text}</span>
                  <span className="text-sm text-muted-foreground">{new Date(reminder.time).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {achievements.map((achievement) => (
                <li key={achievement.id}>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

