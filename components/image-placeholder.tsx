import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ImagePlaceholder({
  label,
  className,
  tone = 'cream',
}: {
  label: string
  className?: string
  tone?: 'cream' | 'sunshine' | 'red'
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed p-4 text-center',
        tone === 'cream' && 'border-primary/30 bg-muted text-primary/70',
        tone === 'sunshine' && 'border-primary/30 bg-sunshine text-primary/70',
        tone === 'red' && 'border-cream/40 bg-accent text-cream/80',
        className,
      )}
    >
      <ImageIcon className="size-6" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
    </div>
  )
}
