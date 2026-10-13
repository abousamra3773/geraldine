'use client'

import { locales } from '@/lib/i18n'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const labels = { en: 'English', es: 'Español' } as const

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div role="group" aria-label={t.nav.language} className={cn('flex items-center ring-1 ring-primary', className)}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          className={cn(
            'px-2.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors',
            locale === code ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-cream',
          )}
        >
          {code}
          <span className="sr-only">{` — ${labels[code]}`}</span>
        </button>
      ))}
    </div>
  )
}
