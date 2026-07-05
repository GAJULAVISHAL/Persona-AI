
import Navbar from './component/navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/home-page'
import ChatPage from './pages/chat-page'


export default function App() {
  const location = useLocation()
  const isChatRoute = location.pathname === '/chat'

  return (
    <div className="relative isolate min-h-screen bg-(--background) text-(--foreground)">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(var(--color-neutral-300)_1px,transparent_1px)] bg-size-[10px_10px] dark:bg-[radial-gradient(var(--color-neutral-800)_1px,transparent_1px)] dark:bg-size-[10px_10px]" />
      <div className="relative z-10">
        {!isChatRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}