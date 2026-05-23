import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-4xl border-4 border-primary/20 p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-red-100 rounded-full text-red-600">
            <AlertTriangle className="size-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border-2 border-primary/10 text-primary font-bold rounded-2xl transition-all hover:bg-slate-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-destructive text-destructive-foreground font-bold rounded-2xl transition-all hover:bg-destructive/90 hover:scale-105 active:scale-95 text-sm"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  )
}
