import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="py-12">
      <div className="relative overflow-hidden rounded-3xl border border-(--foreground)/10 bg-linear-to-br from-amber-500/10 via-lime-400/5 to-transparent p-8 md:p-10 text-center">
        {/* Background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight max-w-xl leading-tight">
            Ready to have a conversation that feels{' '}
            <span className="bg-linear-to-r from-amber-500 to-lime-500 bg-clip-text text-transparent">
              real
            </span>
            ?
          </h2>
          <p className="opacity-60 max-w-md text-sm">
            Pick a persona, ask anything, and experience AI that speaks with personality.
          </p>
          <Link to="/chat" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-amber-500 to-lime-500 hover:from-amber-400 hover:to-lime-400 transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-2">
            Start Chatting
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
