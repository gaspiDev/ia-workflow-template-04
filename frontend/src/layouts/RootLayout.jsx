import { Outlet, NavLink } from "react-router"

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <nav className="container mx-auto px-4 h-16 flex items-center gap-6">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-primary transition-colors"}>Home</NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-primary transition-colors"}>Chat</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-primary transition-colors"}>About</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-primary transition-colors"}>Dashboard</NavLink>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
