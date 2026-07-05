import { MessageCircle, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function ThemeSwitcher() {
  const { toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative p-2 border border-dashed rounded-md flex items-center justify-center size-8 cursor-pointer hover:bg-(--foreground)/5 transition-colors duration-200"
    >
      <Moon className="absolute size-4 shrink-0 dark:scale-0 scale-100 dark:rotate-45 transition-all duration-300" />
      <Sun className="absolute size-4 shrink-0 dark:scale-100 scale-0 dark:rotate-0 rotate-45 transition-all duration-300" />
    </button>
  )
}

export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <nav className="flex items-center justify-between px-5 py-2.5 rounded-2xl border border-(--foreground)/10 backdrop-blur-xl bg-(--background)/70 shadow-lg shadow-black/5 dark:shadow-black/20">
        <span className="text-lg font-bold tracking-tight">Persona</span>
        <div className="flex items-center gap-2">
          <Link to="/chat" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-amber-500 to-lime-500 hover:from-amber-400 hover:to-lime-400 transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            <MessageCircle className="size-4" />
            Chat Now
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  )
}
