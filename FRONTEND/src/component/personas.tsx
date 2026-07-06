import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import hitesh from "../assets/hitesh.png"
import piyush from "../assets/piyush.png"
const personas = [
  {
    name: 'Hitesh Choudhary',
    personaKey: 'hitesh',
    role: 'Tech Educator & YouTuber',
    description: 'Known for making complex coding concepts simple. Speaks with warmth, chai references, and real-world dev experience. His style makes you feel like you\'re learning from a friend.',
    image: hitesh,
    gradient: 'from-amber-500 to-lime-400',
    tags: ['JavaScript', 'Web Dev', 'Career Advice'],
  },
  {
    name: 'Piyush Garg',
    personaKey: 'piyush',
    role: 'Tech Educator & Builder',
    description: 'Breaks down system design and backend concepts with clarity. Talks like a friend who happens to be a brilliant engineer, always ready to dive deep into the why behind things.',
    image: piyush,
    gradient: 'from-lime-400 to-amber-400',
    tags: ['System Design', 'Backend', 'Startups'],
  },
]

function PersonaRow({ name, personaKey, role, description, image, gradient, tags, index }: typeof personas[0] & { index: number }) {
  const navigate = useNavigate()
  const isEven = index % 2 === 0

  return (
    <div className="group relative bg-neutral-100 dark:bg-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-center rounded-3xl border border-(--foreground)/10  p-4 md:p-5 transition-shadow duration-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0_6px_18px_rgb(0,0,0,0.24)]">

      <div className={`flex flex-col gap-3 md:gap-4 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        {/* Role badge */}
        <span className={`self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-linear-to-r ${gradient}`}>
          {role}
        </span>

        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{name}</h3>

        <p className="text-sm opacity-50 leading-relaxed max-w-prose">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-(--foreground)/10 bg-(--foreground)/5">
              {tag}
            </span>
          ))}
        </div>

        {/* Chat button */}
        <button
          onClick={() => navigate(`/chat?persona=${personaKey}`)}
          className={`self-start mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r ${gradient} opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg shadow-amber-500/10`}
        >
          <MessageCircle className="size-3.5" />
          Chat with {name.split(' ')[0]}
        </button>
      </div>

      {/* Image side */}
      <div className={`relative flex items-center justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        {/* Gradient glow */}
        <div className={`absolute w-56 h-56 rounded-full bg-linear-to-br ${gradient} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />

        <div className="relative w-full aspect-square max-w-55 md:max-w-60 rounded-2xl overflow-hidden ring-1 ring-(--foreground)/10 group-hover:ring-(--foreground)/20 transition-all duration-300">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        </div>
      </div>
    </div>
  )
}

export default function Personas() {
  return (
    <section className="py-8 md:py-10">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          Choose a Persona
        </h2>
        <p className="mt-3 text-sm opacity-60 max-w-md mx-auto">
          Each persona is crafted to match the real personality, expertise, and communication style of these creators.
        </p>
      </div>
      <div className="flex flex-col gap-5 md:gap-6">
        {personas.map((p, i) => (
          <PersonaRow key={p.name} {...p} index={i} />
        ))}
      </div>
    </section>
  )
}
