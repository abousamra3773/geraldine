'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '@/lib/content'
import { ImagePlaceholder } from '@/components/image-placeholder'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

export function Gallery({
  items,
  tone = 'cream',
}: {
  items: GalleryItem[]
  tone?: 'cream' | 'sunshine'
}) {
  const { t } = useLanguage()
  const viewable = items.filter((item) => item.src)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setActiveIndex((i) => (i === null ? i : (i + delta + viewable.length) % viewable.length)),
    [viewable.length],
  )

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeIndex, close, step])

  const active = activeIndex !== null ? viewable[activeIndex] : null

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.src ?? item.caption} className={cn(i === 0 && 'col-span-2 md:col-span-1')}>
            <figure>
              {item.src ? (
                <button
                  type="button"
                  onClick={() => setActiveIndex(viewable.indexOf(item))}
                  className="group relative block aspect-[4/5] w-full overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="sr-only">{t.gallery.open(item.caption)}</span>
                </button>
              ) : (
                <div className="aspect-[4/5] w-full">
                  <ImagePlaceholder label={item.caption} tone={tone === 'cream' ? 'sunshine' : 'cream'} />
                </div>
              )}
              <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            autoFocus
            className="absolute right-4 top-4 bg-primary p-2 text-primary-foreground hover:bg-accent"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.gallery.close}</span>
          </button>

          {viewable.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-cream/90 p-2 text-primary hover:bg-cream md:left-6"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-cream/90 p-2 text-primary hover:bg-cream md:right-6"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
                <span className="sr-only">{t.gallery.next}</span>
              </button>
            </>
          )}

          <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[75vh] w-[85vw] max-w-5xl">
              <Image src={active.src!} alt={active.alt} fill sizes="90vw" className="object-contain" priority />
            </div>
            <figcaption className="mt-4 text-sm font-bold uppercase tracking-widest text-sunshine">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
