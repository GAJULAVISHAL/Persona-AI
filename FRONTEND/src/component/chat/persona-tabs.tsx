import type { PersonaKey, PersonaOption } from './chat-types'

type Props = {
  activePersona: PersonaKey
  personaOptions: PersonaOption[]
  onSelectPersona: (persona: PersonaKey) => void
}

export default function PersonaTabs({ activePersona, personaOptions, onSelectPersona }: Props) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {personaOptions.map((persona) => {
        const isActive = persona.key === activePersona

        return (
          <button
            key={persona.key}
            type="button"
            onClick={() => onSelectPersona(persona.key)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-300 ${
              isActive
                ? `border-transparent bg-linear-to-r ${persona.accent} text-white shadow-lg shadow-amber-500/10`
                : 'border-(--foreground)/10 bg-(--foreground)/5 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={persona.avatar}
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0 rounded-md object-cover ring-1 ring-white/20"
            />
            <span>{persona.label}</span>
          </button>
        )
      })}
    </div>
  )
}