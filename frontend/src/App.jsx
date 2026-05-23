import { BrowserRouter, Routes, Route } from "react-router"
import RootLayout from "@/layouts/RootLayout"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"
import Chat from "@/pages/Chat"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
