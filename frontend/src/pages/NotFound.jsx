import { Link } from "react-router"
import { Home, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm mb-12 animate-float">
        <AlertCircle className="w-4 h-4" />
        <span>LOST IN THE DATA UNIVERSE</span>
      </div>

      <h1 className="text-9xl font-serif font-bold text-primary italic mb-8">404</h1>
      
      <p className="text-3xl font-medium text-foreground/60 max-w-2xl mb-16">
        It seems the record you are looking for has been purged or never existed in this analytical dimension.
      </p>

      <Link 
        to="/" 
        className="group flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-black text-xl rounded-3xl groovy-shadow transition-all hover:translate-y-[-4px]"
      >
        <Home className="w-6 h-6" />
        Back to Headquarters
      </Link>
    </div>
  )
}
