export type PersonaKey = 'hitesh' | 'piyush'

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  step?: string
  pending?: boolean
}

export type PersonaOption = {
  key: PersonaKey
  label: string
  avatar: string
  tone: string
  accent: string
  starter: string
  suggestions: string[]
}