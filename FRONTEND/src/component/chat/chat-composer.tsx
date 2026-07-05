import { ArrowRight, Send } from 'lucide-react'

type Props = {
  value: string
  placeholder: string
  isStreaming: boolean
  helperText: string
  onChange: (value: string) => void
  onSend: () => void
}

export default function ChatComposer({
  value,
  placeholder,
  isStreaming,
  helperText,
  onChange,
  onSend,
}: Props) {
  return (
    <div className="border-t border-(--foreground)/10 pt-3">
      <div className="flex items-end gap-3 rounded-xl border border-(--foreground)/10 bg-(--foreground)/5 p-3">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.ctrlKey) {
              event.preventDefault()
              onSend()
            }
          }}
          placeholder={placeholder}
          rows={2}
          className="min-h-12 max-h-28 flex-1 resize-none bg-transparent text-sm outline-none placeholder:opacity-40"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={isStreaming}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-linear-to-r from-amber-500 to-lime-500 px-4 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-400 hover:to-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="size-4" />
          {isStreaming ? 'Sending' : 'Send'}
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs opacity-50">
        <span>{helperText}</span>
        <span className="inline-flex items-center gap-2">
          <ArrowRight className="size-3.5" />
          Ctrl + Enter to send
        </span>
      </div>
    </div>
  )
}