'use client'

import { SiteHeader } from '@/components/site-header'
import { ContactFooter, Hero } from '@/components/sections'
import { PortfolioGrid } from '@/components/portfolio-grid'
import { useLanguage } from '@/components/language-provider'
import { getNavigation, localizeItems, portfolio } from '@/lib/content'

export function Portfolio() {
  const { locale, t } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl bg-cream shadow-sm">
      <SiteHeader navigation={getNavigation(t)} />
      <main className="flex flex-col bg-background">
        <Hero />
        <PortfolioGrid items={localizeItems(portfolio, locale)} />
      </main>
      <ContactFooter />
    </div>
  )
}
