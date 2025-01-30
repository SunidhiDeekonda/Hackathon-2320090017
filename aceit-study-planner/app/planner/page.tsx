"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

const localizer = momentLocalizer(moment)

export default function Planner() {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", isReminder: false })
  const { toast } = useToast()

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: "", start, end, isReminder: false })
  }

  const handleSaveEvent = () => {
    if (newEvent.title) {
      setEvents([...events, newEvent])
      setNewEvent({ title: "", start: "", end: "", isReminder: false })
      toast({
        title: newEvent.isReminder ? "Reminder added" : "Study session added",
        description: `Your new ${newEvent.isReminder ? "reminder" : "study session"} has been added to the calendar.`,
      })
    }
  }

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
    toast({
      title: "Event updated",
      description: "Your event has been updated successfully.",
    })
  }

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter((event) => event.id !== eventToDelete.id))
    toast({
      title: "Event deleted",
      description: "Your event has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Study Planner</h1>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Study Session or Reminder</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Study Session or Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="event-title">Title</Label>
                <Input
                  id="event-title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="event-start">Start Time</Label>
                <Input
                  id="event-start"
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="event-end">End Time</Label>
                <Input
                  id="event-end"
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-reminder"
                  checked={newEvent.isReminder}
                  onCheckedChange={(checked) => setNewEvent({ ...newEvent, isReminder: checked })}
                />
                <Label htmlFor="is-reminder">Set as Reminder</Label>
              </div>
              <Button onClick={handleSaveEvent}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event) => {
              // Open a dialog to edit or delete the event
              // You can implement this similar to the add event dialog
            }}
            selectable
          />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {events
                  .filter((event) => event.isReminder)
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .slice(0, 5)
                  .map((reminder, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{reminder.title}</span>
                      <span className="text-sm text-muted-foreground">{new Date(reminder.start).toLocaleString()}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

