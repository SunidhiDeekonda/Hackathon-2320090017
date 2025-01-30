"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Bell } from "lucide-react"

export default function Reminders() {
  const [reminders, setReminders] = useState([])
  const [newReminder, setNewReminder] = useState({ id: "", text: "", time: "" })
  const { toast } = useToast()

  const handleAddReminder = () => {
    if (newReminder.text && newReminder.time) {
      if (newReminder.id) {
        // Update existing reminder
        setReminders(reminders.map((reminder) => (reminder.id === newReminder.id ? newReminder : reminder)))
        toast({
          title: "Reminder updated",
          description: "Your reminder has been updated successfully.",
        })
      } else {
        // Add new reminder
        const reminderWithId = { ...newReminder, id: Date.now().toString() }
        setReminders([...reminders, reminderWithId])
        toast({
          title: "Reminder added",
          description: "Your new reminder has been saved.",
        })
      }
      setNewReminder({ id: "", text: "", time: "" })
    }
  }

  const handleEditReminder = (reminder) => {
    setNewReminder(reminder)
  }

  const handleDeleteReminder = (reminderId) => {
    setReminders(reminders.filter((reminder) => reminder.id !== reminderId))
    toast({
      title: "Reminder deleted",
      description: "Your reminder has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2" />
            Manage Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <Input
              placeholder="Reminder Text"
              value={newReminder.text}
              onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
            />
            <Input
              type="datetime-local"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
            />
            <Button onClick={handleAddReminder}>{newReminder.id ? "Update Reminder" : "Add Reminder"}</Button>
          </div>
          <ul className="space-y-2">
            {reminders
              .sort((a, b) => new Date(a.time) - new Date(b.time))
              .map((reminder) => (
                <li key={reminder.id} className="flex justify-between items-center border p-2 rounded">
                  <div>
                    <span>{reminder.text}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {new Date(reminder.time).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditReminder(reminder)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteReminder(reminder.id)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

