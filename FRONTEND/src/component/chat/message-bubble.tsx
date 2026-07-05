import { UserRound } from 'lucide-react'
import type { ChatMessage } from './chat-types'

type Props = {
  message: ChatMessage
  personaAvatar: string
}

export default function MessageBubble({ message, personaAvatar }: Props) {
  const isUser = message.role === 'user'
  const stepName = message.step?.toUpperCase()
  const isOutputStep = stepName === 'OUTPUT'
  const showStepLabel = !isUser && stepName && !isOutputStep
  const showMessageText = isUser || !stepName || isOutputStep

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--foreground)/10 bg-(--foreground)/5 shadow-sm ${
          isUser ? 'order-2' : 'order-1'
        }`}
      >
        {isUser ? (
          <UserRound className="size-4 text-(--foreground)" />
        ) : (
          <img src={personaAvatar} alt="Persona avatar" className="size-full object-cover" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'order-1 bg-(--foreground)/6 border border-(--foreground)/10'
            : 'order-2 bg-linear-to-r from-amber-500/10 to-lime-500/10 border border-amber-500/10'
        }`}
      >
        <div className="space-y-1">
          {showStepLabel && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-500/80">
              {stepName}
            </div>
          )}
          {showMessageText && (
            <p className={message.pending ? 'opacity-60 italic' : ''}>{message.content}</p>
          )}
        </div>
      </div>
    </div>
  )
}