export default function SuggestionChip({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-(--foreground)/10 bg-(--foreground)/5 px-3 py-2 text-left text-sm leading-relaxed opacity-80 transition-all duration-300 hover:bg-(--foreground)/8 hover:opacity-100"
    >
      {text}
    </button>
  )
}