import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon, Trash2Icon, Loader2Icon, Sparkles, Database, Info } from "lucide-react"
import ChatMessage from "@/components/ChatMessage"
import ConfirmationModal from "@/components/ConfirmationModal"
import * as api from "@/lib/api"

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Welcome to the Agentic DB Explorer. I am an autonomous agent currently connected to the Alto Rosario Shopping example database. \n\nI can help you analyze shops, sales, and mall operations without writing a single line of SQL. \n\nHow shall we begin our investigation?"
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  {/*useEffect(() => {
    scrollToBottom()
  }, [messages, isSending])
*/}
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
        { role: "assistant", content: "Apologies, but my connection to the analytical engine was interrupted. Please try again." }
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleClear = async () => {
    try {
      await api.clearHistory()
      setMessages([WELCOME_MESSAGE])
      setIsModalOpen(false)
    } catch (error) {
      console.error("Failed to clear history:", error)
    }
  }

  return (
    <div className="flex flex-col p-6 gap-6 min-h-[calc(100vh-200px)]">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClear}
        title="Clear History"
        message="Are you sure you want to clear the entire investigation history? This action cannot be undone."
      />
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 shrink-0 max-w-4xl mx-auto w-full pt-2">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-2">
            DB <span className="text-primary italic">Explorer</span>
          </h1>
          <div className="flex items-center gap-4 text-foreground/40 font-bold uppercase tracking-widest text-xs">
            <Database className="w-4 h-4" />
            <span>Target: Alto_Rosario_analytical_v1</span>
            <span className="size-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading || messages.length <= 1}
          className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-primary/10 text-primary font-bold rounded-2xl transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none text-sm"
        >
          <Trash2Icon className="w-4 h-4" />
          Clear History
        </button>
      </div>

      {/* Chat Area - Scrollable */}
      <div className="flex-1 max-w-4xl mx-auto w-full glass-card rounded-4xl border-4 border-primary/20 flex flex-col overflow-hidden relative min-h-[500px]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-70s-pattern" />
        <ScrollArea className="flex-1 h-full">
          <div className="p-8 md:p-12">
            {messages.map((msg, i) => (
              <ChatMessage key={i} {...msg} />
            ))}
            {isSending && (
              <div className="flex gap-6 mb-8 items-end animate-pulse">
                <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Loader2Icon className="size-6 animate-spin text-primary" />
                </div>
                <div className="glass-card rounded-4xl rounded-bl-none border-l-8 border-l-primary/30 px-8 py-6 text-foreground/40 font-medium text-lg">
                  Autonomous agent is formulating query and analyzing results...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="max-w-4xl mx-auto w-full relative shrink-0 pb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="relative group"
        >
          <input
            placeholder="Type your query for the shopping database..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isSending}
            className="w-full h-20 px-10 pr-40 bg-white border-4 border-primary rounded-3xl text-xl font-medium focus:outline-none focus:ring-8 focus:ring-primary/10 transition-all groovy-shadow"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isSending}
            className="absolute right-3 top-3 bottom-3 px-8 bg-primary text-primary-foreground font-black text-lg rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isSending ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              <>
                SEND <SendIcon className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 text-foreground/30 font-bold uppercase tracking-widest text-[10px]">
          <Info className="w-3 h-3" />
          <span>Press Enter to dispatch agent</span>
        </div>
      </div>
    </div>
  )
}
