'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  const scrollTrack = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <>
      <div className="flex min-w-0 flex-col gap-4">
      <ul
        ref={trackRef}
        onScroll={updateEdges}
        tabIndex={0}
        aria-label={t.gallery.label}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {items.map((item) => (
          <li
            key={item.src ?? item.caption}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)]"
          >
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

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" aria-live="polite">
          {t.gallery.count(items.length)}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            disabled={atStart}
            className={cn(
              'border-2 border-primary p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30',
            )}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.gallery.previous}</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(1)}
            disabled={atEnd}
            className="border-2 border-primary p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.gallery.next}</span>
          </button>
        </div>
      </div>
      </div>

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
