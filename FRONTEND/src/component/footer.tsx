export default function Footer() {
  return (
    <footer className="py-6 border-t border-(--foreground)/10 text-center">
      <p className="text-xs opacity-40">
        &copy; {new Date().getFullYear()} Persona. All rights reserved.
      </p>
    </footer>
  )
}
