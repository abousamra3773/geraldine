'use client'

import { useState } from 'react'
import Image from 'next/image'
import { categories, type Category, type PortfolioItem } from '@/lib/content'
import { useLanguage } from '@/components/language-provider'
import { Lightbox } from '@/components/lightbox'
import { cn } from '@/lib/utils'

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const visible = filter === 'all' ? items : items.filter((item) => item.category === filter)
  const filters: (Category | 'all')[] = ['all', ...categories]

  return (
    <section id="portfolio" className="scroll-mt-16 bg-cream px-6 py-16 md:px-10 md:py-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <h2 className="text-5xl font-extrabold tracking-tight text-primary md:text-6xl">{t.portfolio.title}</h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-ink">{t.portfolio.description}</p>
        </div>
        <div role="group" aria-label={t.portfolio.filterLabel} className="flex flex-wrap gap-2">
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className={cn(
                'border-2 border-primary px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors',
                filter === key ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-sunshine',
              )}
            >
              {key === 'all' ? t.portfolio.all : t.portfolio.categories[key]}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {visible.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1152px) 370px, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-ink/70 px-3 py-2 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-xs font-bold uppercase tracking-widest text-cream">{item.caption}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-sunshine">
                  {t.portfolio.categories[item.category]}
                </span>
              </span>
              <span className="sr-only">{t.gallery.open(item.caption)}</span>
            </button>
          </li>
        ))}
      </ul>

      {activeIndex !== null && (
        <Lightbox
          items={visible}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  )
}
