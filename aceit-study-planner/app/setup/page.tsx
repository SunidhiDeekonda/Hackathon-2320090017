"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function Setup() {
  const [subjects, setSubjects] = useState([{ name: "", examDate: "" }])
  const router = useRouter()
  const { toast } = useToast()

  const addSubject = () => {
    setSubjects([...subjects, { name: "", examDate: "" }])
  }

  const updateSubject = (index: number, field: "name" | "examDate", value: string) => {
    const updatedSubjects = subjects.map((subject, i) => {
      if (i === index) {
        return { ...subject, [field]: value }
      }
      return subject
    })
    setSubjects(updatedSubjects)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Subjects:", subjects)
    toast({
      title: "Setup complete!",
      description: "Your subjects and exam dates have been saved.",
    })
    router.push("/planner")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Set Up Your Study Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`subject-${index}`}>Subject {index + 1}</Label>
            <Input
              id={`subject-${index}`}
              value={subject.name}
              onChange={(e) => updateSubject(index, "name", e.target.value)}
              required
            />
            <Label htmlFor={`exam-date-${index}`}>Exam Date</Label>
            <Input
              id={`exam-date-${index}`}
              type="date"
              value={subject.examDate}
              onChange={(e) => updateSubject(index, "examDate", e.target.value)}
              required
            />
          </div>
        ))}
        <Button type="button" onClick={addSubject} variant="outline">
          Add Another Subject
        </Button>
        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </div>
  )
}

