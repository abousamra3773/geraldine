'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const PHOTO_COUNT = 24
const photoKeys = Array.from({ length: PHOTO_COUNT }, (_, i) => `gallery-photo-${String(i + 1).padStart(2, '0')}`)

type ActivePhoto = { index: number; src: string; alt: string }

export function PhotoGrid() {
  const { t } = useLanguage()
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<ActivePhoto | null>(null)

  // Read src from the live <img> so photos swapped in by Pretzel show in the lightbox.
  const show = useCallback((index: number) => {
    const total = photoKeys.length
    const wrapped = (index + total) % total
    const img = imageRefs.current[wrapped]
    if (!img) return
    setActive({ index: wrapped, src: img.currentSrc || img.src, alt: img.alt })
  }, [])

  const open = (index: number) => {
    show(index)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open || !active) return
      if (e.key === 'ArrowRight') show(active.index + 1)
      if (e.key === 'ArrowLeft') show(active.index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, show])

  return (
    <section id="gallery" aria-label={t.gallery.label} className="scroll-mt-20 bg-cream p-2">
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {photoKeys.map((key, i) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Pretzel swaps src on a plain <img> */}
              <img
                ref={(el) => {
                  imageRefs.current[i] = el
                }}
                data-ve={key}
                src="/images/placeholder.svg"
                alt={t.gallery.photoAlt(i + 1)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="sr-only">{t.gallery.open}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t.gallery.viewer}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onClose={() => setActive(null)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 backdrop:bg-ink/80"
      >
        {active && (
          <div
            className="flex h-full w-full items-center justify-center p-4 md:p-16"
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.alt} className="max-h-full max-w-full object-contain shadow-2xl" />

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 bg-cream p-2 text-primary transition-colors hover:bg-sunshine"
            >
              <X className="size-6" aria-hidden="true" />
              <span className="sr-only">{t.gallery.close}</span>
            </button>
            <button
              type="button"
              onClick={() => show(active.index - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-cream p-2 text-primary transition-colors hover:bg-sunshine"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
              <span className="sr-only">{t.gallery.previous}</span>
            </button>
            <button
              type="button"
              onClick={() => show(active.index + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-cream p-2 text-primary transition-colors hover:bg-sunshine"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
              <span className="sr-only">{t.gallery.next}</span>
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cream px-3 py-1 text-xs font-bold tracking-widest text-primary">
              {active.index + 1} / {photoKeys.length}
            </p>
          </div>
        )}
      </dialog>
    </section>
  )
}
