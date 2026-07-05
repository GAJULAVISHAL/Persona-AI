import hiteshAvatar from '../../assets/hitesh.png'
import piyushAvatar from '../../assets/piyush.png'
import type { ChatMessage, PersonaKey, PersonaOption } from './chat-types'

export const personaOptions: PersonaOption[] = [
  {
    key: 'hitesh',
    label: 'Hitesh',
    avatar: hiteshAvatar,
    tone: 'Calm, simple, practical',
    accent: 'from-amber-500 to-lime-400',
    starter: 'Haan jii, ask me a coding question and I will keep it simple.',
    suggestions: [
      'How do I learn JavaScript basics fast?',
      'Explain React state in simple terms.',
      'What is the best way to start web development?',
      'How should I build projects to improve as a developer?',
    ],
  },
  {
    key: 'piyush',
    label: 'Piyush',
    avatar: piyushAvatar,
    tone: 'Sharp, direct, technical',
    accent: 'from-lime-400 to-amber-400',
    starter: 'Bhai, ask a backend or system design question and we will break it down.',
    suggestions: [
      'Explain system design for a chat app.',
      'How do I scale a backend API?',
      'What should I know before starting microservices?',
      'Compare SQL and NoSQL for production apps.',
    ],
  },
]

export const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const createInitialConversations = (): Record<PersonaKey, ChatMessage[]> => ({
  hitesh: [
    {
      id: 'hitesh-welcome',
      role: 'assistant',
      content: 'Haan jii, ask a coding question and I will keep it simple.',
    },
  ],
  piyush: [
    {
      id: 'piyush-welcome',
      role: 'assistant',
      content: 'Bhai, ask a backend or system design question and we will break it down.',
    },
  ],
})