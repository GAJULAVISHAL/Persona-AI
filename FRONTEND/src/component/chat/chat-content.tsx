import type { RefObject } from 'react'
import MessageBubble from './message-bubble'
import SuggestionChip from './suggestion-chip'
import type { ChatMessage, PersonaOption } from './chat-types'

type Props = {
  activePersonaDetails: PersonaOption
  messages: ChatMessage[]
  hasStartedConversation: boolean
  onSuggestionClick: (suggestion: string) => void
  messagesEndRef: RefObject<HTMLDivElement | null>
}

export default function ChatContent({
  activePersonaDetails,
  messages,
  hasStartedConversation,
  onSuggestionClick,
  messagesEndRef,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto py-4 pr-1">
      <div className="flex min-h-full flex-col justify-start gap-3">
        {!hasStartedConversation && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {activePersonaDetails.suggestions.map((suggestion) => (
              <SuggestionChip
                key={suggestion}
                text={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
              />
            ))}
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} personaAvatar={activePersonaDetails.avatar} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}