import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AceIt Study Planner</h1>
          <nav>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Plan Your Studies, Ace Your Exams!</h2>
        <p className="text-xl mb-8">AceIt helps you manage your time effectively and stay on top of your studies.</p>
        <Link href="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © 2025 AceIt Study Planner. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

