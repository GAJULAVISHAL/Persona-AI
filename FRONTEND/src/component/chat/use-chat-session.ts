import axios from 'axios'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createId, createInitialConversations, personaOptions } from './chat-data'
import type { ChatMessage, PersonaKey, PersonaOption } from './chat-types'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export function useChatSession() {
  const [activePersona, setActivePersona] = useState<PersonaKey>('hitesh')
  const [conversations, setConversations] = useState<Record<PersonaKey, ChatMessage[]>>(
    createInitialConversations,
  )
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const activePersonaDetails = useMemo<PersonaOption>(
    () => personaOptions.find((persona) => persona.key === activePersona) ?? personaOptions[0],
    [activePersona],
  )

  const messages = conversations[activePersona]
  const hasStartedConversation = messages.some((message) => message.role === 'user')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, activePersona, isStreaming])

  const updateActiveConversation = (updater: (current: ChatMessage[]) => ChatMessage[]) => {
    setConversations((current) => ({
      ...current,
      [activePersona]: updater(current[activePersona]),
    }))
  }

  const handleSend = async (messageText?: string) => {
    const trimmedInput = (messageText ?? input).trim()
    if (!trimmedInput || isStreaming) {
      return
    }

    setError('')
    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmedInput,
    }
    const assistantMessageId = createId()
    const assistantPlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: 'Thinking...',
      pending: true,
    }

    updateActiveConversation((current) => [...current, userMessage, assistantPlaceholder])
    setInput('')
    setIsStreaming(true)

    try {
      let buffer = ''
      let assistantText = ''
      let processedLength = 0

      const processResponseText = (responseText: string) => {
        const chunk = responseText.slice(processedLength)

        if (!chunk) {
          return
        }

        processedLength = responseText.length
        buffer += chunk

        const events = buffer.split('\n\n')
        buffer = events.pop() ?? ''

        for (const event of events) {
          const dataLine = event
            .split('\n')
            .find((line) => line.startsWith('data: '))

          if (!dataLine) {
            continue
          }

          const data = dataLine.slice(6).trim()

          if (data === '[DONE]') {
            break
          }

          try {
            const parsed = JSON.parse(data) as { step?: string; text?: string }
            if (!parsed.step || !parsed.text) {
              continue
            }

            const normalizedStep = parsed.step.toUpperCase()
            const messageContent = normalizedStep === 'OUTPUT' ? parsed.text : parsed.text

            if (normalizedStep === 'OUTPUT') {
              assistantText = parsed.text
            }

            updateActiveConversation((current) =>
              current.map((message) =>
                message.id === assistantMessageId
                  ? {
                      ...message,
                      content: messageContent,
                      step: normalizedStep,
                      pending: normalizedStep !== 'OUTPUT',
                    }
                  : message,
              ),
            )
          } catch {
            continue
          }
        }
      }

      const response = await axios.post(
        `${apiBaseUrl}/api/v1/chat`,
        {
          persona: activePersona,
          query: trimmedInput,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'text',
          onDownloadProgress: (progressEvent) => {
            const target = progressEvent.event?.target as XMLHttpRequest | null | undefined
            const responseText = target?.responseText ?? ''
            processResponseText(responseText)
          },
        },
      )

      if (typeof response.data === 'string') {
        processResponseText(response.data)
      }

      if (!assistantText) {
        updateActiveConversation((current) =>
          current.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: 'I could not complete that response. Please try again.',
                    step: 'OUTPUT',
                  pending: false,
                }
              : message,
          ),
        )
      }
    } catch {
      updateActiveConversation((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                content: 'The chat service is not available right now. Please try again.',
                  step: 'OUTPUT',
                pending: false,
              }
            : message,
        ),
      )
      setError('Unable to reach the chat service.')
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    void handleSend(suggestion)
  }

  return {
    activePersona,
    activePersonaDetails,
    hasStartedConversation,
    input,
    isStreaming,
    error,
    messages,
    messagesEndRef,
    personaOptions,
    setActivePersona,
    setInput,
    handleSend,
    handleSuggestionClick,
  }
}