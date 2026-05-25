import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Sparkles, User } from "lucide-react"
import MarkdownRenderer from "./MarkdownRenderer"

export default function ChatMessage({ role, content }) {
  const isAssistant = role === "assistant"

  return (
    <div
      className={cn(
        "flex gap-6 mb-8 items-end",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div className={cn(
        "size-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 hover:rotate-12",
        isAssistant ? "bg-primary text-primary-foreground" : "bg-white border-2 border-primary text-primary"
      )}>
        {isAssistant ? <Sparkles className="size-6" /> : <User className="size-6" />}
      </div>

      <div
        className={cn(
          "max-w-[85%] rounded-4xl px-8 py-6 text-lg font-medium leading-relaxed relative transition-all duration-300",
          isAssistant
            ? "glass-card text-foreground rounded-bl-none border-l-8 border-l-primary ml-4"
            : "bg-primary text-primary-foreground rounded-br-none shadow-xl hover:translate-y-[-2px] mr-4"
        )}
      >
        <MarkdownRenderer>{content}</MarkdownRenderer>
      </div>
    </div>
  )
}
