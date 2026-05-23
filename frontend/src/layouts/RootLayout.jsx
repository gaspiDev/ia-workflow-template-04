import { Outlet, NavLink } from "react-router"

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-70s-pattern">
      {/* Decorative Blobs */}
      {/*<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-blob [animation-delay:2s] pointer-events-none" />
      */}
      <header className="px-6 py-6">
        <nav className="max-w-7xl mx-auto glass-card rounded-4xl px-8 h-20 flex items-center justify-between border-2 border-primary/20">
          <NavLink to="/" className="text-3xl font-serif font-bold tracking-tight text-primary">
            AGENTIC<span className="italic opacity-70 ml-1">Explorer</span>
          </NavLink>

          <div className="flex items-center gap-10">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-lg font-medium transition-all duration-300 hover:text-primary ${isActive ? "text-primary border-b-4 border-primary" : "text-foreground/60"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `text-lg font-medium transition-all duration-300 hover:text-primary ${isActive ? "text-primary border-b-4 border-primary" : "text-foreground/60"}`
              }
            >
              Explorer
            </NavLink>
          </div>

          <a
            href="/setup"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary via-primary/80 to-primary text-primary-foreground font-bold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:brightness-110 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10">Connect Database</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </nav>
      </header>

      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      <footer className="relative z-10 py-12 px-6 border-t border-primary/10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-foreground/40 font-medium">© 2026 Agentic DB Explorer. A 70's Modernized Lab.</p>
          <div className="flex gap-8 text-foreground/40 font-medium">
            <a
              href="https://github.com/gaspiDev/ia-workflow-template-04"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="/terms.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
