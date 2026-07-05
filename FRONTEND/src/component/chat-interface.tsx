import { ArrowLeft, MessageCircle, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import ChatComposer from './chat/chat-composer'
import ChatContent from './chat/chat-content'
import { personaOptions } from './chat/chat-data'
import PersonaTabs from './chat/persona-tabs'
import { useChatSession } from './chat/use-chat-session'
import { useTheme } from '../hooks/useTheme'
import Container from './container'

export default function ChatInterface() {
  const { theme, toggle } = useTheme()
  const {
    activePersona,
    activePersonaDetails,
    hasStartedConversation,
    input,
    isStreaming,
    error,
    messages,
    messagesEndRef,
    setActivePersona,
    setInput,
    handleSend,
    handleSuggestionClick,
  } = useChatSession()

  return (
    <Container id="chat" className="min-h-screen w-full max-w-5xl p-3 md:p-4 Z-10 ">
      <div className="relative h-full overflow-hidden
      bg-(--background)  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-40 flex h-full flex-col p-3 md:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--foreground)/10 pb-3">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                aria-label="Back to landing"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-(--foreground)/10 bg-(--foreground)/5 transition-colors duration-200 hover:bg-(--foreground)/10"
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-lg border border-(--foreground)/10 bg-(--foreground)/5 px-3 py-1 text-xs font-medium">
                <MessageCircle className="size-3.5" />
                Live chat
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <PersonaTabs
                activePersona={activePersona}
                personaOptions={personaOptions}
                onSelectPersona={setActivePersona}
              />

              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle theme"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-(--foreground)/10 bg-(--foreground)/5 transition-colors duration-200 hover:bg-(--foreground)/10"
              >
                <Moon className="absolute size-4 shrink-0 dark:scale-0 scale-100 dark:rotate-45 transition-all duration-300" />
                <Sun className="absolute size-4 shrink-0 dark:scale-100 scale-0 dark:rotate-0 rotate-45 transition-all duration-300" />
                <span className="sr-only">{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
              </button>
            </div>
          </div>

          <ChatContent
            activePersonaDetails={activePersonaDetails}
            messages={messages}
            hasStartedConversation={hasStartedConversation}
            onSuggestionClick={handleSuggestionClick}
            messagesEndRef={messagesEndRef}
          />

          <ChatComposer
            value={input}
            placeholder={`Ask ${activePersonaDetails.label} something...`}
            isStreaming={isStreaming}
            helperText={error || activePersonaDetails.starter}
            onChange={setInput}
            onSend={() => void handleSend()}
          />
        </div>
      </div>
    </Container>
  )
}