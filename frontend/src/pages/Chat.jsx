import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SendIcon, Trash2Icon } from "lucide-react"
import ChatMessage from "@/components/ChatMessage"

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Alto Shopping assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef(null)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Mock response for now
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm currently in 'UI mode'. Once the backend is ready, I'll be able to answer questions about shops, sales, and more!" }
      ])
    }, 1000)
  }

  const handleClear = () => {
    setMessages([{ role: "assistant", content: "History cleared. How can I help you today?" }])
  }

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  return (
    <div className="container mx-auto max-w-2xl p-4 h-[calc(100vh-4rem)] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-primary flex items-center gap-2">
            <span className="size-3 bg-primary rounded-full animate-pulse" />
            Alto Shopping AI
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClear} title="Clear history">
            <Trash2Icon className="size-4 text-muted-foreground" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea ref={scrollRef} className="h-full p-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} {...msg} />
            ))}
          </ScrollArea>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex w-full items-center gap-2"
          >
            <Input
              placeholder="Ask about shops, sales, employees..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <SendIcon className="size-4" data-icon="inline-start" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
