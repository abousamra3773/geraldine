'use client'

import { SiteHeader } from '@/components/site-header'
import { ContactFooter, Hero } from '@/components/sections'
import { PhotoGrid } from '@/components/photo-grid'
import { useLanguage } from '@/components/language-provider'
import { getNavigation } from '@/lib/content'

export function Portfolio() {
  const { t } = useLanguage()
  const navigation = getNavigation(t)

  return (
    <div className="mx-auto max-w-6xl bg-cream shadow-sm">
      <SiteHeader navigation={navigation} />
      <main className="flex flex-col bg-background">
        <Hero />
        <PhotoGrid />
      </main>
      <ContactFooter />
    </div>
  )
}
