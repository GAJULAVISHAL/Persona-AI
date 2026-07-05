import { MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-28 pb-12 gap-4">
      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-(--foreground)/10 bg-(--foreground)/5">
        <Sparkles className="size-3" />
        AI-Powered Conversations
      </span>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl">
        Talk to AI that speaks{' '}
        <span className="bg-linear-to-r from-amber-500 via-amber-400 to-lime-400 bg-clip-text text-transparent">
          like real people
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-base md:text-lg opacity-60 max-w-lg leading-relaxed">
        Persona mimics the personality, tone, and style of real creators. Pick a persona and start a conversation that feels authentic.
      </p>

      {/* CTA */}
      <div className="flex items-center gap-4 mt-2">
        <Link to="/chat" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-amber-500 to-lime-500 hover:from-amber-400 hover:to-lime-400 transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <MessageCircle className="size-4" />
          Chat Now
        </Link>
      </div>
    </section>
  )
}
