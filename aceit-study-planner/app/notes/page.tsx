"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function NotesAndResources() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ id: "", title: "", content: "" })
  const [resources, setResources] = useState([])
  const [newResource, setNewResource] = useState({ name: "", url: "" })
  const { toast } = useToast()

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      if (newNote.id) {
        // Update existing note
        setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)))
        toast({
          title: "Note updated",
          description: "Your note has been updated successfully.",
        })
      } else {
        // Add new note
        const noteWithId = { ...newNote, id: Date.now().toString() }
        setNotes([...notes, noteWithId])
        toast({
          title: "Note added",
          description: "Your new note has been saved.",
        })
      }
      setNewNote({ id: "", title: "", content: "" })
    }
  }

  const handleEditNote = (note) => {
    setNewNote(note)
  }

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId))
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully.",
    })
  }

  const handleAddResource = () => {
    if (newResource.name && newResource.url) {
      setResources([...resources, newResource])
      setNewResource({ name: "", url: "" })
      toast({
        title: "Resource added",
        description: "Your new resource has been saved.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notes and Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Note Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Note Content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <Button onClick={handleAddNote}>{newNote.id ? "Update Note" : "Add Note"}</Button>
            </div>
            <ul className="mt-4 space-y-2">
              {notes.map((note) => (
                <li key={note.id} className="border p-2 rounded">
                  <h3 className="font-semibold">{note.title}</h3>
                  <p className="text-sm text-muted-foreground">{note.content}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditNote(note)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(note.id)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Resource Name"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
              <Input
                placeholder="Resource URL"
                value={newResource.url}
                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              />
              <Button onClick={handleAddResource}>Add Resource</Button>
            </div>
            <ul className="mt-4 space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

