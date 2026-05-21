import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function ChatMessage({ role, content }) {
  const isAssistant = role === "assistant"

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <Avatar className="size-8">
        <AvatarFallback className={isAssistant ? "bg-primary text-primary-foreground" : "bg-muted"}>
          {isAssistant ? "AI" : "U"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3 text-sm",
          isAssistant
            ? "bg-primary text-primary-foreground rounded-tl-none"
            : "bg-muted text-foreground rounded-tr-none"
        )}
      >
        {content}
      </div>
    </div>
  )
}
