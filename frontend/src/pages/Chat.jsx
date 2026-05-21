import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SendIcon, Trash2Icon, Loader2Icon } from "lucide-react"
import ChatMessage from "@/components/ChatMessage"
import * as api from "@/lib/api"

const WELCOME_MESSAGE = { 
  role: "assistant", 
  content: "Hello! I'm your Alto Shopping assistant. How can I help you today?" 
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef(null)

  // Load history on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await api.getHistory()
        if (history.length > 0) {
          setMessages(history)
        } else {
          setMessages([WELCOME_MESSAGE])
        }
      } catch (error) {
        console.error("Failed to load history:", error)
        setMessages([WELCOME_MESSAGE])
      } finally {
        setIsLoading(false)
      }
    }
    loadHistory()
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isSending) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsSending(true)

    try {
      const response = await api.sendQuery(input)
      setMessages((prev) => [...prev, response])
    } catch (error) {
      console.error("Failed to send query:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleClear = async () => {
    if (confirm("Are you sure you want to clear the chat history?")) {
      try {
        await api.clearHistory()
        setMessages([WELCOME_MESSAGE])
      } catch (error) {
        console.error("Failed to clear history:", error)
      }
    }
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
          <div className="flex items-center gap-2">
            {isLoading && <Loader2Icon className="size-4 animate-spin text-muted-foreground" />}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClear} 
              title="Clear history"
              disabled={isLoading || messages.length <= 1}
            >
              <Trash2Icon className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 overflow-hidden p-0 relative">
          <ScrollArea ref={scrollRef} className="h-full p-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} {...msg} />
            ))}
            {isSending && (
              <div className="flex gap-2 mb-4 animate-pulse">
                <div className="size-8 rounded-full bg-primary/20" />
                <div className="bg-muted rounded-2xl px-4 py-2 text-sm">
                  Thinking...
                </div>
              </div>
            )}
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
              disabled={isLoading || isSending}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading || isSending}>
              {isSending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <SendIcon className="size-4" data-icon="inline-start" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
