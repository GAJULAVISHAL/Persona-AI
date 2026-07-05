export default function Container({
  children,
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`max-w-5xl mx-auto w-full px-6 ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}