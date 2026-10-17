'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { PortfolioItem } from '@/lib/content'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const SWIPE_THRESHOLD = 50

export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: PortfolioItem[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}) {
  const { t } = useLanguage()
  const touchStartX = useRef<number | null>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = items[index]
  const total = items.length

  const step = useCallback(
    (delta: number) => onIndexChange((index + delta + total) % total),
    [index, total, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, step])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [index])

  if (!active) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={active.caption}
      className="fixed inset-0 z-50 flex flex-col bg-ink"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(delta) > SWIPE_THRESHOLD) step(delta < 0 ? 1 : -1)
        touchStartX.current = null
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-sunshine" aria-live="polite">
          {t.gallery.position(index + 1, total)}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="bg-primary p-2 text-primary-foreground transition-colors hover:bg-accent"
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">{t.gallery.close}</span>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20" onClick={onClose}>
        <figure className="flex h-full w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <div className="relative min-h-0 w-full flex-1">
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              priority
              className="animate-in fade-in object-contain duration-300"
            />
          </div>
          <figcaption className="text-sm font-bold uppercase tracking-widest text-cream">
            {active.caption}
            <span className="ml-3 text-xs text-sunshine">{t.portfolio.categories[active.category]}</span>
          </figcaption>
        </figure>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-cream/90 p-2 text-primary transition-colors hover:bg-cream md:left-6 md:p-3"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
              <span className="sr-only">{t.gallery.previous}</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-cream/90 p-2 text-primary transition-colors hover:bg-cream md:right-6 md:p-3"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
              <span className="sr-only">{t.gallery.next}</span>
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <nav aria-label={t.gallery.thumbnails} className="px-4 py-4">
          <ul className="no-scrollbar mx-auto flex max-w-full gap-2 overflow-x-auto md:justify-center">
            {items.map((item, i) => (
              <li key={item.src} className="shrink-0">
                <button
                  ref={(el) => {
                    thumbRefs.current[i] = el
                  }}
                  type="button"
                  aria-current={i === index}
                  onClick={() => onIndexChange(i)}
                  className={cn(
                    'relative block h-16 w-12 overflow-hidden ring-2 transition-opacity md:h-20 md:w-16',
                    i === index ? 'opacity-100 ring-sunshine' : 'opacity-50 ring-transparent hover:opacity-90',
                  )}
                >
                  <Image src={item.src} alt="" fill sizes="64px" className="object-cover" />
                  <span className="sr-only">{t.gallery.goTo(item.caption)}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
